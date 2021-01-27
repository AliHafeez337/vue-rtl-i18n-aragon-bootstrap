import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./app/landing-page/LandingHeader.vue";
import AppFooter from "./app/landing-page/LandingFooter.vue";
import Landing from "./app/landing-page/Landing.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
