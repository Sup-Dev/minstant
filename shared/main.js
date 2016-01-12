// Methods
Meteor.methods({
    startChat: function() {
        // the user they want to chat to has id equal to
        // the id sent in after /chat/...
        var otherUserId = this.params._id;
        // find a chat that has two users that match current user id
        // and the requested user id
        var filter = {
            $or: [
                {user1Id: Meteor.userId(), user2Id: otherUserId},
                {user2Id: Meteor.userId(), user1Id: otherUserId}
            ]
        };
        var chat = Chats.findOne(filter);
        if (!chat) {// no chat matching the filter - need to insert a new one
            chatId = Chats.insert({user1Id: Meteor.userId(), user2Id: otherUserId});
        }
        else {// there is a chat going already - use that.
            chatId = chat._id;
        }
        if (chatId) {// looking good, save the id to the session
            Session.set("chatId", chatId);
        }
    },
    updateChat: function(chat) {
        var msgs = chat.messages; // pull the messages property
        if (!msgs) {// no messages yet, create a new array
            msgs = [];
        }
        // is a good idea to insert data straight from the form
        // (i.e. the user) into the database?? certainly not.
        // push adds the message to the end of the array
        msgs.push({text: event.target.chat.value});
        // reset the form
        event.target.chat.value = "";
        // put the messages array onto the chat object
        chat.messages = msgs;
        // update the chat object in the database.
        Chats.update(chat._id, chat);
    }
});