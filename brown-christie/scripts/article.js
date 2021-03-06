'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The follwing function is the constructor Object - this function will create each object from the blog articles.js 

function Article (rawDataObj) {
  this.title=rawDataObj.title;
  this.category=rawDataObj.category;
  this.author=rawDataObj.author;
  this.authorUrl=rawDataObj.authorUrl;
  this.publishedOn=rawDataObj.publishedOn;
  this.body=rawDataObj.body;

  // TODO: Use the JS object that is passed in to complete this constructor function: done 
  // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  //The benefit to cloning article is that the set of matched elements as wel as all of their decendants ( children elements)

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  
  $newArticle.find('h1').text(this.title);
  $newArticle.find('a').text(this.author).attr(this.authorUrl);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('section').html(`<p>${this.body}</p>`) ;

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name, x
      2. author url, x
      3. article title, x
      4. article body, x
      5. publication date. x */

  // REVIEW: Display the date as a relative number of 'days ago'

  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};


rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});


// TODO: Refactor these for loops using the .forEach() array method.

for(let i = 0; i < rawData.length; i++) {
  articles.push(new Article(rawData[i]));
}

// $('articles').forEach( function(){
//   new Article).push(rawData);
// });


for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml());
}
