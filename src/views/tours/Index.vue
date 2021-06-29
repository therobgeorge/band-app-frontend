<template>
  <div class="tours-index">
    <h1>Tours</h1>
    <div v-for="tour in tours" v-bind:key="tour.id">
      <table>
        <tr>
          <th>Band</th>
          <th>Date</th>
          <th>Location</th>
          <th>Comment</th>
        </tr>
        <tr>
          <td>
            <img :src="tour.user.profile_picture" alt="" />
            {{ tour.user.name }}
          </td>
          <td>{{ tour.date }}</td>
          <td>{{ tour.location }}</td>
          <td>{{ tour.comment }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      tours: [],
    };
  },
  created: function () {
    this.indexTours();
  },
  methods: {
    indexTours: function () {
      axios.get("/tours").then((response) => {
        console.log("tours index", response.data);
        this.tours = response.data;
      });
    },
  },
};
</script>
