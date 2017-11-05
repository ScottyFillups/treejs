var THREE = require('three')

var addGrass = require('./grass')
var addGround = require('./ground')
var addTree = require('./tree')

var scene = new THREE.Scene()
scene.background = new THREE.Color(0x6aa2fc)
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 75, 200)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube = new THREE.Mesh(geometry, material)
cube.position.x = 0
cube.position.z = 0
cube.position.y = 0
scene.add(cube)

addGround(scene)

var grassRender = addGrass(scene)
addTree(scene)

function animate () {
  time = Date.now() / 6000
  cube.rotation.x += 0.01
  cube.rotation.y += 0.03
  requestAnimationFrame(animate)
  //camera.lookAt(scene.position)
  //camera.rotation.x = 10 * Math.sin(time)
  //camera.rotation.z = 15 * Math.cos(time)
  grassRender()
  renderer.render(scene, camera)
}
animate()
