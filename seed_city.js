let db = require('./models');

let cities_list = [
  {
    name: 'San Francisco',
    imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/c3/8e/ae/loews-regency-san-francisco.jpg',
    description: 'City by the Bay',
    cityId: 1
  },
  {
    name: 'London',
    imageUrl: 'https://media.timeout.com/images/103042848/image.jpg',
    description: '',
    cityId: 2
  },
  {
    name: 'Gibraltar',
    imageUrl: 'https://www.thesun.co.uk/wp-content/uploads/2017/04/08rock-4385.jpg?strip=all&w=960&quality=100',
    description: '',
    cityId: 3
  }
];

db.City.remove({}, function(err, cities) {
  console.log('removed all cities');
  cities_list.forEach(function(cityData) {
    var city = new db.City({
      name: cityData.name,
      imageUrl: cityData.imageUrl,
      description:cityData.description,
      cityId: cityData.cityId
    });
    city.save(function(err, savedCity) {
      if (err) {
        return console.log(err);
      }
      console.log(`saved city= ${savedCity.name}: ID= ${savedCity._id}`);
    });
  });
});
