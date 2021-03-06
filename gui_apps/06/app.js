const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000},
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corrolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

const App = {
  filtersTemplate: Handlebars.compile($('#filters_template').html()),
  carsTemplate: Handlebars.compile($('#cars_template').html()),
  carTemplate: Handlebars.compile($('#car_template').html()),
  $filters: $('#filters'), 
  $cars: $('#cars'),
  
  makes: function() { return this.uniq(cars.map(car => car.make)); },
  models: function() { return this.uniq(cars.map(car => car.model)); },
  years: function() { return this.uniq(cars.map(car => car.year)); },
  prices: function() { return this.uniq(cars.map(car => car.price)); },

  uniq: function(arr) {
    let result = [];
    arr.forEach(el => {
      if (result.indexOf(el) < 0) {
        result.push(el);
      }
    });
    return result;
  },

  displayCars: function(cars) {
    this.$cars.html(this.carsTemplate({ cars: cars }));
  },

  getFilteredResults() {
    let criteria = {
      make: ($('#make_select').val().length === 0) ? this.makes() : [$('#make_select').val()],
      model: ($('#model_select').val().length === 0) ? this.models() : [$('#model_select').val()],
      year: ($('#year_select').val().length === 0) ? this.years() : [Number($('#year_select').val())],
      price: ($('#price_select').val().length === 0) ? this.prices() : [Number($('#price_select').val())],
    };

    return cars.filter(car => {
      for (let prop in criteria) {
        if (criteria[prop].indexOf(car[prop]) < 0) {
          return false;
        }
      }

      return true;
    });
  },

  filterResults: function() {
    this.displayCars(this.getFilteredResults());
  },

  filterModels: function(event) {
    let make = event.target.value;
    let models = cars.filter(car => car.make === make).map(car => car.model);
    
    if (make === '') {
      $('#model_select').find('option').show();
      return;
    }
    
    $('#model_select').find('option').show().filter(function() {
      return !models.includes(this.value);
    }).hide();
  },

  init: function() {
    Handlebars.registerPartial('car_template', $('#car_template').html());
    this.displayCars(cars);
    this.$filters.html(this.filtersTemplate({
      makes: this.makes(),
      models: this.models(),
      years: this.years(),
      prices: this.prices(),
    }));
    $('.filter_btn').on('click', this.filterResults.bind(this));
    $('#make_select').on('change', this.filterModels);
  }
};

App.init();
