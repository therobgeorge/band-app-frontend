<template>
  <div class="signup">
    <!-- PAGE TOP -->
    <section class="page-title">
      <div class="container">
        <header>
          <h2>
            <!-- Page Title -->
            <strong>Sign</strong>
            Up
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
          <!-- REGISTER -->
          <div class="col-md-6 col-sm-6">
            <!-- registration form -->
            <form v-on:submit.prevent="submit()" action="#" method="post" class="sky-form boxed">
              <fieldset>
                <section>
                  <label>Name</label>
                  <label class="input">
                    <i class="icon-append fa fa-user"></i>
                    <input required type="text" v-model="newUserParams.name" placeholder="Full Name or Band Name" />
                    <b class="tooltip tooltip-bottom-right">Please enter a name.</b>
                  </label>
                </section>

                <section>
                  <label>Profile Picture</label>
                  <label class="input">
                    <i class="icon-append fa fa-photo"></i>
                    <input type="file" v-on:change="setFile($event)" ref="fileInput" />
                  </label>
                </section>

                <section>
                  <label>Email</label>
                  <label class="input">
                    <i class="icon-append fa fa-envelope"></i>
                    <input required type="email" v-model="newUserParams.email" placeholder="Email Address" />
                    <b class="tooltip tooltip-bottom-right">Please enter an email address.</b>
                  </label>
                </section>

                <section>
                  <label>Password</label>
                  <label class="input">
                    <i class="icon-append fa fa-lock"></i>
                    <input required type="password" v-model="newUserParams.password" placeholder="Password" />
                    <b class="tooltip tooltip-bottom-right">Please enter a password.</b>
                  </label>
                </section>

                <section>
                  <label>Password Confirmation</label>
                  <label class="input">
                    <i class="icon-append fa fa-lock"></i>
                    <input
                      required
                      type="password"
                      v-model="newUserParams.password_confirmation"
                      placeholder="Confirm Password"
                    />
                    <b class="tooltip tooltip-bottom-right">Please enter a password.</b>
                  </label>
                </section>

                <section>
                  Bio
                  <label class="textarea">
                    <i class="icon-append fa fa-book"></i>
                    <textarea
                      class="form-control"
                      required
                      v-model="newUserParams.bio"
                      rows="10"
                      placeholder="Bio: Tell us about you!"
                    ></textarea>
                    <b class="tooltip tooltip-bottom-right">Please enter a bio.</b>
                  </label>
                </section>

                <section>
                  <label class="checkbox">
                    <input type="checkbox" name="checkbox" value="true" v-model="newUserParams.band" Checked />
                    <i></i>
                    Are you a band?
                  </label>
                </section>
              </fieldset>

              <fieldset v-if="newUserParams.band == false">
                <section>
                  <label>Address</label>
                  <label class="textarea">
                    <i class="icon-append fa fa-map-pin"></i>
                    <textarea
                      class="form-control"
                      v-model="newUserParams.address"
                      rows="10"
                      placeholder="Enter full address: 1234 Street Address, City, State, Post Code"
                    ></textarea>
                    <b class="tooltip tooltip-bottom-right">Please enter an address.</b>
                  </label>
                </section>

                <section>
                  <label>Housing Description</label>
                  <label class="textarea">
                    <i class="icon-append fa fa-home"></i>
                    <textarea
                      class="form-control"
                      v-model="newUserParams.accommodation_description"
                      rows="10"
                      placeholder="Housing Description: (i.e., I have one spare room with a bed, and a living room with a couch."
                    ></textarea>
                    <b class="tooltip tooltip-bottom-right">Please enter a housing description.</b>
                  </label>
                </section>
              </fieldset>
              <footer>
                <button type="submit" class="button" value="Submit" style="margin: 10px 16px">
                  <i class="fa fa-pencil-square-o"></i>
                  Sign Up
                </button>
              </footer>
            </form>
            <!-- /registration form -->
          </div>
          <!-- /REGISTER -->
        </div>
      </div>
    </section>
    <!-- /CONTENT -->

    <!-- <form v-on:submit.prevent="submit()">
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
    </form> -->
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
      formData.append("accommodation_description", this.newUserParams.accommodation_description);
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
