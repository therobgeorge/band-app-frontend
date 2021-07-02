<template>
  <div class="tours-new">
    <form v-on:submit.prevent="createTour()">
      <h1>New Tour Date</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Date:</label>
        <input type="text" class="form-control" v-model="newTourParams.date" />
      </div>
      <div class="form-group">
        <label>Location:</label>
        <input type="text" class="form-control" v-model="newTourParams.location" />
      </div>
      <div class="form-group">
        <label>Comment:</label>
        <input type="text" class="form-control" v-model="newTourParams.comment" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newTourParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createTour: function () {
      axios
        .post("/tours", this.newTourParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/tours");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
