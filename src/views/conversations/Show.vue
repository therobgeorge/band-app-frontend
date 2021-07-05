<template>
  <div class="conversation-show">
    <!-- <span v-if="currentUser.band == true">
      <img :src="conversation.host.profile_picture" alt="" />
      <h3>{{ conversation.host.name }}</h3>
      <div v-for="(message, index) in conversation.messages" v-bind:key="message.id">
        <p>{{ conversation.messages[index].body }}</p>
      </div>
    </span> -->
    <!-- <span v-if="currentUser.band == false"> -->
    <!-- <img :src="conversation.band.profile_picture" alt="" /> -->
    <!-- <h3>{{ conversation.messages[0].user.name }}</h3> -->
    <div v-for="(message, index) in conversation.messages" v-bind:key="message.id">
      <p>{{ conversation.messages[index].user.name }}</p>
      <img :src="conversation.messages[index].user.profile_picture" alt="" />
      <p>{{ conversation.messages[index].body }}</p>
    </div>
    <!-- </span> -->
    <span>
      <form v-on:submit.prevent="createMessage()">
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>New Message</label>
          <input type="text" class="form-control" v-model="newMessageParams.body" />
        </div>
        <div class="form-group">
          <label>convo id test</label>
          <input type="text" class="form-control" v-model="newMessageParams.conversation_id" />
        </div>
        <input type="submit" class="btn btn-primary" value="Send Message" />
      </form>
    </span>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
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
      axios
        .post("/messages", this.newMessageParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
