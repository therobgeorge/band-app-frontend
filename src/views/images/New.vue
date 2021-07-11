<template>
  <div class="images-new">
    <!-- PAGE TOP -->
    <section class="page-title">
      <div class="container">
        <header>
          <h2>
            <!-- Page Title -->
            <strong>Add</strong>
            Housing Image
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
            <form v-on:submit.prevent="createImage()" action="#" method="post" class="sky-form boxed">
              <fieldset>
                <div class="row">
                  <section class="col col-md-6">
                    <label class="input">
                      <i class="icon-append fa fa-photo"></i>
                      <input type="file" v-on:change="setFile($event)" ref="fileInput" class="form-control" />
                    </label>
                  </section>
                </div>
              </fieldset>

              <footer>
                <div>
                  <button type="submit" value="Submit" class="button">
                    <i class="fa fa-home"></i>
                    Add Image
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
    <!-- <form v-on:submit.prevent="createImage()">
      <h1>New Accomodation Image</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Image:</label>
        <input type="file" v-on:change="setFile($event)" ref="fileInput" class="form-control" />
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
      image: "",
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
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    createImage: function () {
      var formData = new FormData();
      formData.append("image", this.image);
      axios
        .post("/images", formData)
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
