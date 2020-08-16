Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

class Assets {
  constructor() {
  }

  genNowSpec = (time) => {
    let date = new Date().addDays(time);
    let Y = date.getFullYear();
    let D = date.getDate();
    let M = date.getMonth();
    return `${String(Y)}-${String(M + 1).length === 2 ? '' : '0'}${String((M + 1))}-${String(D).length === 2 ? '' : '0'}${String(D)}T09:00:00.000Z`;
  };

  genNowSpecFromDate = (date, time) => {
    let data = date.addDays(time);
    let Y = data.getFullYear();
    let D = data.getDate();
    let M = data.getMonth();
    return `${String(Y)}-${String(M + 1).length === 2 ? '' : '0'}${String((M + 1))}-${String(D).length === 2 ? '' : '0'}${String(D)}T09:00:00.000Z`;
  };


  genNowSpecFromDateSpec = (date, time) => {
    let data = new Date(date).addDays(time);
    let Y = data.getFullYear();
    let D = data.getDate();
    let M = data.getMonth();
    return `${String(Y)}-${String(M + 1).length === 2 ? '' : '0'}${String((M + 1))}-${String(D).length === 2 ? '' : '0'}${String(D)}T09:00:00.000Z`;
  };

  makeDateForRequest = (date) => {
    let data = new Date(date);
    let Y = data.getFullYear();
    let D = data.getDate();
    let M = data.getMonth();
    let hh = data.getHours();
    let mm = data.getMinutes();
    return `${Y}${String(M + 1).length === 2 ? '' : '0'}${String((M + 1))}${String(D).length === 2 ? '' : '0'}${String(D)}${String(hh).length === 2 ? '' : '0'}${String(hh)}${String(mm).length === 2 ? '' : '0'}${String(mm)}`;
  }

  prepareForm = (formData) =>{
    return {
      df: this.makeDateForRequest(formData.df),
      dt: this.makeDateForRequest(formData.dt),
      pc: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      p5: '',
      ac: formData.ac,
      city: formData.place.station,
    }
  }

  fetchFeatureClass = (name) => {
    switch (name) {
      case 'Без залога':
        return 'blues';
      case 'Бесплатная подача на поляну':
        return 'green';
      case 'Мойка включена':
        return 'red';
      case 'ХИТ':
        return 'orange';
      case 'HOT':
        return 'blood';
      case 'Рекомендуем':
        return 'rec';
      case 'Грузовой':
        return 'cargo';
      case 'ЭКО':
        return 'eco';
      default:
        return 'none';
    }
  }

  getDoors = (doors, locale) => {
    if(locale === 'ru'){
      return `${doors} ${this.getNameCoint(parseInt(doors), 'дверь', 'двери', 'дверей')}`;
    }else{
      return `${doors} ${this.getNameCoint(parseInt(doors), 'door', 'doors', 'doors')}`;
    }
  };

  getPassa = (passa, locale) => {
    if(locale === 'ru'){
      return `${passa} ${this.getNameCoint(parseInt(passa), 'пассажир', 'пассажира', 'пассажиров')}`;
    }else{
      return `${passa} ${this.getNameCoint(parseInt(passa), 'passenger', 'passengers', 'passengers')}`;
    }
  };

  getBagsData = (bags, bigbag, locale) => {
    if (locale === 'ru'){
      return `${bags} ${this.getNameCoint(parseInt(bags), 'сумка', 'сумки', 'сумок')}, ${bigbag} ${this.getNameCoint(parseInt(bigbag), 'чемодан', 'чемодана', 'чемоданов')}`
    }else{
      return `${bags} ${this.getNameCoint(parseInt(bags), 'bag', 'bags', 'bags')}, ${bigbag} ${this.getNameCoint(parseInt(bigbag), 'trunk', 'trunks', 'trunks')}`
    }
  };

  getNameCoint = (n, word1, word2, word3) => {
    let word;
    if ((n === 1) || (n > 20 && n % 10 === 1)) word = word1;
    else if ((n >= 2 && n <= 4) || (n > 20 && n % 10 >= 2 && n % 10 <= 4)) word = word2;
    else word = word3;
    return word;
  };

  diffDates = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    let Difference_In_Time = date2.getTime() - date1.getTime();

    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return {
      inDays: Difference_In_Days,
      inTime: Difference_In_Time
    }
  }

  validateSmallForm = data => {
    let errors = [];
    if(data.phone === '' || data.phone === undefined){
      errors.push('Телефон не может быть пустым');
    }
    if (data.email === ''){
      errors.push('Email не может быть пустым');
    }else{
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(String(data.email).toLowerCase())){
        errors.push('E-Mail введен не корректно');
      }
    }
    if (data.fio === ''){
      errors.push('Фамилия не может быть пустым');
    }
    return errors
  };

  validateOrderFormOnlineBooking = data => {
    let errors = [];
    if(data.phone === '' || data.phone === undefined){
      errors.push('Телефон не может быть пустым');
    }
    if (data.email === ''){
      errors.push('Email не может быть пустым');
    }else{
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(String(data.email).toLowerCase())){
        errors.push('E-Mail введен не корректно');
      }
    }
    if (data.surname === ''){
      errors.push('Фамилия не может быть пустым');
    }
    if (data.name === ''){
      errors.push('Имя не может быть пустым');
    }
    return errors
  };

  cleanPhone = phone => {
    return phone.replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace('-', '')
      .replace(' ', '')
      .replace(' ', '')
  };

  getName(val){
    let word;
    let n = parseInt(val)
    if ((n === 1) || (n > 20 && n % 10 === 1)) word = "день";
    else if ((n >= 2 && n <= 4) || (n > 20 && n % 10 >= 2 && n % 10 <= 4)) word = "дня";
    else word = "дней";
    return word;
  };

  formatDate = date => {
    var monthNames = [
      "Января", "Февраля", "Марта",
      "Апреля", "Мая", "Июня", "Июля",
      "Августа", "Сентября", "Октября",
      "Ноября", "Декабря"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var mins = date.getMinutes() > 0 ? ''+date.getMinutes() : '0'+date.getMinutes();
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + date.getHours()+':'+ mins;
  }

  generate_text_drivers = (sd, locale) => {
    if(sd && sd !== ''){
      return sd
    }else{
      if (locale === 'ru'){
        return "<p>Наши водители профессионалы высокого класса, которым доверяют обслуживание первых лиц государства. Они сделают Вашу поездку комфортной, приятной и абсолютно безопасной. С ними вы можете ознакомиться в разделе водители</p>"
      }else{
        return "<p>Our drivers are high-class professionals who are trusted to serve top officials of the state. They will make your trip comfortable, pleasant and absolutely safe. You can find them in the drivers section</p>"
      }
    }
  };

  generate_text_transfer = (sd, name, locale) => {
    if(sd && sd !== ''){
      return sd
    }else{
      if (locale === 'ru'){
        return "<p>" +
          "Минимальное время привлечения транспортного средства к оказанию транспортных услуг составляет 3 (три) часа. В нашем автопарке несколько подобных автомобилей." +
          "</p>"+
          "<p>"+
          `Если Вы планируете взять автомобиль ${name} в прокат без водителя, пожалуйста, перейдите по `+
          "<a href='/rent/'>ссылке.</a>"+
          "</p>"
      }else{
        return "<p>" +
          "The minimum time for attracting a vehicle to provide transport services is 3 (three) hours. We have several similar vehicles in our fleet." +
          "</p>"+
          "<p>"+
          `If you are planning to rent a ${name} car without a driver, please follow this `+
          "<a href='/rent/'>link.</a>"+
          "</p>"
      }
    }
  };

  generate_text_docs = (sd, locale) => {
    if(sd && sd !== ''){
      return sd
    }else {
      if (locale === 'ru') {
        return "" +
          "<p>" +
          "<strong>Для граждан РФ: </strong>" +
          "Паспорт РФ, действующая прописка, Водительское удостоверение</p>" +
          "<p>" +
          "<strong>Для иностранных граждан: </strong>" +
          "Заграничный паспорт, Водительское удостоверение международного образца</p>"
      } else {
        return "" +
          "<p>" +
          "<strong>FOR CITIZENS OF RUSSIAN FEDERATION: </strong>" +
          "Russian passport, valid residence permit, Driver's license</p>" +
          "<p>" +
          "<strong>FOR FOREIGN CITIZENS: </strong>" +
          "International passport, Driver's license of international standard</p>"
      }
    }
  };

  generate_text_conditions = sd => {
    if(sd && sd !== ''){
      return sd
    }
  };

  generate_text_tth = sd => {
    if(sd && sd !== ''){
      return sd
    }
  };

  toMoney = price => {
    return Math.round(parseFloat(price));
  }

  t_date = e => {
    let date = '';
    date = e.split(' ');
    return `${date[0]} ${this.gm(date[1])} ${date[2]}г.`;
  };

  gm = month => {
    switch (month.toLowerCase()) {
      case 'january':
        return 'января';
      case 'february':
        return 'февраля';
      case 'march':
        return 'марта';
      case 'april':
        return 'апреля';
      case 'may':
        return 'мая';
      case 'june':
        return 'июня';
      case 'july':
        return 'июля';
      case 'august':
        return 'августа';
      case 'september':
        return 'сентября';
      case 'october':
        return 'октября';
      case 'november':
        return 'ноября';
      case 'december':
        return 'декабря';
    }
  };

  validateOrderFormLT = data => {
    let errors = [];
    if(data.phone === '' || data.phone === undefined){
      errors.push('Телефон не может быть пустым');
    }
    if (data.email === ''){
      errors.push('Email не может быть пустым');
    }else{
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(String(data.email).toLowerCase())){
        errors.push('E-Mail введен не корректно');
      }
    }
    if (data.surname === ''){
      errors.push('Фамилия не может быть пустым');
    }
    if (data.name === ''){
      errors.push('Имя не может быть пустым');
    }
    return errors
  };

  salePersLimit = df =>{
    if (Date.parse(df) > Date.parse('2020-06-14')){
      return 10;
    }else{
      return 15;
    }
  }

  validationFeedback = data => {
    let errors = [];
    if(data.phone === '' || data.phone === undefined){
      errors.push('Телефон не может быть пустым');
    }
    if (data.email === ''){
      errors.push('Email не может быть пустым');
    }else{
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(String(data.email).toLowerCase())){
        errors.push('E-Mail введен не корректно');
      }
    }
    if (data.name === ''){
      errors.push('Имя не может быть пустым');
    }
    return errors
  }

  checkAbhazAvailable = (name, df) =>{
    if (name === "Выезд в Абхазию"){
      if (Date.parse(df) > Date.parse('2020-05-01')){
        return false
      }else{
        return true
      }
      // ['Возврат авто в Крыму', 'Выезд в Крым', 'Крымский Мост', 'Возврат авто в Сочи']
    }else if([].includes(name)){
      if (Date.parse(df) > Date.parse('2020-05-01')){
        return false
      }else{
        return true
      }
    }else{
      return false
    }
  };

  prefix = (name, locale) => {
    return `${name}___${locale}`
  }

  rus_to_latin = (str, locale) => {
    if (locale === 'ru'){
      return str
    }else{
      let ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
      }, n_str = [];

      str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

      for ( var i = 0; i < str.length; ++i ) {
        n_str.push(
          ru[ str[i] ]
          || ru[ str[i].toLowerCase() ] == undefined && str[i]
          || ru[ str[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() })
        );
      }

      return n_str.join('');
    }
  }

  makeItemPrice = (price, sale, special_price) => {
    if (special_price > 0){
      return special_price;
    }else{
      return price - ((price/ 100) * sale)
    }
  }

}

export default Assets
