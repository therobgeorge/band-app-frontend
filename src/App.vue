<template>
  <div id="app">
    <div id="header">
      <!-- class="sticky" for sticky menu -->

      <!-- Top Bar -->
      <header id="topBar">
        <div class="container">
          <!-- Logo -->
          <router-link class="logo" to="/">
            <img src="/my-images/houseshow.png" height="50" alt="" />
          </router-link>
        </div>
        <!-- /.container -->
      </header>
      <!-- /Top Bar -->

      <!-- Top Nav -->
      <header id="topNav">
        <div class="container">
          <!-- Mobile Menu Button -->
          <button class="btn btn-mobile" data-toggle="collapse" data-target=".nav-main-collapse">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Top Nav -->
          <div class="navbar-collapse nav-main-collapse collapse">
            <nav class="nav-main">
              <!--
									NOTE
									
									For a regular link, remove "dropdown" class from LI tag and "dropdown-toggle" class from the href.
									Direct Link Example: 

									<li>
										<a href="#">HOME</a>
									</li>
								-->
              <ul id="topMain" class="nav nav-pills nav-main">
                <li v-if="!isLoggedIn()" class="dropdown">
                  <router-link to="/signup">
                    Sign Up
                    <span>_______</span>
                  </router-link>
                </li>
                <li v-if="!isLoggedIn()" class="dropdown">
                  <router-link to="/login">
                    Log In
                    <span>______</span>
                  </router-link>
                </li>
                <li v-if="isLoggedIn()" class="dropdown">
                  <router-link to="/tours">
                    Tours
                    <span>_____</span>
                  </router-link>
                </li>
                <li v-if="isLoggedIn()" class="dropdown">
                  <router-link to="/conversations">
                    Messages
                    <span>________</span>
                  </router-link>
                </li>
                <li v-if="isLoggedIn()" class="dropdown">
                  <router-link :to="`/users/${getUserId()}`">
                    My Profile
                    <span>__________</span>
                  </router-link>
                </li>
                <li v-if="isLoggedIn()" class="dropdown">
                  <router-link to="/logout">
                    Logout
                    <span>______</span>
                  </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <!-- /Top Nav -->
        </div>
        <!-- /.container -->
      </header>
      <!-- /Top Nav -->
    </div>

    <!-- old junk delete when everything is working -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <span v-if="!isLoggedIn()">
        <router-link to="/signup">Sign Up</router-link>
        |
        <router-link to="/login">Login</router-link>
        |
      </span>
      <span v-if="isLoggedIn()">
        <router-link to="/tours">Tours</router-link>
        |
        <router-link to="/conversations">Messages</router-link>
        |
        <router-link :to="`/users/${getUserId()}`">My Profile</router-link>
        |
        <router-link to="/logout">Logout</router-link>
      </span>
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
