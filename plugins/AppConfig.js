import Vue from 'vue';

Vue.prototype.$config = {
  station: process.env.STATION,
  default_place: process.env.DEFAULT_PLACE,
  scid: process.env.YANDEX_scid,
  ShopID: process.env.YANDEX_ShopID,
  map_lat: process.env.MAP_lat,
  map_lng: process.env.MAP_lng,
};
