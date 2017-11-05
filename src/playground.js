var THREE = require('three')
THREE.OrbitControls = require('three-orbit-controls')(THREE)
THREE.Sky = require('./three-sky')

var container;
var camera, controls, scene, renderer;
var sky, sunSphere;
init();
render();
function initSky() {
  // Add Sky
  sky = new THREE.Sky();
  sky.scale.setScalar( 450000 );
  scene.add( sky );
  // Add Sun Helper
  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    new THREE.MeshBasicMaterial( { color: 0xffffff } )
  );
  sunSphere.position.y = - 700000;
  sunSphere.visible = false;
  scene.add( sunSphere );
  /// GUI
  var effectController  = {
    turbidity: 10,
    rayleigh: 2,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    luminance: 1,
    inclination: 0.49, // elevation / inclination
    azimuth: 0.25, // Facing front,
    sun: ! true
  };
  var distance = 400000;
  function guiChanged() {
    var uniforms = sky.material.uniforms;
    uniforms.turbidity.value = effectController.turbidity;
    uniforms.rayleigh.value = effectController.rayleigh;
    uniforms.luminance.value = effectController.luminance;
    uniforms.mieCoefficient.value = effectController.mieCoefficient;
    uniforms.mieDirectionalG.value = effectController.mieDirectionalG;
    var theta = Math.PI * ( effectController.inclination - 0.5 );
    var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
    sunSphere.position.x = distance * Math.cos( phi );
    sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
    sunSphere.visible = effectController.sun;
    uniforms.sunPosition.value.copy( sunSphere.position );
    renderer.render( scene, camera );
  }
  /*var gui = new dat.GUI();
  gui.add( effectController, "turbidity", 1.0, 20.0, 0.1 ).onChange( guiChanged );
  gui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
  gui.add( effectController, "luminance", 0.0, 2 ).onChange( guiChanged );
  gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
  gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
  gui.add( effectController, "sun" ).onChange( guiChanged );*/
  guiChanged();
}
function init() {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 2000000 );
  camera.position.set( 0, 100, 2000 );
  //camera.setLens(20);
  scene = new THREE.Scene();
  var helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff );
  scene.add( helper );
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  //controls.maxPolarAngle = Math.PI / 2;
  controls.enableZoom = false;
  controls.enablePan = false;
  initSky();
}
function render() {
  renderer.render( scene, camera );
}



/*
var THREE = require('three')

var camera, scene, renderer;
init();
animate();
function init() {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 75, 100 );

  fog = new THREE.Fog( 0x000000, -100, 1000 )

  scene = new THREE.Scene();
  //  scene.fog = fog
  scene.background = new THREE.Color( 0x003300 );
  var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
  var texture = new THREE.CanvasTexture( generateTexture() );
  for ( var i = 0; i < 20; i ++ ) {
    var material = new THREE.MeshBasicMaterial( {
      color: new THREE.Color().setHSL( 0.3, 0.75, ( i / 15 ) * 0.4 + 0.1 ),
      map: texture,
      depthTest: false,
      depthWrite: false,
      transparent: true
    } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.y = i * 0.25;
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );
  }
  //scene.children.reverse();
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
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
//
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {
  var time = Date.now() / 6000;
  //  camera.position.x = 80 * Math.cos( time );
  //  camera.position.z = 80 * Math.sin( time );
  camera.lookAt( scene.position );
  for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
    var mesh = scene.children[ i ];
    mesh.position.x = Math.sin( time * 4 ) * i * i * 0.005;
    mesh.position.z = Math.cos( time * 6 ) * i * i * 0.005;
  }
  renderer.render( scene, camera );
}
*/
