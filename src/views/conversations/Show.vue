<template>
  <div class="conversation-show">
    <!-- <h3>Conversation with: {{ conversation.}}</h3> -->
    <div v-for="message in conversation.messages" v-bind:key="message.id">
      <router-link :to="`/users/${message.user.id}`">
        <p>{{ message.user.name }}</p>
      </router-link>
      <img :src="message.user.profile_picture" alt="" />
      <p>{{ message.body }}</p>
    </div>
    <span>
      <form v-on:submit.prevent="createMessage()">
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>New Message</label>
          <textarea v-model="newMessageParams.body" cols="30" rows="10"></textarea>
        </div>
        <input type="submit" class="btn btn-primary" value="Send Message" />
      </form>
    </span>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import ActionCable from "actioncable";
export default {
  data: function () {
    return {
      conversation: {},
      currentUser: "",
      currentUserId: "",
      newMessageParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/conversations/${this.$route.params.id}`).then((response) => {
      console.log("Conversations Show", response.data);
      this.conversation = response.data;
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        this.conversation.messages.push(data); // update the messages in real time
      },
    });
    if (localStorage.user_id) {
      this.currentUserId = localStorage.user_id;
    }
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser: function () {
      axios.get(`/users/${this.currentUserId}`).then((response) => {
        console.log("Current User", response.data);
        this.currentUser = response.data;
      });
    },
    createMessage: function () {
      var params = {
        body: this.newMessageParams.body,
        conversation_id: this.conversation.id,
      };
      axios
        .post("/messages", params)
        .then((response) => {
          console.log(response.data);
          this.newMessageParams = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
