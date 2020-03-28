import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed, { global: true, componentId: "youtube-media" });
Vue.prototype.$videoId = getIdFromURL;
Vue.prototype.$startTime = getTimeFromURL;
