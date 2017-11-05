var THREE = require('three')

function addTree(scene){
  var trad = 20.0;
  var height = 20.0;
  var geometry = new THREE.CylinderGeometry(trad, trad, height, 16);
  var material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x0000ff)
  })
  var cylinder = new THREE.Mesh(geometry, material)
  cylinder.position.x = 0
  cylinder.position.y = 0
  cylinder.position.z = 0
  scene.add(cylinder)
  add_chunk(scene, cylinder)
}

function add_chunk(scene, cylinder){
  if (cylinder.geometry.parameters.radiusTop < 0.5){
    return
  }
  // Chance to have a branch
  var r = Math.random();
  if (r > 0.9){

    //add_chunk(scene, cylinder2)
  }
  cylinder2 = generate_branch(cylinder);
  cylinder2.position.y += cylinder.geometry.parameters.height
  cylinder.add(cylinder2);
  add_chunk(scene, cylinder2)
}

function generate_branch(cylinder){
  var trad = cylinder.geometry.parameters.radiusTop * 0.95
  var brad = cylinder.geometry.parameters.radiusTop
  var hgt = cylinder.geometry.parameters.height
  var geometry = new THREE.CylinderGeometry(trad, brad, hgt, 16, 1, false, 0);
  var material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x1100ff)
  })
  var cylinder2 = new THREE.Mesh(geometry, material)
  return cylinder2
}

module.exports = addTree
