import { nextTick, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import * as THREE from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const config = {
  CAMERA_POSITION: [0.2, 2.8, 0.4], // 相机位置
  CONTROL_TARGET: [0, 2.65, 0], // 相机目标位置
  DECODER_PATH: `${import.meta.env.VITE_API_DOMAIN}/js/draco/gltf/`, // DRACO加载器的路径
} as const

export function useThree() {
  const container = useTemplateRef<HTMLDivElement>('container') // 容器
  const scene = shallowRef<THREE.Scene>() // 场景
  const camera = shallowRef<THREE.PerspectiveCamera>() // 相机
  const renderer = shallowRef<THREE.WebGLRenderer>() // 渲染器
  const cssRenderer = shallowRef<CSS2DRenderer>() // CSS渲染器
  const ocontrol = shallowRef<OrbitControls>() // 轨道控制器
  const dracoLoader = new DRACOLoader() // DRACO加载器
  dracoLoader.setDecoderPath(config.DECODER_PATH) // 设置DRACO加载器的路径
  dracoLoader.setDecoderConfig({ type: 'js' }) // 设置DRACO加载器的配置

  // 初始化
  const bootstrap = () => {
    initScene()
    initCamera()
    initRenderer()
    initControls()
    initLights()
    onAnimate()
    onWindowResize()
  }

  // 初始化场景
  const initScene = () => {
    scene.value = new THREE.Scene()
  }

  // 初始化相机
  const initCamera = () => {
    const { clientWidth, clientHeight } = container.value!
    camera.value! = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 1000)
    camera.value.position.set(...config.CAMERA_POSITION)
  }

  // 初始化渲染器
  const initRenderer = () => {
    const { clientWidth, clientHeight } = container.value!
    renderer.value! = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    // Renderer设置
    renderer.value.shadowMap.enabled = false // 不启用阴影贴图
    renderer.value.setSize(clientWidth, clientHeight) // 设置渲染器的大小
    renderer.value.localClippingEnabled = true // 启用本地裁剪
    renderer.value.setClearAlpha(0.5) // 设置渲染器的透明度
    renderer.value.domElement.className = 'webgl-renderer'
    container.value!.appendChild(renderer.value.domElement) // 将渲染器添加到容器中

    // 初始化CSS渲染器
    cssRenderer.value! = new CSS2DRenderer()
    cssRenderer.value.setSize(clientWidth, clientHeight) // 设置CSS渲染器的大小
    cssRenderer.value.domElement.className = 'css2d-renderer'
    cssRenderer.value.domElement.style.position = 'absolute'
    cssRenderer.value.domElement.style.top = '0px'
    cssRenderer.value.domElement.style.pointerEvents = 'none'
    container.value!.appendChild(cssRenderer.value.domElement) // 将CSS渲染器添加到容器中
  }

  // 初始控制器
  const initControls = () => {
    ocontrol.value! = new OrbitControls(camera.value!, renderer.value!.domElement)
    ocontrol.value.minPolarAngle = 0
    ocontrol.value.enableDamping = true
    ocontrol.value.dampingFactor = 0.1
    ocontrol.value.target.set(0, 2.65, 0)
    ocontrol.value.maxPolarAngle = THREE.MathUtils.degToRad(90) // 最大夹角 60 度
    ocontrol.value.minPolarAngle = THREE.MathUtils.degToRad(45) // 最小夹角 0 度
    ocontrol.value.minDistance = 0.5
    ocontrol.value.maxDistance = 2
    ocontrol.value.update()
  }

  // 初始化灯光
  const initLights = () => {
    const ambientLight = new THREE.AmbientLight(0x999999, 10) // 环境光
    scene.value!.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) // 方向光
    directionalLight.position.set(20, 20, 20)
    directionalLight.position.multiplyScalar(1)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    // scene.value.add(new THREE.DirectionalLightHelper(directionalLight, 5))
    scene.value!.add(directionalLight)
  }

  // 窗口
  const onWindowResize = () => {
    const handleResize = () => {
      const { clientWidth, clientHeight } = container.value!
      camera.value!.aspect = clientWidth / clientHeight
      camera.value!.updateProjectionMatrix()
      renderer.value!.setSize(clientWidth, clientHeight)
      cssRenderer.value!.setSize(clientWidth, clientHeight)
      ocontrol.value!.update() // 更新控制器
    }
    window.addEventListener('resize', handleResize)
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  }

  //渲染循环
  const onAnimate = () => {
    renderer.value!.render(scene.value!, camera.value!)
    requestAnimationFrame(() => onAnimate())
  }

  // 加载模型
  const loadModel = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)
    const onCompleted = (gltf: GLTF, resolve: (gltf: GLTF) => void) => resolve(gltf)
    return new Promise((resolve, reject) => {
      loader.load(url, (gltf: GLTF) => onCompleted(gltf, resolve), undefined, (error: any) => reject(error))
    })
  }

  nextTick(() => {
    bootstrap()
  })

  return {
    container,
    scene,
    camera,
    renderer,
    cssRenderer,
    loadModel,
  }
}
