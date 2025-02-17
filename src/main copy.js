import * as THREE from 'three'

function main() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas})
  const scene = new THREE.Scene() // 场景

  // 光照效果
  // const color = 0xffffff
  // const intensity = 3
  // const light = new THREE.DirectionalLight(color, intensity)
  // light.position.set(-1, 2, 4)
  // scene.add(light)


  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  // 立方几何体
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

  const loader = new THREE.TextureLoader()
  const texture = loader.load('https://threejs.org/manual/examples/resources/images/wall.jpg')
  texture.colorSpace = THREE.SRGBColorSpace

  // 基本材质并设置颜色
  // color: 0xff8844,
  const material = new THREE.MeshBasicMaterial({map: texture})

  // 网格mesh对象
  const cube = new THREE.Mesh(geometry, material)

  const fov = 75 // 视野范围
  const aspect = 2 // 画布宽高比 相机默认值300/150
  // 近截面和远截面
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.z = 2 // 相机位置

  // 将网格加入到场景中
  scene.add(cube)
  // renderer.render(scene, camera)

  // const cubes = [
    // makeInstance(geometry, 0x44aa88, 0),
    // makeInstance(geometry, 0x8844aa, -2),
    // makeInstance(geometry, 0xaa8844, 2)
  // ]

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color})

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    cube.position.x = x

    return cube
  }

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

    // cubes.forEach((cube, ndx) => {
    //   const speed = 1 + ndx * .1
    //   const rot = time * speed
    //   cube.rotation.x = rot
    //   cube.rotation.y = rot
    // })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

}

main()
