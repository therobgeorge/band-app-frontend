<template>
  <div class="users-edit">
    <span>
      <form v-on:submit.prevent="updateUser()">
        <h1>Edit User</h1>
        <img :src="editUserParams.profile_picture" alt="" />
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="editUserParams.name" />
        </div>
        <div class="form-group">
          <label>Profile Picture:</label>
          <input type="file" v-on:change="setFile($event)" ref="fileInput" class="form-control" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="text" class="form-control" v-model="editUserParams.email" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="editUserParams.password" />
        </div>
        <div class="form-group">
          <label>Password Confirmation:</label>
          <input type="password" class="form-control" v-model="editUserParams.password_confirmation" />
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <textarea v-model="editUserParams.bio" cols="30" rows="10"></textarea>
        </div>
        <span v-if="editUserParams.band == false">
          <div class="form-group">
            <label>Address:</label>
            <textarea v-model="editUserParams.address" cols="30" rows="10"></textarea>
          </div>
          <div class="form-group">
            <label>Accommodation:</label>
            <textarea v-model="editUserParams.accommodation_description" cols="30" rows="10"></textarea>
          </div>
        </span>
        <input type="submit" class="btn btn-primary" value="Submit" />
        <button v-on:click="destroyUser()">Delete Profile</button>
      </form>
    </span>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      editUserParams: {},
      errors: [],
      profile_picture: "",
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User Object", response.data);
      this.editUserParams = response.data;
    });
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.profile_picture = event.target.files[0];
      }
    },
    updateUser: function () {
      var formData = new FormData();
      formData.append("name", this.editUserParams.name);
      formData.append("email", this.editUserParams.email);
      formData.append("password", this.editUserParams.password);
      formData.append("password_confirmation", this.editUserParams.password_confirmation);
      formData.append("bio", this.editUserParams.bio);
      formData.append("address", this.editUserParams.address);
      formData.append("acommodation_description", this.editUserParams.acommodation_description);
      if (this.profile_picture != "") {
        formData.append("profile_picture", this.profile_picture);
      }
      axios
        .patch(`/users/${this.editUserParams.id}`, formData)
        .then((response) => {
          console.log("Edit User Object", response.data);
          this.$router.push(`/users/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    destroyUser: function () {
      if (confirm("Confirm Delete Your Profile"))
        axios.delete(`/users/${this.editUserParams.id}`).then((response) => {
          console.log(response.data);
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("jwt");
          localStorage.removeItem("user_id");
          this.$router.push("/");
        });
    },
  },
};
</script>
