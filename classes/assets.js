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
    return `${String(Y)}-${String(M + 1).length === 2 ? '' : '0'}${String((M + 1))}-${String(D).length === 2 ? '' : '0'}${String(D)}T12:00:00.000+03:00`;
  };

  genNowSpecFromDate = (date, time) => {
    let data = date.addDays(time);
    let Y = data.getFullYear();
    let D = data.getDate();
    let M = data.getMonth();
    return `${String(Y)}-${String(M + 1).length === 2 ? '' : '0'}${String((M + 1))}-${String(D).length === 2 ? '' : '0'}${String(D)}T12:00:00.000+03:00`;
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
      case 'ЭКО':
        return 'eco';
      default:
        return 'none';
    }
  }

  getDoors = (doors) => {
    if (parseInt(doors) <= 4){
      return doors + ' двери';
    } else if(parseInt(doors) > 4){
      return doors + ' дверей';
    }
  };

  getBagsData = (bags, bigbag) => {
    return `${bags} ${this.getNameCoint(parseInt(bags), 'сумка', 'сумки', 'сумок')}, ${bigbag} ${this.getNameCoint(parseInt(bigbag), 'чемодан', 'чемодана', 'чемоданов')}`
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

  getName(n){
    let word;
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

  generate_text_drivers = sd => {
    if(sd && sd !== ''){
      return sd
    }else{
      return "<p>Наши водители профессионалы высокого класса, которым доверяют обслуживание первых лиц государства. Они сделают Вашу поездку комфортной, приятной и абсолютно безопасной. С ними вы можете ознакомится в разделе водители</p>"
    }
  };

  generate_text_transfer = (sd, name) => {
    if(sd && sd !== ''){
      return sd
    }else{
      return "<p>" +
        "Минимальное время привлечения транспортного средства к оказанию транспортных услуг составляет 3 (три) часа. В нашем автопарке несколько подобных автомобилей." +
        "</p>"+
        "<p>"+
        `Если Вы планируете взять автомобиль ${name} в прокат без водителя, пожалуйста, пожалуйста, перейдите по `+
        "<a href='/rent/'>ссылке.</a>"+
        "</p>"
    }
  };

  generate_text_docs = sd => {
    if(sd && sd !== ''){
      return sd
    }else{
      return "" +
        "<p>" +
        "<strong>Для граждан РФ: </strong>" +
        "Паспорт РФ, действующая прописка, Водительское удостоверение</p>"+
        "<p>" +
        "<strong>Для иностранных граждан: </strong>" +
        "Заграничный паспорт, Водительское удостоверение международного образца</p>"
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
  }
}

export default Assets
