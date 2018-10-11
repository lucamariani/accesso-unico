/** Create lunr index **/
var idx = lunr(function () {
  this.ref('metaname');
  this.field('metaname');
  this.field('title', { boost: 10 });
  this.field('tema');
  this.field('subtitle');
  this.field('url');

  for (var key in window.schede) { // Add the data to lunr
    this.add({
      'metaname': key,
      'title': window.schede[key].title,
      'tema': window.schede[key].tema,
      'subtitle': window.schede[key].subtitle,
      'url': window.schede[key].url
    });
  }
});

var search_for = '';

var formSubmit = function() {
  search_for = $('#home-cerca').val();
  console.log('searching for ' + search_for);
  var results = idx.search('*' + search_for + '*');
  console.log(results);
  displayResults(results);
}

var displayResults = function(results) {
  var list = $('#search-result-list');
  var appendString = 'Spiacenti, non ci sono risultati per questa ricerca.';

  if (results.length) { // Are there any results?
    var appendString = '';

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var key = results[i].ref;
      var item = schede[key];
      appendString += '<li style="text-align:left"><a target="_blank" href="' + baseurl + item.url + '">' + item.title + '</a></li>';
    }

    list.html(appendString);

  }
  // open dialog
  $('#open_btn').click();
}

$(function() {
  /* submit handling */
  $('#home-search-form').on('submit', function(event) {
    event.preventDefault();
    formSubmit();
  });
  $('#home-search-btn').click(function(event) {
    event.preventDefault();
    formSubmit();
  });
});


/** Home search functions
$(function() {
  var $projects = $('#home-projects > ul > li').clone()

  $('#home-search-form').on('submit', function() {
    var $sel = $('#home-projects > ul > li.is-selected')
    if ($sel.length > 0) {
      window.location = $sel.find('a').attr('href')
      console.log('window.location: ' + window.location);
      return false
    }
  })

  $('#home-cerca').on('keydown', function(event) {
    if (event.which === 9 && $(this).is(':focus')) {
      $(this).blur()
      return true
    }
  })

  $('#home-cerca').on('keyup', function(event) {
    var text = event.target.value.toLowerCase()
    $('#home-projects > ul').html($projects.filter(function(index, elem) {
      var project = $(elem).find('span').html().toLowerCase()

      if (project.indexOf(text) >= 0) {
        return elem
      }
    }))
    $('#home-projects > ul > li:first').trigger('mouseenter')
  })

})

**/
