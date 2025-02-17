import * as THREE from 'three'

function main() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas})
  const scene = new THREE.Scene() // 场景

  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  // 立方几何体
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

  const loader = new THREE.TextureLoader()

  // 基本材质并设置图片
  const materials = [
    new THREE.MeshBasicMaterial({map: loaderColorTexture('../assets/imgs/flower-1.jpg')}),
    new THREE.MeshBasicMaterial({map: loaderColorTexture('../assets/imgs/flower-2.jpg')}),
    new THREE.MeshBasicMaterial({map: loaderColorTexture('../assets/imgs/flower-3.jpg')}),
    new THREE.MeshBasicMaterial({map: loaderColorTexture('../assets/imgs/flower-4.jpg')}),
    new THREE.MeshBasicMaterial({map: loaderColorTexture('../assets/imgs/flower-5.jpg')}),
    new THREE.MeshBasicMaterial({map: loaderColorTexture('../assets/imgs/flower-6.jpg')})
  ]

  function loaderColorTexture(path) {
    const texture = loader.load(path)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }

  // 网格mesh对象
  const cube = new THREE.Mesh(geometry, materials)

  const fov = 75 // 视野范围
  const aspect = 2 // 画布宽高比 相机默认值300/150
  // 近截面和远截面
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.z = 2 // 相机位置

  // 将网格加入到场景中
  scene.add(cube)

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if(needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function render(time) {
    time *= 0.001

    if(resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    cube.rotation.x = time
    cube.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

}

main()
