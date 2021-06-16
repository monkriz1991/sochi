import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'autopilot_sochi_restyle',
      storage: window.localStorage
    }).plugin(store);
  });
}
