document.addEventListener("DOMContentLoaded", function(event) {
    PusherManager.init();
    PusherManager.connectToChannel();
});

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
        this.presenceChannel.bind('pusher:subscription_succeeded', this.onSubScriptionSucceeded.bind(this));
    },

    onSubScriptionSucceeded: function (_data) {
        this.sUserID = _data.myID+"";

        console.log('onSubScriptionSucceeded', _data);

        this.presenceChannel.bind('pusher:member_added', this.onMemberAdded.bind(this));
        this.presenceChannel.bind('pusher:member_removed', this.onMemberRemoved.bind(this));
        this.presenceChannel.bind('client-messagetochannel', this.onMessageFromOtherPlayer.bind(this));
    },

    onMemberAdded: function (_data) {

    },

    onMemberRemoved: function (_data) {

    },

    sendMessageToChannel: function (_msg) {
        this.presenceChannel.trigger('client-messagetochannel', _msg);
    },

    onMessageFromOtherPlayer: function (_msg) {
        console.log('onMessageFromOtherPlayer', _msg);
    }
};

