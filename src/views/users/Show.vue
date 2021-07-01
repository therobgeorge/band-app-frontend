<template>
  <div class="users-show">
    <h2>{{ user.name }}</h2>
    <img :src="user.profile_picture" alt="" />
    <p>{{ user.bio }}</p>

    <span v-if="user.band == false">
      Accomodation:
      <p>{{ user.accomodation_description }}</p>
      <div v-for="(image, index) in user.images" v-bind:key="image.id">
        <img :src="user.images[index].url" alt="" />
      </div>
    </span>
    <span v-if="user.band == true">
      Tours:
      <div v-for="(tour, index) in user.tours" v-bind:key="tour.id">
        <table>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Comment</th>
          </tr>
          <tr>
            <td>{{ user.tours[index].date }}</td>
            <td>{{ user.tours[index].location }}</td>
            <td>{{ user.tours[index].comment }}</td>
          </tr>
        </table>
      </div>
    </span>
    <!-- testing functionality needs to be added to modal -->
    <span>
      <form v-on:submit.prevent="updateUser()">
        <h1>Edit User</h1>
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="user.name" placeholder="Name" />
        </div>
        <div class="form-group">
          <label>Profile Picture:</label>
          <input type="text" class="form-control" v-model="user.profile_picture" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="text" class="form-control" v-model="user.email" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="user.password" />
        </div>
        <div class="form-group">
          <label>Password Confirmation:</label>
          <input type="password" class="form-control" v-model="user.password_confirmation" />
        </div>
        <div class="form-group">
          <label>Address:</label>
          <input type="text" class="form-control" v-model="user.address" />
        </div>
        <div class="form-group">
          <label>Accomodation:</label>
          <input type="text" class="form-control" v-model="user.accomodation_description" />
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <input type="text" class="form-control" v-model="user.bio" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User object", response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function () {
      axios
        .patch(`/users/${this.user.id}`, this.user)
        .then((response) => {
          console.log("Edit User Object", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
  },
};
</script>
