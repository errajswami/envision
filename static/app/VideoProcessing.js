function VideoProcessing(playerPlaceholder, videoSrcPlaceholder) {
  let player = $(playerPlaceholder);
  let vidSrc = $(videoSrcPlaceholder);
  const urlPrefix = VIDEOS_LOCATION;
  const urlSuffix = ".mp4";
  const urlLetterSuffix = "-abc.mp4";
  let sources = [];
  let currentVideoTrack = 0;
  let arrWords = [];
  let retryCounter = 0;

  this.processVideo = function (sentence) {
    sentence = sentence.replace('.', '');
    sentence = sentence.replace(',', '');
    sentence = sentence.replace('?', '');
    sentence = sentence.replace('!', '');

    arrWords = sentence.split(" ");;
    prepareUrls();
    vidSrc.attr('src', sources[currentVideoTrack]);
    player.on('ended', videoHandler);
    playVideo();
  }


  var prepareUrls = function () {
    sources = [];
    arrWords.forEach(strWord => {
      strWord = strWord.toLowerCase();
      let videoURl = "";
      if (strWord.length === 1) {
        videoURl = `${urlPrefix}/${strWord}${urlLetterSuffix}`;
      } else {
        videoURl = `${urlPrefix}/${strWord}${urlSuffix}`;
      }
      sources.push(videoURl);
    });
  }

  var videoHandler = function (e) {
    if (!e) {
      e = window.event;
    }

    currentVideoTrack += 1;

    if (currentVideoTrack > sources.length - 1) return;

    $(vidSrc).attr('src', sources[currentVideoTrack]);
    playVideo();
  }

  var makeLetters = function () {
    const word = arrWords[currentVideoTrack];

    let remainingarr = arrWords.splice(currentVideoTrack + 1, arrWords.length);
    arrWords = [...arrWords, ...word.split(""), ...remainingarr];
    prepareUrls();
  }


  var playVideo = function () {
    player[0].load();

    setTimeout(() => {
      let networkState = player[0].networkState;
      if (networkState === NETWORK_STATE.OK) {
        player[0].play();
        retryCounter = 0;
      }
      else if (networkState === NETWORK_STATE.NOT_FOUND) {
        if (arrWords[currentVideoTrack].length !== 1) {
          makeLetters();
        }

        player.trigger("ended");
        retryCounter = 0;
      } else if (networkState === NETWORK_STATE.LOADING) {
        if (retryCounter === 3) {
          player.trigger("ended");
          retryCounter = 0;
          return;
        }

        retry();
      }
    }, 500);
  }

  var retry = function () {
    setTimeout(() => {
      retryCounter += 1;
      playVideo();
    }, 1500);
  }

}

