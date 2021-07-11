<template>
  <div class="tours-new">
    <!-- PAGE TOP -->
    <section class="page-title">
      <div class="container">
        <header>
          <h2>
            <!-- Page Title -->
            <strong>Add</strong>
            A Show
          </h2>
          <!-- /Page Title -->
        </header>
      </div>
    </section>
    <!-- /PAGE TOP -->

    <!-- CONTENT -->
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <!-- personal settings -->
            <form v-on:submit.prevent="createTour()" action="#" method="post" class="sky-form boxed">
              <header>My Information</header>

              <fieldset>
                <div class="row">
                  <section class="col col-md-6">
                    <label class="label">Date</label>
                    <label class="input">
                      <i class="icon-append fa fa-user"></i>
                      <input required type="date" class="form-control" v-model="newTourParams.date" />
                    </label>
                  </section>
                </div>
                <div class="row">
                  <section class="col col-md-6">
                    <label class="label">Location</label>
                    <label class="input">
                      <i class="icon-append fa fa-map-pin"></i>
                      <input type="text" placeholder="City, State" v-model="newTourParams.location" />
                      <b class="tooltip tooltip-bottom-right">Enter a location.</b>
                    </label>
                  </section>
                </div>

                <div class="row">
                  <section class="col col-md-6">
                    <label class="label">Comment</label>
                    <label class="input">
                      <i class="icon-append fa fa-commenting"></i>
                      <input
                        type="input"
                        v-model="newTourParams.comment"
                        placeholder="Anything your host should know?"
                      />
                      <b class="tooltip tooltip-bottom-right">Update Password</b>
                    </label>
                  </section>
                </div>
              </fieldset>

              <footer>
                <div>
                  <button type="submit" class="button">
                    <i class="fa fa-check"></i>
                    Save Changes
                  </button>
                </div>
              </footer>
            </form>
            <!-- /personal settings -->
          </div>
        </div>
      </div>
    </section>
    <!-- /CONTENT -->

    <!-- <form v-on:submit.prevent="createTour()">
      <h1>New Tour Date</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Date:</label>
        <input type="date" class="form-control" v-model="newTourParams.date" />
      </div>
      <div class="form-group">
        <label>Location:</label>
        <input type="text" class="form-control" v-model="newTourParams.location" placeholder="City, State" />
      </div>
      <div class="form-group">
        <label>Comment:</label>
        <textarea
          cols="30"
          rows="10"
          v-model="newTourParams.comment"
          placeholder="Anything your host should know?"
        ></textarea>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form> -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newTourParams: {},
      errors: [],
      currentUserId: "",
    };
  },
  created: function () {
    if (localStorage.user_id) {
      this.currentUserId = localStorage.user_id;
    }
  },
  methods: {
    createTour: function () {
      axios
        .post("/tours", this.newTourParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/users/${this.currentUserId}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
