// ground.js
// given a scene, appends additional meshes and materials, doesn't return anything

var THREE = require('three')

function addGround (scene) {
  var geometry = new THREE.PlaneBufferGeometry( 150, 150 );
  var material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x421a0f)
  })
  var mesh = new THREE.Mesh( geometry, material );
//  mesh.rotation.z += Math.PI / 2 
  //  note: planes only have one normal
  mesh.rotation.x = -Math.PI / 2
  scene.add( mesh );
}

module.exports = addGround
