# three-learn
threejs

## 纹理 Texture

1. 创建纹理加载器 `const loader = new THREE.TextureLoader()`
2. 使用 `loader` 传入图像，并将材质的 `map` 属性设置为该方法的返回值，而不是设置 `color` 属性
   ```js
   const texture = loader.load('resources/images/wall.jpg')
   texture.colorSpace = THREE.SRGBColorSpace

   const material = new THREE.MeshBasicMaterial({map: texture})
   ```
3. x

## 光照 Light

透视摄像机 PerspectiveCamera，它可以提供一个近大远小的3D视觉效果.

通过四个属性来定义视锥。
1. `near` 定义了视锥的前端
2. `far` 定义了后端
3. `fov` 是视野
4. `aspect` 间接地定义了视锥前端和后端的宽度，实际上视锥的宽度是通过高度乘以 `aspect` 来得到的****

## test
