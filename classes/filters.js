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

  blockList_1_2 = () => {
    return [
      "о510ха125", "е320кх125", "т779ха125", "в756от198", "т165ха125", "е027те125", "е995тк125", "в912от198",
      "в768от198", "в811от198", "е032те125", "х137хо125", "в458тр198", "т169ха125", "е023те125", "а286тв125",
      "у916ох125", "а947те125", "у861ох125", "о391ха125", "х128хо125", "с210ох125", "х586хс125", "о519ха125",
      "о517ха125", "х069хо125", "о445ха125", "о284ха125", "х066хо125", "х621хс125", "х079хо125", "х125хо125",
      "о124ма198", "к595тв125", "х625хс125", "м388ан797", "у073кт193", "с813кт193", "р254ха125", "х076хо125",
      "м971хк123", "х104хо125", "к444хо123", "к517хо123", "к398тх82", "в252мк82", "х087хо125", "н007хк123",
      "е168хе123", "у877ха125", "х623хс125", "х086хо125", "т844хт123", "т155хт123", "х641хс125",
      "у792ва799", "в285те125", "х109хо125", "х147хо125", "е021те125", "е026те125", "е310кх125", "е355тв125",
      "е892тк125", "у651ха125", "у621ха125", "т784ха125", "у646ха125", "в255те125", "у024хт123", "в354тв125",
      "к204тв125", "у014хт123", "р214ха125", "у641ха125", "т834ха125", "р253ха125", "р271ха125", "к417су123",
      "е148хе123", "с451ха125", "х665хс125", "х049ха125", "с477ха125", "х088хо125", "х086хс125",
      "х086хк125", "х073хм125", "х088хм125", "х087хм125", "х094хк125", "х079хм125", "х068хс125", "х087хс125",
    ]
  }
}

export default Filters
