var THREE = require('three')
var addGrass = require('./grass')
var addGround = require('./ground')
var addSky = require('./sky')
var addTree = require('./tree')
var playAudio = require('./audio')

var scene = new THREE.Scene()
scene.background = new THREE.Color(0x6aa2fc)
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
camera.position.set( 0, 100, 250 );
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

var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube4 = new THREE.Mesh(geometry, material)
cube4.position.x -= -25
cube4.position.z = 50
cube4.position.y += 20
scene.add(cube4)

var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube3 = new THREE.Mesh(geometry, material)
cube3.position.x -= 25
cube3.position.z = 50
cube3.position.y += 20
scene.add(cube3)

var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube2 = new THREE.Mesh(geometry, material)
cube2.position.x -= 50
cube2.position.z = 0
cube2.position.y += 20
scene.add(cube2)

var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube5 = new THREE.Mesh(geometry, material)
cube5.position.x -= 25
cube5.position.z = -35
cube5.position.y += 20
scene.add(cube5)

var geometry = new THREE.BoxGeometry(20, 20, 20)
var material = new THREE.MeshNormalMaterial({ color: 0x00ff00 })
var cube6 = new THREE.Mesh(geometry, material)
cube6.position.x = 25
cube6.position.z = -35
cube6.position.y += 20
scene.add(cube6)

addGround(scene)
addSky(scene)
addTree(scene)
playAudio(camera, '../assets/summersday.mp3')
var grassRender = addGrass(scene)

function animate () {
  time = Date.now() / 6000
  cube.rotation.x += 0.01
  cube.rotation.y += 0.03
  cube2.rotation.x += 0.01
  cube2.rotation.y += 0.03
  cube3.rotation.x += 0.01
  cube3.rotation.y += 0.03
  cube4.rotation.x += 0.01
  cube4.rotation.y += 0.03
  cube5.rotation.x += 0.01
  cube5.rotation.y += 0.03
  cube6.rotation.x += 0.01
  cube6.rotation.y += 0.03
  requestAnimationFrame(animate)
  grassRender()
  camera.position.x = Math.sin(time) * 300
  camera.position.z = Math.cos(time) * 300
  var focus = new THREE.Vector3(0, 100, 0)
  camera.lookAt(focus)
//  camera.rotation.x = 10 * Math.sin(time)
//  camera.rotation.z = 15 * Math.cos(time
  renderer.render(scene, camera)
}
animate()
