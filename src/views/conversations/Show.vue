<template>
  <div class="conversation-show">
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
      <div class="col-md-6">
        <section>
          <div class="panel panel-light margin-bottom60">
            <div class="panel-body">
              <form v-on:submit.prevent="createMessage()" class="sky-form">
                <fieldset>
                  <section>
                    <label class="textarea">
                      <i class="icon-append fa fa-comment"></i>
                      <textarea v-model="newMessageParams.body" rows="3" placeholder="Message..."></textarea>
                    </label>
                  </section>
                </fieldset>

                <footer>
                  <button type="submit" class="button">
                    <i class="fa fa-send"></i>
                    Send Message
                  </button>
                </footer>
              </form>
            </div>
            <div class="panel-body">
              <ul
                class="comment list-unstyled"
                v-for="message in orderBy(conversation.messages, 'created_at', -1)"
                v-bind:key="message.id"
              >
                <li class="comment">
                  <!-- avatar -->
                  <router-link :to="`/users/${message.user.id}`">
                    <img
                      class="avatar rounded"
                      :src="message.user.profile_picture"
                      width="50"
                      height="50"
                      alt="avatar"
                    />
                  </router-link>

                  <!-- comment body -->
                  <div class="comment-body">
                    <a href="#" class="comment-author">
                      <small class="text-muted pull-right">{{ fromNowDate(message.created_at) }}</small>
                      <router-link :to="`/users/${message.user.id}`">
                        <span>{{ message.user.name }}</span>
                      </router-link>
                    </a>
                    <p>
                      {{ message.body }}
                    </p>
                  </div>
                  <!-- /comment body -->
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- /CONTENT -->

    <!-- <h3>Conversation with: {{ conversation.}}</h3> -->
    <!-- <div v-for="message in conversation.messages" v-bind:key="message.id">
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
    </span> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import ActionCable from "actioncable";
import moment from "moment";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
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
        this.conversation.messages.unshift(data); // update the messages in real time
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
          this.newMessageParams = {};
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    fromNowDate: function (date) {
      return moment(date).fromNow();
    },
  },
};
</script>
