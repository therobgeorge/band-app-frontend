import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import ToursIndex from "../views/tours/Index.vue";
import UsersShow from "../views/users/Show.vue";
import UsersEdit from "../views/users/Edit.vue";
import Logout from "../views/Logout.vue";
import ToursNew from "../views/tours/New.vue";
import ConversationsIndex from "../views/conversations/Index.vue";
import ConversationsShow from "../views/conversations/Show.vue";
import ImagesNew from "../views/images/New.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/tours",
    name: "tours-index",
    component: ToursIndex,
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow,
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: UsersEdit,
  },
  {
    path: "/tours/new",
    name: "tours-new",
    component: ToursNew,
  },
  {
    path: "/conversations",
    name: "conversations-index",
    component: ConversationsIndex,
  },
  {
    path: "/conversations/:id",
    name: "conversations-show",
    component: ConversationsShow,
  },
  {
    path: "/images/new",
    name: "images-new",
    component: ImagesNew,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
