const SERVER_URL = 'http://' + document.domain + ':' + location.port;
const STATIC_URL = `${SERVER_URL}/static`;
const VIDEOS_LOCATION = `${STATIC_URL}/videos`;
const IMAGES_URL = `${STATIC_URL}/img`;

const USER_TYPE = {
  SYSTEM: 1,
  USER: 2
};

const NETWORK_STATE = {
  OK: 1,
  LOADING: 2,
  NOT_FOUND: 3
};


const DOMS = {
  VIDEO_PLAYER_DOM: "#videoPlayer",
  VIDEO_SRC_DOM: "#vidSrc",
  CHAT_MESSAGE_PLACEHOLDER: ".direct-chat-messages",
  CHAT_INPUT: "#chat-input",
  CHAT_SEND_BUTTON: "#chat-send-btn",
  CHAT_MIC: "#chat-mic",
  CHAT_MIC_ICON: "#chat-mic-icon",
  CHAT_MIC_LOADING: '#chat-mic-loading'
};





