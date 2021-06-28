<template>
  <div class="users-new">
    <h1>Sign Up</h1>
    Name:
    <input type="text" v-model="newUser.name" />
    Username:
    <input type="text" v-model="newUser.username" />
    Email:
    <input type="text" v-model="newUser.email" />
    Password:
    <input type="text" v-model="newUser.password" />
    Password Confirmation:
    <input type="text" v-model="newUser.password_confirmation" />
    Address:
    <input type="text" v-model="newUser.address" />
    Accomidation Description:
    <input type="text" v-model="newUser.accomidation_description" />
    Band:
    <input type="text" v-model="newUser.band" />
    Profile Picture:
    <input type="text" v-model="newUser.profile_picture" />
    Bio:
    <input type="text" v-model="newUser.bio" />
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newUserParams: {
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        accomidation_description: "",
        band: "",
        profile_picture: "",
        bio: "",
      },
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createUser: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
