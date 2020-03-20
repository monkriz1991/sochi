import Vue from 'vue'
import Assets from "../classes/assets";
import Filters from "../classes/filters";

Vue.prototype.$assets = new Assets();
Vue.prototype.$filters = new Filters();
