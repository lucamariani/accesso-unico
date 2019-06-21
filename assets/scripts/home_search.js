/** Create lunr index **/
var idx = lunr(function () {
  this.ref('metaname');
  //this.field('metaname');
  this.field('title', { boost: 10 });
  this.field('tema');
  this.field('subtitle');
  this.field('url');
  this.field('type');
  this.field('subject');
  this.field('category');
  this.field('year');
  this.field('ente');
  this.field('number');
  this.field('tags');

  for (var key in window.searchschede) { // Add the data to lunr
    this.add({
      'metaname': key,
      'title': window.searchschede[key].title,
      'tema': window.searchschede[key].tema,
      'subtitle': window.searchschede[key].subtitle,
      'url': window.searchschede[key].url
    });
  }

  for (var doc_key in window.docs) { // Add the data to lunr
    this.add({
      'metaname': doc_key,
      'title': window.docs[doc_key].title,
      'tema': window.docs[doc_key].tema,
      'subject': window.docs[doc_key].subject,
      'category': window.docs[doc_key].category,
      'year': window.docs[doc_key].year,
      'ente': window.docs[doc_key].ente,
      'number': window.docs[doc_key].number,
      'url': window.docs[doc_key].url,
      'tags': window.docs[doc_key].tags
    });
  }

  for (var key in window.news) { // Add the data to lunr
    this.add({
      'metaname': key,
      'title': window.news[key].title,
      'sutitle': window.news[key].subtitle,
      'category': window.news[key].category,
      'year': window.news[key].year,
      'tags': window.news[key].tags
    });
  }

});

var search_for = '';

var formSubmit = function() {
  search_for = $('#home-cerca').val();
  var results = idx.search('*' + search_for + '*');
  //console.log(results);
  displayResults(results);
}

/*var addResultItems = function(label, itemArray, _baseurl) {
  var appendString = '';
  if ( itemArray.length > 0 ) {
    appendString += '<h3 class="u-cf u-textLeft u-color-50 u-borderHideFocus u-margin-top-xs u-margin-bottom-xs" id="modal-title" tabindex="0">' + label + '</h3>';
    appendString += '<ul id="' + label + '-result-list">';

    $.each(itemArray, function(key,item) {
      appendString += '<li class="u-textLeft u-text-xs"><a href="' + _baseurl + item.url + '">' + item.title + '</a></li>';
    });

    appendString += '</ul><div class="u-background-grey-30 u-margin-top-xs u-padding-top-xxs"></div>';
  }
  $('#dialog-results-content').append(appendString);
}
*/
var addResultItems = function(label, itemArray, _baseurl) {
  let appendString = '';
  const appendTo = '#' + label + '-result-list';
  console.log('home_search.js: adding result list to #', appendTo)
  if ( itemArray.length > 0 ) {
    $.each(itemArray, function(key,item) {
      appendString += '<li class="u-textLeft u-text-xs"><a href="' + _baseurl + item.url + '">' + item.title + '</a></li>';
    });
  }

  $(appendTo).append(appendString);
}

var showResults = function() {
  $('#results-div').show();
  $('#no-results-div').hide();
}

var showNoResults = function() {
  $('#results-div').hide();
  $('#no-results-div').show();
}

var displayResults = function(results) {
  // reset
  $('.search-listing').html('');

  var schedeResults = [], docsResults = [], newsResults = [];

  if (results.length > 0) { // Are there any results?
    showResults();

    for (var i = 0; i < results.length; i++) {  // Iterate over the results

      console.log('homesearch.js results: ', results)

      var key = results[i].ref;

      console.log('homesearch.js key: ', key)

      if ( key in searchschede) {
        schedeResults.push(searchschede[key]);
      } else if ( key in docs ) {
        schedeResults.push(docs[key]);
      } else if ( key in news ) {
        schedeResults.push(news[key]);
      }

      //appendString += '<li style="text-align:left"><a href="' + baseurl + item.url + '">' + item.title + ' (' + item.type + ') </a></li>';
    }

    addResultItems('schede', schedeResults, baseurl);
    addResultItems('docs', docsResults, '');
    addResultItems('news', newsResults, '');

  } else {
    // no results
    showNoResults();
  }
}

$(function() {
  /* submit handling */
  $('#home-search-form').on('submit', function(event) {
    event.preventDefault();
    formSubmit();
  });
});
