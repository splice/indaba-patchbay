
.factory('player', ['$rootScope','http','$timeout',
           function( $rootScope , http , $timeout) {


  var player = {}

  player.play = function(audio) {
    if (!audio.preview_url) throw new Error("player: preview_url is required");
    soundManager.onready(function() {
      soundManager.stopAll()

      player.sound = soundManager.createSound({
        id: audio.id,
        url: audio.preview_url,
        autoLoad: true,
        autoPlay: true
      });

      player.sound.play({
      });

    });
  };

  setInterval(function() {
    $rootScope.$digest()
  }, 1000)

  player.stopAll = function() {
    soundManager.stopAll()
  }

  player.isPlaying = function(audio) {
    return player.sound
        && player.sound.id === audio.id
        && player.sound.playState === 1
        && !player.sound.paused
  }

  player.position

  return player;

}])

