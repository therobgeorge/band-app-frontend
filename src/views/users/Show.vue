<template>
  <div class="users-show">
    <h2>{{ user.name }}</h2>
    <router-link :to="`/users/${user.id}/edit`">
      <button v-if="$parent.getUserId() == user.id">Edit User</button>
    </router-link>
    <img :src="user.profile_picture" alt="" />
    <p>{{ user.bio }}</p>

    <span v-if="user.band == false">
      Accommodation:
      <p>{{ user.accommodation_description }}</p>
      <div v-for="image in user.images" v-bind:key="image.id">
        <img :src="image.url" alt="" />
        <button v-if="$parent.getUserId() == user.id" v-on:click="destroyImage(image)">Delete</button>
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
          <tr v-for="tour in orderBy(futureTours, 'date')" v-bind:key="tour.id">
            <td>{{ formatDate(tour.date) }}</td>
            <td>{{ tour.location }}</td>
            <td>{{ tour.comment }}</td>
            <td v-if="$parent.getUserId() == user.id"><button>Edit</button></td>
            <td v-if="$parent.getUserId() == user.id">
              <button v-on:click="destroyTour(tour)">Delete</button>
            </td>
          </tr>
        </table>
      </div>
      <router-link to="/tours/new"><button v-if="$parent.getUserId() == user.id">Add Tour Stop</button></router-link>
    </span>
    <!-- testing functionality needs to be added to modal -->
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
        <div class="form-group">
          <!-- Edit button will pass this -->
          <label>Tour ID:</label>
          <input type="text" class="form-control" v-model="tour.id" />
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
    isFuture: function (date) {
      return moment().format("YYYY-MM-DD") <= date;
    },
  },
  computed: {
    futureTours: function () {
      return this.user.tours.filter((tour) => {
        return this.isFuture(tour.date);
      });
    },
  },
};
</script>
