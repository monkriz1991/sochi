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
    let elements = [];
    let res = [];
    data.map((el)=>{
      if (!this.checkAvailibility(el.naimenovanie, el.Period)){
        if (elements.indexOf(`${el.naimenovanie}_${el.cvet}`) + 1){
        }else{
          elements.push(`${el.naimenovanie}_${el.cvet}`)
          res.push(el)
        }
      }
    });
    res.sort(this.compare);
    return res
  };

  checkAvailibility = (name, period) => {
    if (period < 3){
      return ['MINI John Cooper Works Cabrio','Toyota Land Cruiser 200', 'Mercedes-Benz V250d', 'Mercedes-Benz S500 ', 'Mercedes-Benz S500', 'MINI Cooper','MINI Cooper 5d','Hyundai H-1 new', 'MINI Cooper S Cabrio', 'Hyundai H-1', 'Toyota Land Cruiser Prado', 'BMW X3 xDrive 20i', 'BMW X1 sDrive 18i', 'BMW X2 sDrive 20i', 'Mercedes-Benz E200 ', 'Mercedes-Benz E200'].includes(name)
    }else if(period < 5){
      return ['MINI John Cooper Works Cabrio','Toyota Land Cruiser 200', 'Mercedes-Benz V250d', 'Mercedes-Benz S500 ', 'Mercedes-Benz S500'].includes(name)
    }else if(period < 7){
      return ['Toyota Land Cruiser 200', 'Mercedes-Benz V250d', 'Mercedes-Benz S500 ', 'Mercedes-Benz S500'].includes(name)
    }else{
      return false
    }
  }

  offersFilter_old = data => {
    let elements = [];
    let prices = [];
    let colors = [];
    let res = [];
    let features = [];
    data.map((el)=>{
      if (el.features_options.length > 0){
        let feat = [];
        for (const f of el.features_options){
          feat.push(f.name)
        }
        let stroke = `${el.naimenovanie} | ${feat.join(',')} | ${el.PriceDiscount} | ${el.cvet}`;
        if (!(features.indexOf(stroke)+1)){
          features.push(stroke);
          res.push(el)
        }
      }else{
        if (elements.indexOf(el.naimenovanie)+1){
          if(prices[el.naimenovanie].indexOf(el.PriceDiscount) + 1){
            if(colors[el.naimenovanie].indexOf(el.cvet) + 1){
            }else{
              if(Array.isArray(colors[el.naimenovanie])){
                colors[el.naimenovanie].push(el.cvet)
              }else{
                colors[el.naimenovanie] = [el.cvet]
              }
              res.push(el)
            }
          }else{
            prices[el.naimenovanie] = [el.PriceDiscount];
            colors[el.naimenovanie] = [el.cvet];
            res.push(el)
          }
        }else{
          elements.push(el.naimenovanie);
          if(Array.isArray(prices[el.naimenovanie])){
            prices[el.naimenovanie].push(el.PriceDiscount)
          }else{
            prices[el.naimenovanie] = [el.PriceDiscount]
          }
          if(Array.isArray(colors[el.naimenovanie])){
            colors[el.naimenovanie].push(el.cvet)
          }else{
            colors[el.naimenovanie] = [el.cvet]
          }
          res.push(el)
        }
      }
    });

    res.sort(this.compare);
    return res
  };

  compare = (a, b) => {
    if (a.PriceDiscount < b.PriceDiscount) {
      return -1;
    }
    if (a.PriceDiscount > b.PriceDiscount) {
      return 1;
    }
    // a должно быть равным b
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

  getPriceForEl = el => {
    return this.getActualPrice(el['discount1'], el['discount2'], el['Price'], el['Period'])
  };

  getActualPrice = ($d1, $d2, $p, $period) => {
    if($period < 3){
      return Math.floor($p)
    }else if($period >=3 && $period <= 7){
      return Math.floor($d1)
    }else if($period >= 7){
      return Math.floor($d2)
    }
  };
}

export default Filters
