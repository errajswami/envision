$(document).ready(Main);


function Main() {
  const messagePlaceholder = $(DOMS.CHAT_MESSAGE_PLACEHOLDER);
  const chat = new Chat(messagePlaceholder);
  const socket = io.connect(SERVER_URL);

  const chatInput = $(DOMS.CHAT_INPUT);
  const chatSendBtn = $(DOMS.CHAT_SEND_BUTTON);
  const suggestion = $(".suggestion");

  let isWelcomeScreen = $(".main-wrapper").data("id");

  if(isWelcomeScreen === 1) {

    $("#welcome-note").fadeIn("slow");

    setTimeout(function(){
      $("#lets-start").fadeIn();
    }, 1000);

    $("#lets-start").click(function() {
      $("#welcome-note").fadeOut("slow");
      setTimeout(function(){
        $("#nav").fadeIn(1000);
        $("#main-content").fadeIn(2000);
      }, 600);
    })
  } else {
    $("#nav").show();
    $("#main-content").show();
  }

  let sendMessage = function () {
    const strMessage = chatInput.val();
    chat.send(strMessage, USER_TYPE.USER);
    socket.emit('my event', {
      user_name: 'Customer',
      message: strMessage
    })
    chatInput.val('').focus();
  }

  chatSendBtn.click(sendMessage);
  chatInput.on('keypress', function (e) {
    if (e.which == 13) {
      sendMessage();
    }
  })

  suggestion.click(function(e) {
    let strMessage = $(this).html();
    chat.send(strMessage, USER_TYPE.USER);
    socket.emit('my event', {
      user_name: 'Customer',
      message: strMessage
    })
    $(this).remove();
  })

  socket.on('my response', function (payload) {
    if (payload.user_name === "Help Desk") {
      chat.send(payload.message, USER_TYPE.SYSTEM);
      const objVideo = new VideoProcessing(DOMS.VIDEO_PLAYER_DOM, DOMS.VIDEO_SRC_DOM);
      objVideo.processVideo(payload.message);
    }
  });

  socket.on('message', function (data) {
    document.getElementById("predicting-text").innerHTML  = data
  });


  socket.on('pred', function (data) {
    document.getElementById("chat-input").value = data
	sendMessage();
  });

}
