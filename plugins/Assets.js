import Vue from 'vue'
import Assets from "../classes/assets";
import Filters from "../classes/filters";

Vue.prototype.$assets = new Assets();
Vue.prototype.$filters = new Filters();
// Vue.prototype.$scrollTop = function () {
//   let element = document.getElementById("aowrapper");
//   let top = element.offsetTop;
//   window.scrollTo({
//     top: top - 100,
//     left: 0,
//     behavior: 'smooth'
//   })
// }
