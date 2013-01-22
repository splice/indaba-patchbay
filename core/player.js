
.factory('player', ['$rootScope','http','$timeout',
           function( $rootScope , http , $timeout) {


  var player = {}

  player.playSubmission = function(audio) {
    if (!audio.preview_url) throw new Error("player: preview_url is required");
    player.data = {
      duration: audio.duration,
      waveform_url: audio.waveform_url,
      artwork_url: audio.user.image_urls.detail,
    }
    playAudio(audio)
  };

  player.playReferenceAudio = function(audio) {
    player.data = {
      duration: audio.duration,
      waveform_url: audio.waveform_url,
      artwork_url: audio.image_url,
    }
    playAudio(audio)
  }

  player.stopAll = function() {
    soundManager.stopAll()
  }

  player.isPlaying = function(audio) {
    return player.sound
        && player.sound.id === audio.id
        && player.sound.playState === 1
        && !player.sound.paused
  }


  return player;



  function playAudio(audio) {
    soundManager.onready(function() {
      soundManager.stopAll()

      player.sound = soundManager.createSound({
        id: audio.id,
        url: audio.preview_url,
        autoLoad: true,
        autoPlay: true
      });

      player.sound.play({
        whileplaying: function() {
          player.sound.percent = this.position / player.data.duration * 100
          $rootScope.$digest()
        }
      });

    });
  }


}])

