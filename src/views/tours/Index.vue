<template>
  <div class="tours-index">
    <h1>Tours</h1>
    <div v-for="tour in tours" v-bind:key="tour.id">
      <p>{{ tour.date }}</p>
      <p>{{ tour.location }}</p>
      <p>{{ tour.comment }}</p>
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
