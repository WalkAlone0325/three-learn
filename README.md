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
