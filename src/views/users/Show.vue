<template>
  <div class="users-show">
    <!-- PAGE TOP -->
    <section class="page-title">
      <div class="container"></div>
    </section>
    <!-- /PAGE TOP -->

    <!-- CONTENT -->
    <section>
      <div class="container">
        <article class="row">
          <div class="col-md-6">
            <div
              class="owl-carousel controlls-over"
              data-plugin-options='{"items": 1, "singleItem": true, "navigation": true, "pagination": true, "transitionStyle":"fadeUp"}'
            >
              <div>
                <img class="img-responsive" :src="user.profile_picture" width="555" height="311" alt="" />
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <h3>{{ user.name }}</h3>
            <div v-if="$parent.getUserId() == user.id" class="row">
              <router-link :to="`/users/${user.id}/edit`">
                <button type="button" class="btn btn-primary btn-sm">Edit Profile</button>
              </router-link>
            </div>
            <hr />

            <p class="lead">
              {{ user.bio }}
            </p>
          </div>
        </article>

        <hr />
        <!-- separator -->
      </div>
      <!-- /.container -->

      <div class="col-md-9">
        <!-- CENTER -->

        <!-- STANDARD BUTTONS -->
        <div v-if="user.band == false" class="panel panel-light margin-bottom60">
          <div class="panel-heading">
            <h3 class="panel-title">My Space</h3>
          </div>

          <div class="panel-body">
            <p>{{ user.accommodation_description }}</p>

            <div
              class="owl-carousel controlls-over owl-theme owl-carousel-init"
              data-plugin-options='{"items": 1, "autoHeight": true, "navigation": true, "pagination": false, "transitionStyle":"fadeUp"}'
              style="opacity: 1; display: block"
            >
              <!-- transitionStyle: fade, backSlide, goDown, fadeUp,  -->
              <div class="owl-wrapper-outer autoHeight" style="height: 476px">
                <div
                  class="owl-wrapper"
                  style="
                    width: 3392px;
                    left: 0px;
                    display: block;
                    transition: all 0ms ease 0s;
                    transform: translate3d(-848px, 0px, 0px);
                    transform-origin: 1272px center;
                    perspective-origin: 1272px center;
                  "
                >
                  <div class="owl-item" style="width: 848px">
                    <div v-for="image in user.images" v-bind:key="image.id">
                      <div>
                        <img alt="" class="img-responsive" :src="image.url" />
                      </div>
                    </div>
                  </div>
                  <!-- <div class="owl-item" style="width: 848px">
                    <div>
                      <img alt="" class="img-responsive" src="assets/images/demo/about_2.jpg" />
                    </div>
                  </div> -->
                </div>
              </div>

              <div class="owl-controls clickable">
                <div class="owl-buttons">
                  <div class="owl-prev"><i class="fa fa-chevron-left"></i></div>
                  <div class="owl-next"><i class="fa fa-chevron-right"></i></div>
                </div>
              </div>
            </div>
            <router-link to="/images/new">
              <button type="button" class="btn btn-primary btn-sm" v-if="$parent.getUserId() == user.id">
                Add Housing Image
              </button>
            </router-link>
          </div>
        </div>
        <!-- /STANDARD BUTTONS -->
      </div>
      <div class="col-md-9">
        <!-- CENTER -->

        <!-- STANDARD BUTTONS -->
        <div v-if="user.band == true" class="panel panel-light margin-bottom60">
          <div class="panel-heading">
            <h3 class="panel-title">Upcoming Shows</h3>
          </div>

          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tour in orderBy(futureTours, 'date')" v-bind:key="tour.id">
                    <td>{{ formatDate(tour.date) }}</td>
                    <td>{{ tour.location }}</td>
                    <td>{{ tour.comment }}</td>
                    <td v-if="$parent.getUserId() == user.id">
                      <a
                        href="#"
                        class="btn default btn-xs bg-gray white"
                        data-toggle="modal"
                        data-target="#editTour"
                        v-on:click="setEditTour(tour)"
                      >
                        <i class="fa fa-edit white"></i>
                        Edit
                      </a>
                      <div
                        class="modal fade"
                        id="editTour"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="editTourLabel"
                        aria-hidden="true"
                        style="display: none"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <!-- modal header -->
                              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                              <h4 class="modal-title" id="editTourLabel">Edit Tour Date</h4>
                            </div>
                            <!-- /modal header -->

                            <!-- modal body -->
                            <div class="modal-body">
                              <form v-on:submit.prevent="updateTour()">
                                <h1>Edit Tour</h1>
                                <ul>
                                  <li class="text-danger" v-for="error in errors" v-bind:key="error">
                                    {{ error }}
                                  </li>
                                </ul>
                                <div class="form-group">
                                  <label>Date:</label>
                                  <input
                                    type="date"
                                    class="form-control"
                                    v-model="editTourParams.date"
                                    placeholder="Name"
                                  />
                                </div>
                                <div class="form-group">
                                  <label>Location:</label>
                                  <input type="text" class="form-control" v-model="editTourParams.location" />
                                </div>
                                <div class="form-group">
                                  <label>Comment:</label>
                                  <input type="text" class="form-control" v-model="editTourParams.comment" />
                                </div>
                                <input type="submit" class="btn btn-primary" value="Submit" />
                              </form>
                            </div>
                            <!-- /modal body -->
                          </div>
                        </div>
                      </div>

                      <a href="#" class="btn default btn-xs bg-red white" v-on:click="destroyTour(tour)">
                        <i class="fa fa-times white"></i>
                        Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <router-link to="/tours/new">
                <button v-if="$parent.getUserId() == user.id" class="btn btn-primary btn-sm">Add Tour Stop</button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- /STANDARD BUTTONS -->
      </div>
    </section>
    <!-- /CONTENT -->
    <!-- old junk delete when everything is working -->
    <!-- <h2>{{ user.name }}</h2>
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
    </span> -->
    <!-- testing functionality needs to be added to modal -->
    <!-- Edit tour current user will be on button -->
    <!-- <span>
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

          <label>Tour ID:</label>
          <input type="text" class="form-control" v-model="tour.id" />
        </div>

        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </span> -->
  </div>
</template>

<script>
/* global $ */
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
      editTourParams: {},
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
        .patch(`/tours/${this.editTourParams.id}`, this.editTourParams)
        .then((response) => {
          console.log("Edit Tour Object", response.data);
          $("#editTour").modal("hide");
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
    setEditTour: function (tour) {
      this.editTourParams = tour;
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
