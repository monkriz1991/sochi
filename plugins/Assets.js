import Vue from 'vue'
import Assets from "../classes/assets";
import Filters from "../classes/filters";
import moment from 'moment-timezone';

Vue.prototype.$assets = new Assets(moment);
Vue.prototype.$filters = new Filters();
Vue.prototype.$scrollTop = function () {
  window.scrollTo({
    top: 600,
    left: 0,
    behavior: 'smooth'
  })
}
