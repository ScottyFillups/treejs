var THREE = require('three')

var height = 6.0;

function addTree(scene){
  var trad = 15.0;
  var geometry = new THREE.CylinderGeometry(trad, trad, height, 16);
  var material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x331a00)
  })
  var cylinder = new THREE.Mesh(geometry, material)
  cylinder.position.x = 0
  cylinder.position.y = 0
  cylinder.position.z = 0
  scene.add(cylinder)
  add_chunk(scene, cylinder)
}

function add_chunk(scene, cylinder){
  if (cylinder.geometry.parameters.radiusTop < 2){
    return
  }
  // Chance to have a branch
  var r = Math.random();
  if (r > (.55 + (cylinder.geometry.parameters.radiusTop)/15.0)){
    var b = generate_branch(cylinder)
    var rnd = Math.random() - .5
    var rnd2 = Math.random() - .5
    b.rotation.z = .25 * 10
    b.rotation.x = rnd2 * 10
    cylinder.add(b)
    add_chunk(scene, b)
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
    color: new THREE.Color(0x331a00)
  })
  var cylinder2 = new THREE.Mesh(geometry, material)
  return cylinder2
}

module.exports = addTree
