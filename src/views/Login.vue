<template>
  <div class="login">
    <!-- PAGE TOP -->
    <section class="page-title">
      <div class="container">
        <header>
          <h2>
            <!-- Page Title -->
            <strong>Login</strong>
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
          <!-- LOGIN -->
          <div class="col-md-6 col-sm-6">
            <!-- login form -->
            <form v-on:submit.prevent="submit()" action="#" method="post" class="sky-form boxed">
              <fieldset>
                <section>
                  <label class="input">
                    <i class="icon-append fa fa-envelope"></i>
                    <input required type="email" placeholder="Email Address" v-model="email" />
                    <b class="tooltip tooltip-bottom-right">Please enter an email address.</b>
                  </label>
                </section>

                <section>
                  <label class="input">
                    <i class="icon-append fa fa-lock"></i>
                    <input required type="password" placeholder="Password" v-model="password" />
                    <b class="tooltip tooltip-bottom-right">Please enter a password.</b>
                  </label>
                </section>
              </fieldset>
              <footer>
                <button type="submit" class="button" value="Submit" style="margin: 10px 16px">Log in</button>
              </footer>
            </form>
            <!-- /login form -->
          </div>
          <!-- /LOGIN -->
        </div>
      </div>
    </section>
    <!-- /CONTENT -->
    <!-- old junk delete when everything is working -->
    <!-- <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <input type="submit" value="Submit" />
    </form> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push(`/users/${response.data.user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
