document.addEventListener("DOMContentLoaded", function(event) {
    GameConnector.init();
});


var GameConnector = {
    GAME_ENTRY_CODE: 'jop',
    GAME_ID: "my game name",

    init: function() {
        PusherManager.init();
        PusherManager.connectToChannel();
    },
    
    onPusherConnected: function() {
        this.showCodeScreen();
    },

    showCodeScreen: function() {
        document.getElementById('code').classList.add('--show');

        document.getElementById('code-submit').onclick = function() {
            GameConnector.onCodeSubmitClicked();
        }
    },

    onCodeSubmitClicked: function() {
        if(document.getElementById('code-input').value == this.GAME_ENTRY_CODE){
            this.showGameScreen();
        }else{
            document.getElementById('code-input').value = '';
        }
    },

    showGameScreen: function() {
        document.getElementById('code').classList.remove('--show');
        document.getElementById('game').classList.add('--show');
        //
        document.getElementById('test-finish').onclick = function() {
            GameConnector.onGameFinishClicked();
        }
    },

    onGameFinishClicked: function () {
        //Send message to server
        PusherManager.sendMessageToChannel({
            msg: 'Game Finished!',
            gameID: this.GAME_ID
        });
        //
        document.getElementById('game').classList.remove('--show');
        document.getElementById('result').classList.add('--show');
    }
};









var PusherManager = {
    CHANNEL_ID: "blockbuster",

    pusher: null,
    bIsHost: false,
    presenceChannel: null,
    sUserID: "",
    bIsConnected: false,

    init: function () {
        Pusher.logToConsole = true;

        this.pusher = new Pusher('34aeee625e438241557b', {
            cluster: 'eu',
            forceTLS: true,
            authEndpoint: 'https://interactionfigure.nl/nhl/blockbusterauth/pusher_auth.php'
        });
    },

    connectToChannel: function () {
        this.presenceChannel = this.pusher.subscribe('presence-'+this.CHANNEL_ID);
        this.presenceChannel.bind('pusher:subscription_succeeded', this.onSubscriptionSucceeded.bind(this));
    },

    onSubscriptionSucceeded: function (_data) {
        this.sUserID = _data.myID+"";

        GameConnector.onPusherConnected()
        
        this.presenceChannel.bind('pusher:member_added', this.onMemberAdded.bind(this));
        this.presenceChannel.bind('pusher:member_removed', this.onMemberRemoved.bind(this));
        this.presenceChannel.bind('client-messagetochannel', this.onMessageFromOtherPlayer.bind(this));
    },

    onMemberAdded: function (_data) {
        console.log('onMemberAdded', _data);
    },

    onMemberRemoved: function (_data) {
        console.log('onMemberRemoved', _data);
    },

    sendMessageToChannel: function (_msg) {
        this.presenceChannel.trigger('client-messagetochannel', _msg);
    },

    onMessageFromOtherPlayer: function (_msg) {
        var p = document.createElement('p');
        p.innerHTML = _msg.msg;

        document.getElementById('output-text').appendChild(p);

    }
};

