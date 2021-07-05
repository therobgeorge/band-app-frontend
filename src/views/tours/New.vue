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
        <input type="date" class="form-control" v-model="newTourParams.date" />
      </div>
      <div class="form-group">
        <label>Location:</label>
        <input type="text" class="form-control" v-model="newTourParams.location" placeholder="City, State" />
      </div>
      <div class="form-group">
        <label>Comment:</label>
        <textarea
          cols="30"
          rows="10"
          v-model="newTourParams.comment"
          placeholder="Anything your host should know?"
        ></textarea>
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
      currentUserId: "",
    };
  },
  created: function () {
    if (localStorage.user_id) {
      this.currentUserId = localStorage.user_id;
    }
  },
  methods: {
    createTour: function () {
      axios
        .post("/tours", this.newTourParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/users/${this.currentUserId}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
