
$(document).ready(HelpDesk);

function HelpDesk() {
  const messagePlaceholder = $(DOMS.CHAT_MESSAGE_PLACEHOLDER);
  const chat = new Chat(messagePlaceholder);
  const FIRST_MESSAGE = "Hello, How can I help?";
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


  socket.on('my response', function (payload) {
    if (payload.user_name == "Customer") {
      chat.send(payload.message, USER_TYPE.USER);
    }
  });
}
