class Filters{
  constructor() {
  }

  offersFilter = data => {
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

  prepareLT = (data, price_filter, class_filter) => {
    let filtered = [];
    if (class_filter === 'cargo'){
      filtered = data.filter(el => {
        return el.cd.naimenovanie === 'Citroen Jumpy L2'
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
