<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="newUserParams.name" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="newUserParams.user_name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="newUserParams.email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="newUserParams.password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="newUserParams.password_confirmation" />
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input type="text" class="form-control" v-model="newUserParams.address" />
      </div>
      <div class="form-group">
        <label>Accommodation Description:</label>
        <input type="text" class="form-control" v-model="newUserParams.accommodation_description" />
      </div>
      <div class="form-group">
        <label>Band:</label>
        <input type="checkbox" id="band" name="band" value="true" class="form-control" v-model="newUserParams.band" />
      </div>
      <div class="form-group">
        <label>Profile Picture:</label>
        <input type="text" class="form-control" v-model="newUserParams.profile_picture" />
      </div>
      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="newUserParams.bio" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
