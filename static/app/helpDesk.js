
$(document).ready(HelpDesk);

function HelpDesk() {
  const messagePlaceholder = $(DOMS.CHAT_MESSAGE_PLACEHOLDER);
  const chat = new Chat(messagePlaceholder);
  const socket = io.connect(SERVER_URL);

  const chatInput = $(DOMS.CHAT_INPUT);
  const chatSendBtn = $(DOMS.CHAT_SEND_BUTTON);

  let sendMessage = function() {
    const strMessage = chatInput.val();
    chat.send(strMessage);
    socket.emit('my event', {
      user_name: 'Help Desk',
      message: strMessage
    });
    chatInput.val('').focus()
  }

  chatSendBtn.click(sendMessage);
  chatInput.on('keypress', function (e) {
    if (e.which == 13) {
      sendMessage();
    }
  })

  socket.on('connect', function () {
    chat.send("Welcome");
    socket.emit('my event', {
      user_name: 'Help Desk',
      message: 'Welcome'
    });
  });


  socket.on('my response', function (payload) {
    if (payload.user_name == "Customer") {
      chat.send(payload.message, USER_TYPE.USER);
    }
  });
}
