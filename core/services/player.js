
.factory('player', ['$rootScope','http','$timeout',
           function( $rootScope , http , $timeout) {


  var player = {}

  player.playSubmission = function(audio, opts) {
    if (!audio.preview_url) throw new Error("player: preview_url is required");

    player.data = {
      type: 'submission',
      id: audio.id,
      duration: audio.duration,
      waveform_url: audio.waveform_url,
      artwork_url: audio.user.image_urls.detail,
      play_count: audio.play_count,
      user: audio.user,
      artist: audio.user.name,
      artist_url: 'http://www.indabamusic.com/people/' + audio.user.slug,
      name: audio.name,
      description: audio.description,


      submission: audio
    }
    playAudio(audio, opts)
  };

  player.playReferenceAudio = function(audio, opts) {
    player.data = {
      type: 'reference_audio',

      id: audio.id,
      duration: audio.duration,
      waveform_url: audio.waveform_url,
      artwork_url: audio.image_url,
      play_count: audio.play_count,
      name: audio.name,
    }
    // need `artist` and `artist_url` for a reference audio
    playAudio(audio, opts)
  }

  player.playOppReferenceAudio = function(opp, opts) {
    var audio = opp.reference_audio

    player.data = {
      type: 'opp_reference_audio',

      id: audio.id,
      duration: audio.duration,
      waveform_url: audio.waveform_url,
      artwork_url: audio.image_url,
      play_count: audio.play_count,
      name: audio.name,

      opp: opp
    }

    // need `artist` and `artist_url` for a reference audio
    playAudio(audio, opts)
  }


  player.stopAll = function() {
    soundManager.stopAll()
  }

  player.isPlaying = function(audio) {
    return audio
        && player.sound
        && player.sound.id === audio.id
        && player.sound.playState === 1
        && !player.sound.paused
  }


  return player;



  function playAudio(audio, opts) {
    soundManager.onready(function() {
      soundManager.stopAll()

      opts = opts || {}
      opts = _.defaults(opts, {
        id: audio.id,
        url: audio.preview_url,
        autoLoad: true,
        autoPlay: true,
        whileplaying: function() {
          player.sound.percent = this.position / player.data.duration * 100
          $rootScope.$digest()
        },
        onfinish: function() {
          $rootScope.$broadcast('playerFinished');
          $rootScope.$digest();
        }
      })

      player.sound = soundManager.createSound(opts)

      if (opts.autoPlay) {
        player.sound.play();
      }



    });
  }


}])

