<template>
  <div class="users-show">
    <h2>{{ user.name }}</h2>
    <img :src="user.profile_picture" alt="" />
    <p>{{ user.bio }}</p>

    <span v-if="user.band == false">
      Accomidation:
      <p>{{ user.accomidation_description }}</p>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      console.log("User object", response.data);
      this.user = response.data;
    });
  },
  methods: {},
};
</script>
