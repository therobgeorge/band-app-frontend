<template>
  <div class="tours-index">
    <h1>Tours</h1>
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
            <!-- need to add link once conversation and message pages are complete -->
            <td><button>Message</button></td>
          </span>
        </tr>
      </table>
    </div>
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
