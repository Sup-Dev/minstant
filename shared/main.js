// Collections
Chats = new Mongo.Collection("chats");

// Methods
Meteor.methods({
    startChat: function(otherUserId) {
        var currentUser = this.userId;
        var id = Chats.insert({user1Id:currentUser, user2Id:otherUser});
        return id;
    },
    updateChat: function(chat) {

        // update the chat object in the database.
        Chats.update(chat._id, chat);
    }
});