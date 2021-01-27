/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n"
import RTLPlugin from "./plugins/RTLPlugin";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(RTLPlugin);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import Modal from "@/components/Modal.vue";
import BaseDropdown from "@/components/BaseDropdown";

Vue.component('Modal', Modal)
Vue.component('base-dropdown', BaseDropdown)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
