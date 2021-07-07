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
        <input type="text" class="form-control" v-model="newUserParams.name" placeholder="Full Name or Band Name" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="newUserParams.user_name" placeholder="username" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="newUserParams.email" placeholder="email@email.com" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="newUserParams.password" placeholder="Password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="newUserParams.password_confirmation"
          placeholder="Passoword Confirmation"
        />
      </div>
      <div class="form-group">
        <label>Profile Picture:</label>
        <input type="text" class="form-control" v-model="newUserParams.profile_picture" placeholder="Picture URL" />
      </div>
      <div class="form-group">
        <label>Bio:</label>
        <textarea v-model="newUserParams.bio" cols="30" rows="10" placeholder="Tell us about you!"></textarea>
      </div>
      <div class="form-group">
        <label>Band:</label>
        <input type="text" id="band" name="band" class="form-control" v-model="newUserParams.band" />
      </div>
      <div class="form-group">
        <label>Address:</label>
        <textarea
          v-model="newUserParams.address"
          cols="30"
          rows="10"
          placeholder="1234 Street, City, State, Post Code"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Accommodation Description:</label>
        <textarea
          v-model="newUserParams.accommodation_description"
          cols="30"
          rows="10"
          placeholder="Accomodation Description"
        ></textarea>
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
      newImageParams: {},
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
