<template>
  <div class="conversations-index">
    <!-- PAGE TOP -->
    <section class="page-title">
      <div class="container">
        <header>
          <h2>
            <!-- Page Title -->
            <strong>Messages</strong>
          </h2>
          <!-- /Page Title -->
        </header>
      </div>
    </section>
    <!-- /PAGE TOP -->

    <!-- CONTENT -->
    <div class="container">
      <div class="col-md-4">
        <section v-if="currentUser.band == true">
          <ul
            class="comment list-unstyled"
            v-for="conversation in orderBy(conversations, 'last_message.created_at', -1)"
            v-bind:key="conversation.id"
          >
            <li class="comment">
              <!-- avatar -->
              <router-link :to="`/conversations/${conversation.id}`">
                <img
                  class="thumbnail rounded"
                  :src="conversation.host.profile_picture"
                  width="25"
                  height="25"
                  alt="avatar"
                />
              </router-link>

              <!-- comment body -->
              <div class="comment-body">
                <a href="#" class="comment-author">
                  <small class="text-muted pull-right">{{ fromNowDate(conversation.last_message.created_at) }}</small>
                  <router-link :to="`/conversations/${conversation.id}`">
                    <span>{{ conversation.host.name }}</span>
                  </router-link>
                </a>
                <p>
                  {{ conversation.last_message.body }}
                </p>
              </div>
              <!-- /comment body -->
            </li>
            <hr />
          </ul>
        </section>
      </div>
    </div>
    <!-- /CONTENT -->

    <!-- <h1>Messages</h1> -->

    <!-- <span v-if="currentUser.band == true">
      <div v-for="conversation in orderBy(conversations, 'last_message.created_at', -1)" v-bind:key="conversation.id">
        <table>
          <tr><img :src="conversation.host.profile_picture" alt="test" /></tr>
          <router-link :to="`/conversations/${conversation.id}`">
            <tr>{{ conversation.host.name }}</tr>
          </router-link>
          <tr v-if="conversation.last_message.body.length < 30">{{ conversation.last_message.body }}</tr>
          <tr v-else>{{ conversation.last_message.body.slice(0, 30) }}...</tr>
        </table>
      </div>
    </span>

    <span v-if="currentUser.band == false">
      <div v-for="conversation in orderBy(conversations, 'last_message', -1)" v-bind:key="conversation.id">
        <table>
          <tr><img :src="conversation.band.profile_picture" alt="" /></tr>
          <router-link :to="`/conversations/${conversation.id}`">
            <tr>{{ conversation.band.name }}</tr>
          </router-link>
        </table>
      </div>
    </span> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from "moment";

export default {
  mixins: [Vue2Filters.mixin],
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
    fromNowDate: function (date) {
      return moment(date).fromNow();
    },
  },
};
</script>
