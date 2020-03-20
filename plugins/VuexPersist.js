import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'autopilot_Sochi',
      storage: window.localStorage
    }).plugin(store);
  });
}
