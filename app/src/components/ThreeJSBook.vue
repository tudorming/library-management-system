<template>
  <div ref="container"></div>
</template>

<script>
import * as THREE from 'three'
import { IntType } from 'three'

export default {
  name: 'ThreeJSBook',
  props: {
    frontTexture: String,
    backTexture: String,
    sideTexture: String,
    pageTexture: String,
  },
  mounted() {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(75, 900 / 600, 0.1, 900)
    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(900, 600)
    this.$refs.container.appendChild(renderer.domElement)

    let bgTexture = new THREE.TextureLoader().load(require('../textures/backgroundgood.jpg'));
    bgTexture.wrapS = THREE.RepeatWrapping
    bgTexture.wrapT = THREE.RepeatWrapping
    bgTexture.repeat.set(3, 3)
    scene.background = bgTexture;
    // scene.background = new THREE.Color(0x222222);

    let geometryback = new THREE.BoxGeometry(0.2, 3, 2.2)
    let geometryfront = new THREE.BoxGeometry(2.2, 3, 0.2)
    let texturefront = new THREE.TextureLoader().load(require(`../textures/${this.frontTexture}`))
    let textureback = new THREE.TextureLoader().load(require(`../textures/${this.backTexture}`))
    let texturepage = new THREE.TextureLoader().load(require(`../textures/${this.pageTexture}`))
    let textureside = new THREE.TextureLoader().load(require(`../textures/${this.sideTexture}`))
    let textureblur = new THREE.TextureLoader().load(require('../textures/blurred.jpg'))
    let texturesidepage = new THREE.TextureLoader().load(require('../textures/side-page.jpeg'))


    let materialfront = [
      new THREE.MeshBasicMaterial({ map: texturesidepage }), // right
      new THREE.MeshBasicMaterial({ map: textureside }), // left
      new THREE.MeshBasicMaterial({ color: 0xf7edd0 }), // top
      new THREE.MeshBasicMaterial({ color: 0xf7edd0 }), // bottom
      new THREE.MeshBasicMaterial({ map: texturefront }),    // front
      new THREE.MeshBasicMaterial({ map: texturepage })  // back
    ]
    let meshcover = new THREE.Mesh(geometryfront, materialfront)
    meshcover.position.set(0, 0, 0)
    // scene.add(meshcover)

    let materialback = [
      new THREE.MeshBasicMaterial({ map: textureblur }), // right
      new THREE.MeshBasicMaterial({ map: textureback }), // left
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // top
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // bottom
      new THREE.MeshBasicMaterial({ color: 0xffffff }),    // front
      new THREE.MeshBasicMaterial({ map: texturesidepage })  // back
    ]

    let meshback = new THREE.Mesh(geometryback, materialback)
    meshback.position.set(-1, 0, -1.22)
    // scene.add(meshback)

    let group = new THREE.Group()
    group.add(meshcover)
    group.add(meshback)
    scene.add(group)

    camera.position.z = 5
    camera.lookAt(meshcover.position);

    let mouse = new THREE.Vector2()
    let targetRotation = new THREE.Vector2()
    let isDragging = false

    function onMouseMove(event) {
      mouse.x = (event.clientX / 900) * 2 - 1
      mouse.y = -(event.clientY / 600) * 2 + 1

      if (isDragging) {
        targetRotation.y = mouse.x * Math.PI
        group.rotation.y += 0.05 * (targetRotation.y - group.rotation.y)
      }
    }
    this.$refs.container.addEventListener('mousemove', onMouseMove, false)

    function onMouseDown(event) {
      if (event.button === 0) {
        isDragging = true
      }
    }
    this.$refs.container.addEventListener('mousedown', onMouseDown, false)

    function onMouseUp(event) {
      if (event.button === 0) {
        isDragging = false
      }
    }
    this.$refs.container.addEventListener('mouseup', onMouseUp, false)

    const rect = this.$refs.container.getBoundingClientRect()

    // function onWheel(event) {
    //   camera.position.z += event.deltaY * 0.001
    // }
    // this.$refs.container.addEventListener('wheel', onWheel, false)
    
    function onKeyboardZoom(event) {
      if (event.key === "+") {
        camera.position.z -= 0.1;
      } else if (event.key === "-") {
        camera.position.z += 0.1; 
      } else if (event.key === "=") {
        camera.position.z -= 0.1; 
      }
    }
    window.addEventListener("keydown", onKeyboardZoom, false);

    function animate() {
      requestAnimationFrame(animate)

      renderer.render(scene, camera)
    }
    animate()
  }
}
</script>
