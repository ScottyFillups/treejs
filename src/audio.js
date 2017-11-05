// given a camera and song path, adds listener to camera and plays song

var THREE = require('three')

function playAudio (camera, path) {
  var listener = new THREE.AudioListener()
  var sound = new THREE.Audio(listener)
  var audioLoader = new THREE.AudioLoader()

  camera.add(listener)

  audioLoader.load(path, function( buffer ) {
    sound.setBuffer( buffer )
    sound.setLoop( true )
    sound.setVolume( 0.5 )
    sound.play()
  })
}

module.exports = playAudio
