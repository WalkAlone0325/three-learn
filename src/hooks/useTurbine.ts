import { ref, reactive, nextTick } from 'vue'
import { useThree } from '@/hooks'
import { forEach } from 'lodash-es'
import * as THREE from 'three'

const CONFIG = {
  MODEL_SOURCES: {
    EQUIPMENT: `${import.meta.env.VITE_API_DOMAIN}/models/equipment.glb`,
    PLANE: `${import.meta.env.VITE_API_DOMAIN}/models/plane.glb`,
    SKELETON: `${import.meta.env.VITE_API_DOMAIN}/models/skeleton.glb`,
  },
  MODEL_SCALES: [0.0001 * 3, 0.0001 * 3, 0.0001 * 3],
  EQUIPMENT_POSITION: {
    '变桨系统': {
      LABEL: { x: 0.0291, y: 2.6277, z: 0.2308 },
      COMPOSE: { x: 2519.0795, y: 29288.6777, z: 0 },
      DECOMPOSE: { x: 2519.0795, y: 29000.6777, z: 300 },
    },
    '转子': {
      LABEL: { x: 0.0632, y: 2.7692, z: 0.1746 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8850, z: 300 },
    },
    '主轴': {
      LABEL: { x: 0.0183, y: 2.6193, z: 0.0815 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8350, z: 200 },
    },
    '齿轮箱': {
      LABEL: { x: 0.0319, y: 2.6239, z: -0.0402 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8350, z: 100 },
    },
    '油冷装置': {
      LABEL: { x: 0.0364, y: 2.7995, z: 0.0593 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8650, z: 600 },
    },
    '偏航电机': {
      LABEL: { x: -0.0122, y: 2.75662, z: -0.0305 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8850, z: 400 },
    },
    '风冷装置': {
      LABEL: { x: -0.001, y: 2.7643, z: -0.1305 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8750, z: 300 },
    },
    '发电机': {
      LABEL: { x: 0.0047, y: 2.6156, z: -0.2045 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8350, z: 0 },
    },
    '控制柜': {
      LABEL: { x: 0.0249, y: 2.7605, z: -0.2521 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8850, z: 0 },
    },
  },
} as const

export function useTurbine() {
  const { container, scene, outlinePass, hexPass, loadModel, onModelPick, onModelHoverPick } = useThree()

  const current = ref('')

  const models = {
    equipment: null as any,
    plane: {},
    skeleton: {},
  }

  const load = reactive({
    total: 2, // 全部
    loaded: 0, // 已加载
    isLoading: true, // 执行状态
  })

  const bootstrap = async () => {
    await loadModels() // 加载模型
    loadLights() // 加载灯光

    onModelPick(models.equipment, (intersects) => {
      if (intersects.length > 0) {
        const obj = intersects[0].object
        current.value = obj.name // 点击的模型名称
        outlinePass.value!.selectedObjects = [obj]
        console.log(outlinePass)
      } else {
        current.value = ''
        outlinePass.value!.selectedObjects = []
      }
    })
    onModelHoverPick(models.equipment, (intersects) => {
      if (intersects.length > 0) {
        const obj = intersects[0]['object']
        hexPass.value!.selectedObjects = [obj]
      } else {
        hexPass.value!.selectedObjects = []
      }
    })
  }

  // 加载机架和设备模型
  const loadModels = async () => {
    const loadEquipment = async () => {
      const gltf = await loadModel(CONFIG.MODEL_SOURCES.EQUIPMENT)
      const model = gltf.scene
      model.scale.set(...CONFIG.MODEL_SCALES)
      models.equipment = model
      load.loaded += 1
      model.name = 'equipment'
      scene.value!.add(model)
    }

    // const loadSkeleton = async () => {
    //   const gltf = await loadModel(CONFIG.MODEL_SOURCES.SKELETON)
    //   const model = gltf.scene
    //   model.scale.set(...CONFIG.MODEL_SCALES)
    //   models.skeleton = model
    //   load.loaded += 1
    //   model.name = 'skeleton'
    //   scene.value!.add(model)
    // }

    await Promise.all([loadEquipment()])
    load.isLoading = false
    load.loaded = 2
  }

  //加载灯光
  const loadLights = () => {
    const LIGHT_LIST = [
      [0, 0, 0],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100],
    ]
    forEach(LIGHT_LIST, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
      directionalLight.position.set(x, y, z)
      scene.value?.add(directionalLight)
    })
  }

  nextTick(async () => {
   await bootstrap()
  })

  return {
    container,
    load,
    current,
  }
}
