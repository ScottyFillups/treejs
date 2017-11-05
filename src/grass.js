// grass.js
// given a scene, appends additional meshes and materials, then
// returns a tuple, the new scene + function to be called during render

var THREE = require('three')

function generateTexture() {
  var canvas = document.createElement( 'canvas' );
  canvas.width = 512;
  canvas.height = 512;
  var context = canvas.getContext( '2d' );
  for ( var i = 0; i < 20000; i ++ ) {
    context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
    context.beginPath();
    context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 2, true );
    context.fill();
  }
  context.globalAlpha = 0.075;
  context.globalCompositeOperation = 'lighter';
  return canvas;
}

function addGrass (scene) {
  var geometry = new THREE.PlaneBufferGeometry( 110, 110 );
  var texture = new THREE.CanvasTexture( generateTexture() );
  var grassMeshes = []
  var grassHeight = 20

  // create a single blade of grass by stacking 20 rotated planes
  for ( var i = 0; i < grassHeight; i ++ ) {
    var material = new THREE.MeshBasicMaterial( {
      color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
      map: texture,
      depthTest: true,
      depthWrite: false,
      transparent: true
    } );
    var mesh = new THREE.Mesh( geometry, material );
    grassMeshes.push(mesh)
    mesh.position.y = i * 0.25;
    mesh.rotation.x = -Math.PI / 2;
    scene.add( mesh );
  }

  // for each blade of grass, make it spin
  function grassRender () {
    var time = Date.now() / 6000;
    for ( var i = 0; i < grassHeight; i ++ ) {
      var mesh = grassMeshes[ i ];
      mesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
      mesh.position.z = Math.cos( time * 6 ) * i * i * 0.005;
    }
  }
  return grassRender
}

module.exports = addGrass
