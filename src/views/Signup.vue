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
        <input type="file" v-on:change="setFile($event)" ref="fileInput" class="form-control" />
      </div>
      <div class="form-group">
        <label>Bio:</label>
        <textarea v-model="newUserParams.bio" cols="30" rows="10" placeholder="Tell us about you!"></textarea>
      </div>
      <!-- <div class="form-group">
        <label>Band:</label>
        <input type="text" id="band" name="band" class="form-control" v-model="newUserParams.band" />
      </div> -->
      <div class="form-group">
        <label>Are You A Band?:</label>
        <input
          type="checkbox"
          id="band"
          name="band"
          class="form-control"
          value="true"
          v-model="newUserParams.band"
          Checked
        />
      </div>
      <div class="form-group" v-if="newUserParams.band == false">
        <label>Address:</label>
        <textarea
          v-model="newUserParams.address"
          cols="30"
          rows="10"
          placeholder="1234 Street, City, State, Post Code"
        ></textarea>
      </div>
      <div class="form-group" v-if="newUserParams.band == false">
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
      errors: [],
      profile_picture: "",
    };
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.profile_picture = event.target.files[0];
      }
    },
    submit: function () {
      var formData = new FormData();
      formData.append("name", this.newUserParams.name);
      formData.append("email", this.newUserParams.email);
      formData.append("password", this.newUserParams.password);
      formData.append("password_confirmation", this.newUserParams.password_confirmation);
      formData.append("bio", this.newUserParams.bio);
      formData.append("band", this.newUserParams.band);
      formData.append("address", this.newUserParams.address);
      formData.append("acommodation_description", this.newUserParams.acommodation_description);
      formData.append("profile_picture", this.profile_picture);
      axios
        .post("/users", formData)
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
