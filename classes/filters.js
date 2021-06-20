import Assets from "./assets";
const $assets = new Assets();
class Filters{
  constructor() {
  }

  monotypeLong = data => {
    let names = [];
    let res = [];
    data.map(el => {
      if (names.indexOf(el.cd.naimenovanie)+1 === 0){
        names.push(el.cd.naimenovanie)
        res.push(el);
      }
    })
    return res;
  }

  offersFilter = data => {
    return data.sort(this.compare);
  };

  compare = (a, b) => {
    if (a.PriceDiscount < b.PriceDiscount) {
      return -1;
    }
    if (a.PriceDiscount > b.PriceDiscount) {
      return 1;
    }
    return 0;
  };

  compareLT_more = (a, b) => {
    if (a.cd.stoimost > b.cd.stoimost) {
      return -1;
    }
    if (a.cd.stoimost < b.cd.stoimost) {
      return 1;
    }
    return 0;
  };

  compareLT_less = (a, b) => {
    if (a.cd.stoimost < b.cd.stoimost) {
      return -1;
    }
    if (a.cd.stoimost > b.cd.stoimost) {
      return 1;
    }
    return 0;
  };

  compareRent_more = (a, b) => {
    if ($assets.makeItemPrice(a.car_data.stoimost, a.car_data.skidka_2, a.car_data.special_price) > $assets.makeItemPrice(b.car_data.stoimost, b.car_data.skidka_2, b.car_data.special_price)) {
      return -1;
    }
    if ($assets.makeItemPrice(a.car_data.stoimost, a.car_data.skidka_2, a.car_data.special_price) < $assets.makeItemPrice(b.car_data.stoimost, b.car_data.skidka_2, b.car_data.special_price)) {
      return 1;
    }
    return 0;
  };

  compareRent_less = (a, b) => {
    if ($assets.makeItemPrice(a.car_data.stoimost, a.car_data.skidka_2, a.car_data.special_price) < $assets.makeItemPrice(b.car_data.stoimost, b.car_data.skidka_2, b.car_data.special_price)) {
      return -1;
    }
    if ($assets.makeItemPrice(a.car_data.stoimost, a.car_data.skidka_2, a.car_data.special_price) > $assets.makeItemPrice(b.car_data.stoimost, b.car_data.skidka_2, b.car_data.special_price)) {
      return 1;
    }
    return 0;
  };

  compareRent_sort = (a, b) => {
    if (a.sort < b.sort) {
      return -1;
    }
    if (a.sort > b.sort) {
      return 1;
    }
    return 0;
  };

  prepareLT = (data, price_filter, class_filter) => {
    let filtered;
    if (class_filter === 'cargo'){
      filtered = data.filter(el => {
        return el.cd.naimenovanie === 'Citroen Jumpy L3'
      })
    }else{
      if (class_filter === 'all'){
        filtered = data
      }else{
        filtered = data.filter(el => {
          return el.cd.klassavtomobilya === class_filter
        })
      }
    }
    if (price_filter === 'price_asc'){
      return filtered.sort(this.compareLT_less)
    }else{
      return filtered.sort(this.compareLT_more)
    }
  }

  prepareRent = (data, price_filter, class_filter) => {
    let filtered;
    if (class_filter === 'cargo'){
      filtered = data.filter(el => {
        return el.car_data.naimenovanie === 'Citroen Jumpy L3'
      })
    }else{
      if (class_filter === 'all'){
        filtered = data
      }else{
        filtered = data.filter(el => {
          return el.car_data.klassavtomobilya === class_filter
        })
      }
    }
    if (price_filter === 'sort'){
      return filtered.sort(this.compareRent_sort)
    }else{
      if (price_filter === 'price_asc'){
        return filtered.sort(this.compareRent_less)
      }else{
        return filtered.sort(this.compareRent_more)
      }
    }
  }

  comparePrice = (a, b) => {
    if (a['1day'] < b['1day']) {
      return -1;
    }
    if (a['1day'] > b['1day']) {
      return 1;
    }
    // a должно быть равным b
    return 0;
  };
}

export default Filters
