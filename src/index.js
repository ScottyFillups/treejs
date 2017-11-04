var THREE = require('three')
var addGrass = require('./grass')

var scene = new THREE.Scene()
scene.background = new THREE.Color(0x6aa2fc)
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 55, 100)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)
var grassRender = addGrass(cube)

function animate () {
  //cube.rotation.x += 0.01
  //cube.rotation.y += 0.03
  requestAnimationFrame(animate)
  grassRender()
  renderer.render(scene, camera)
}
animate()
