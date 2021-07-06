<template>
  <div class="users-show">
    <h2>{{ user.name }}</h2>
    <button v-if="$parent.getUserId() == user.id">Edit User</button>
    <img :src="user.profile_picture" alt="" />
    <p>{{ user.bio }}</p>

    <span v-if="user.band == false">
      Accommodation:
      <p>{{ user.accommodation_description }}</p>
      <div v-for="(image, index) in user.images" v-bind:key="image.id">
        <img :src="user.images[index].url" alt="" />
        <button v-if="$parent.getUserId() == user.id" v-on:click="destroyImage(user.images[index])">Delete</button>
      </div>
      <router-link to="/images/new"><button v-if="$parent.getUserId() == user.id">Add Image</button></router-link>
    </span>
    <span v-if="user.band == true">
      Tours:
      <div>
        <table>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Comment</th>
          </tr>
          <tr v-for="(tour, index) in orderBy(user.tours, 'date')" v-bind:key="tour.id">
            <td>{{ formatDate(user.tours[index].date) }}</td>
            <td>{{ user.tours[index].location }}</td>
            <td>{{ user.tours[index].comment }}</td>
            <td v-if="$parent.getUserId() == user.id"><button>Edit</button></td>
            <td v-if="$parent.getUserId() == user.id">
              <button v-on:click="destroyTour(user.tours[index])">Delete</button>
            </td>
          </tr>
        </table>
      </div>
      <router-link to="/tours/new"><button v-if="$parent.getUserId() == user.id">Add Tour Stop</button></router-link>
    </span>
    <!-- testing functionality needs to be added to modal -->
    <!-- edit user current user will be on buttons -->
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
          <input type="text" class="form-control" v-model="user.name" />
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
          <textarea v-model="user.address" cols="30" rows="10"></textarea>
        </div>
        <div class="form-group">
          <label>Accommodation:</label>
          <textarea v-model="user.accommodation_description" cols="30" rows="10"></textarea>
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <textarea v-model="user.bio" cols="30" rows="10"></textarea>
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
        <button v-on:click="destroyUser()">Delete Profile</button>
      </form>
    </span>
    <!-- Edit tour current user will be on button -->
    <span>
      <form v-on:submit.prevent="updateTour()">
        <h1>Edit Tour</h1>
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>Date:</label>
          <input type="date" class="form-control" v-model="tour.date" placeholder="Name" />
        </div>
        <div class="form-group">
          <label>Location:</label>
          <input type="text" class="form-control" v-model="tour.location" />
        </div>
        <div class="form-group">
          <label>Comment:</label>
          <input type="text" class="form-control" v-model="tour.comment" />
        </div>

        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </span>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      user: {},
      errors: [],
      tour: {},
      image: {},
      newImageParams: {},
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
    updateTour: function () {
      axios
        .patch(`/tours/${this.tour.id}`, this.tour)
        .then((response) => {
          console.log("Edit Tour Object", response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    destroyUser: function () {
      if (confirm("Confirm Delete Your Profile"))
        axios.delete(`/users/${this.user.id}`).then((response) => {
          console.log(response.data);
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("jwt");
          localStorage.removeItem("user_id");
          this.$router.push("/");
        });
    },
    destroyTour: function (tour) {
      if (confirm("Confirm Delete Tour Stop"))
        axios.delete(`/tours/${tour.id}`).then((response) => {
          console.log(response.data);
          for (var i = 0; i < this.user.tours.length; i++) {
            if (this.user.tours[i] === tour) {
              this.user.tours.splice(i, 1);
            }
          }
        });
    },
    destroyImage: function (image) {
      if (confirm("Confirm Delete Image"))
        axios.delete(`/images/${image.id}`).then((response) => {
          console.log(response.data);
          for (var i = 0; i < this.user.images.length; i++) {
            if (this.user.images[i] === image) {
              this.user.images.splice(i, 1);
            }
          }
        });
    },
    formatDate: function (date) {
      return moment(date).format("M/D/YY");
    },
  },
};
</script>
