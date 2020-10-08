const USER_TYPE = {
    SYSTEM: 1,
    USER: 2
}



function Chat(placeHolder) {
    this.placeHolder = placeHolder;

    this.getSystemMessage = function(message) {
        return `
        <div class="direct-chat-msg left">
            <div class="direct-chat-infos clearfix float-left">
                <div class="user-icon system-user "> 
                    <i class="fas fa-user-cog"></i> 
                    <!-- <span class="direct-chat-name">User 1</span> -->
                </div>
    
                <!-- <span class="direct-chat-timestamp float-right">23 Jan 2:00 pm</span> -->
    
            </div>
            <div class="direct-chat-text">
                ${message}
            </div>
        </div>
        `;
    }
    
    this.getUserMessage = function(message) {
        return `
        <div class="direct-chat-msg right">
            <div class="direct-chat-infos clearfix float-right">
                <div class="user-icon user">
                    <!-- <span class="direct-chat-name">User 2</span>   -->
                    <i class="fas fa-user"></i> 
                </div>
                <!-- <span class="direct-chat-timestamp float-left">23 Jan 2:05 pm</span> -->
            </div>
            <!-- /.direct-chat-infos -->
    
            <!-- /.direct-chat-img -->
            <div class="direct-chat-text">
                ${message}
            </div>
            <!-- /.direct-chat-text -->
      </div>
        `;
    }

    this.send = function(message, boolUserType = USER_TYPE.SYSTEM) {
        let content = ``;
        
        if(boolUserType === USER_TYPE.SYSTEM) {
            content = this.getSystemMessage(message);
        } else {
            content = this.getUserMessage(message);
        }
        
        this.placeHolder.append(content);
    }
}

$(document).ready(function() {
    const messagePlaceholder = $(".direct-chat-messages");
    
    const chat = new Chat(messagePlaceholder);
    
    var socket = io.connect('http://' + document.domain + ':' + location.port);

    socket.on('connect', function() {
        socket.emit( 'my event', {
            data: 'User Connected'
        });
        
        const chatInput = $("#chat-input");

        function sendMessage() {
            const strMessage = chatInput.val();
            
            chat.send(strMessage, USER_TYPE.USER);

            socket.emit( 'my event', {
                user_name : 'Customer',
                message : strMessage
            })

            chatInput.val('').focus();
        }

        $("#chat-send-btn").click(sendMessage);
        
        chatInput.on('keypress', function(e) {
            if(e.which == 13) {
                sendMessage();
            }
        })
    });

    socket.on( 'my response', function( payload ) {
        if(payload.user_name === "Help Desk") {
            chat.send(payload.message, USER_TYPE.SYSTEM);
            const objVideo = new VideoProcessing();
            objVideo.processVideo(payload.message);
        }
    });

});
