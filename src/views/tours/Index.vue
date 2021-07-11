<template>
  <div class="tours-index">
    <!-- PAGE TOP -->
    <section class="page-title">
      <div class="container">
        <header>
          <h2>
            <!-- Page Title -->
            <strong>Upcoming</strong>
            Shows
          </h2>
          <!-- /Page Title -->
        </header>
      </div>
    </section>
    <!-- /PAGE TOP -->

    <!-- CONTENT -->
    <section>
      <div class="panel panel-light margin-bottom60">
        <div class="panel-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Band</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tour in orderBy(futureTours, 'date')" v-bind:key="tour.id">
                  <td v-if="tour.distance < 50">
                    <img class="thumnail rounded" :src="tour.user.profile_picture" alt="" height="50" />
                    <router-link :to="`/users/${tour.user.id}`">{{ tour.user.name }}</router-link>
                  </td>
                  <td v-if="tour.distance < 50">{{ formatDate(tour.date) }}</td>
                  <td v-if="tour.distance < 50">{{ tour.location }}</td>
                  <td v-if="tour.distance < 50">{{ tour.comment }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <!-- /CONTENT -->

    <!-- <h1>Tours</h1>
    <div>
      <table>
        <tr>
          <th>Band</th>
          <th>Date</th>
          <th>Location</th>
          <th>Comment</th>
        </tr>
        <tr v-for="tour in orderBy(futureTours, 'date')" v-bind:key="tour.id">
          <span v-if="tour.distance < 50">
            <td>
              <img :src="tour.user.profile_picture" alt="" />
              <router-link :to="`/users/${tour.user.id}`">{{ tour.user.name }}</router-link>
            </td>
            <td>{{ formatDate(tour.date) }}</td>
            <td>{{ tour.location }}</td>
            <td>{{ tour.comment }}</td>
            <td><button v-on:click="createConversation(tour)">Message</button></td>
          </span>
        </tr>
      </table>
    </div> -->
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
      tours: [],
      currentUserId: "",
      currentUser: {},
      currentConversation: {},
      newConversation: {},
    };
  },
  created: function () {
    this.indexTours();
    if (localStorage.user_id) {
      this.currentUserId = localStorage.user_id;
    }
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    indexTours: function () {
      axios.get("/tours").then((response) => {
        console.log("tours index", response.data);
        this.tours = response.data;
      });
    },
    getCurrentUser: function () {
      axios.get(`/users/${this.currentUserId}`).then((response) => {
        console.log("Current User", response.data);
        this.currentUser = response.data;
      });
    },
    createConversation: function (tour) {
      console.log("tour", tour);
      if (this.currentUser.conversations.find((key) => key.band_id === tour.user.id)) {
        this.currentConversation = this.currentUser.conversations.find((key) => key.band_id === tour.user.id);
        this.$router.push(`/conversations/${this.currentConversation.id}`);
      } else {
        var params = {
          band_id: tour.user.id,
          host_id: this.currentUser.id,
        };
        axios.post("/conversations", params).then((response) => {
          console.log(response.data);
          this.newConversation = response.data;
          this.$router.push(`/conversations/${this.newConversation.id}`);
        });
      }
    },
    formatDate: function (date) {
      return moment(date).format("M/D/YY");
    },
    isFuture: function (date) {
      return moment().format("YYYY-MM-DD") <= date;
    },
  },
  computed: {
    futureTours: function () {
      return this.tours.filter((tour) => {
        return this.isFuture(tour.date);
      });
    },
  },
};
</script>
