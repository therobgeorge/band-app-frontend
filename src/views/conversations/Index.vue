<template>
  <div class="conversations-index">
    {{ currentUserId }}
    <h1>Messages</h1>
    <!-- add link to conversation show page -->
    <span v-if="currentUser.band == true">
      <div v-for="conversation in conversations" v-bind:key="conversation.id">
        <table>
          <tr><img :src="conversation.host.profile_picture" alt="test" /></tr>
          <tr>{{ conversation.host.name }}</tr>
        </table>
      </div>
    </span>
    <!-- add link to conversation show page -->
    <span v-if="currentUser.band == false">
      <div v-for="conversation in conversations" v-bind:key="conversation.id">
        <table>
          <tr><img :src="conversation.band.profile_picture" alt="" /></tr>
          <tr>{{ conversation.band.name }}</tr>
        </table>
      </div>
    </span>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      conversations: {},
      currentUserId: "",
      currentUser: {},
    };
  },
  created: function () {
    this.indexConversations();
    if (localStorage.user_id) {
      this.currentUserId = localStorage.user_id;
    }
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    indexConversations: function () {
      axios.get("/conversations").then((response) => {
        console.log("Conversations Index", response.data);
        this.conversations = response.data;
      });
    },
    getCurrentUser: function () {
      axios.get(`/users/${this.currentUserId}`).then((response) => {
        console.log("Current User", response.data);
        this.currentUser = response.data;
      });
    },
  },
};
</script>
