Meteor.subscribe("chats");
Meteor.subscribe("users");

// set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

// specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
    console.log("rendering root /");
    this.render("navbar", {to: "header"});
    this.render("lobby_page", {to: "main"});
});

// specify a route that allows the current user to chat to another users
Router.route('/chat/:_id', function () {
    console.log("started chat");
    Meteor.call("startChat");
    this.render("navbar", {to: "header"});
    this.render("chat_page", {to: "main"});
});


///
// helper functions
///
Template.available_user_list.helpers({
    users: function () {
        return Meteor.users.find();
    }
});

Template.available_user.helpers({
    getUsername: function (userId) {
        user = Meteor.users.findOne({_id: userId});
        return user.profile.username;
    },
    isMyUser: function (userId) {
        if (userId == Meteor.userId()) {
            return true;
        }
        else {
            return false;
        }
    }
});


Template.chat_page.helpers({
    messages: function () {
        var chat = Chats.findOne({_id: Session.get("chatId")});
        return chat.messages;
    },
    other_user: function () {
        return ""
    }

});

Template.chat_page.events({
    // this event fires when the user sends a message on the chat page
    'submit .js-send-chat': function (event) {
        // stop the form from triggering a page reload
        event.preventDefault();
        // see if we can find a chat object in the database
        // to which we'll add the message
        var chat = Chats.findOne({_id: Session.get("chatId")});
        if (chat) {// ok - we have a chat to use
            console.log("update chat");
            Meteor.call("updateChat", chat);
        }
    }
});
