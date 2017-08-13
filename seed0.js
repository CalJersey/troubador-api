let db = require('./models');

let posts_list = [
  {
    title: 'This place rocks!',
    imgPath: '',
    text: 'omg my favorite place',
    cityId: 1,
  },
  {
    title: 'Tattooed offal heirloom lumbersexual',
    imgPath: '',
    text: 'Hexagon mumblecore tilde bushwick.',
    cityId: 1,
  },
  {
    title: 'Cold-pressed health goth',
    imgPath: '',
    text: 'Shoreditch PBR&B celiac, ethical jean shorts 90s neutra slow-carb.',
    cityId: 1,
  },
];

db.Post.remove({}, function(err, posts) {
  console.log('removed all posts');
  posts_list.forEach(function(postData) {
    var post = new db.Post({
      title: postData.title,
      text: postData.text,
      cityId: postData.cityId,
    });
    post.save(function(err, savedPost) {
      if (err) {
        return console.log(err);
      }
      console.log('saved ' + savedPost.title);
    });
  });
});
