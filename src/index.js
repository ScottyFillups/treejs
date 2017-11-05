var THREE = require('three')
var addGrass = require('./grass')
var addGround = require('./ground')
var addSky = require('./sky')

var scene = new THREE.Scene()
scene.background = new THREE.Color(0x6aa2fc)
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
camera.position.set( 0, 100, 2000 );
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube = new THREE.Mesh(geometry, material)
cube.position.x = 50
cube.position.z = 0
cube.position.y += 20
scene.add(cube)
addGround(scene)
addSky(scene)
var grassRender = addGrass(scene)

function animate () {
  time = Date.now() / 6000
  cube.rotation.x += 0.01
  cube.rotation.y += 0.03
  requestAnimationFrame(animate)
//  camera.lookAt(scene.position)
//  camera.rotation.x = 10 * Math.sin(time)
//  camera.rotation.z = 15 * Math.cos(time)
  grassRender()
  renderer.render(scene, camera)
}
animate()
