import VueRouter from "vue-router";
import Vue from "vue";
import login from "../components/login.vue";
import test from "../components/test.vue";

// import
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: login },
    { path: "/test", component: test },
  ],
});

export default router;
