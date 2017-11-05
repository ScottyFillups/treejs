var THREE = require('three')
var addGrass = require('./grass')
var addGround = require('./ground')
var addSky = require('./sky')
var addTree = require('./tree')
var playAudio = require('./audio')

var scene = new THREE.Scene()
scene.background = new THREE.Color(0x6aa2fc)
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
camera.position.set( 0, 100, 500 );
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


addGround(scene)
addSky(scene)
addTree(scene)
playAudio(camera, '../assets/summersday.mp3')
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
//scene.add( light );

var grassRender = addGrass(scene)

function animate () {
  time = Date.now() / 6000
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
