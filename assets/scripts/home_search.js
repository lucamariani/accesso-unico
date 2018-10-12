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

  for (var key in window.schede) { // Add the data to lunr
    this.add({
      'metaname': key,
      'title': window.schede[key].title,
      'tema': window.schede[key].tema,
      'subtitle': window.schede[key].subtitle,
      'url': window.schede[key].url
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

});

var search_for = '';

var formSubmit = function() {
  search_for = $('#home-cerca').val();
  var results = idx.search('*' + search_for + '*');
  //console.log(results);
  displayResults(results);
}

var addResultItems = function(label, itemArray, _baseurl) {
  var appendString = '';
  if ( itemArray.length > 0 ) {
    appendString += '<h3 class="u-cf u-textLeft u-color-50 u-borderHideFocus u-margin-top-xs u-margin-bottom-xs" id="modal-title" tabindex="0">' + label + '</h3>';
    appendString += '<ul id="' + label + '-result-list">';

    $.each(itemArray, function(key,item) {
      appendString += '<li class="u-textLeft u-text-xs"><a target="_blank" href="' + _baseurl + item.url + '">' + item.title + '</a></li>';
    });

    appendString += '</ul><div class="u-background-grey-30 u-margin-top-xs u-padding-top-xxs"></div>';
  }
  $('#dialog-results-content').append(appendString);
}

var displayResults = function(results) {
  // reset
  $('#dialog-results-content').html('');
  var noResultString = 'Spiacenti, non ci sono risultati per questa ricerca.';
  var schedeResults = [], docsResults = [];

  if (results.length > 0) { // Are there any results?

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var key = results[i].ref;

      var item = schede[key];

      if (typeof item == 'undefined' ) {
        item = docs[key];
        docsResults.push(item);
      } else {
        schedeResults.push(item);
      }

      //appendString += '<li style="text-align:left"><a target="_blank" href="' + baseurl + item.url + '">' + item.title + ' (' + item.type + ') </a></li>';
    }

    addResultItems('Schede', schedeResults, baseurl);
    addResultItems('Documenti', docsResults, '');

  } else {
    // no results
    $('#dialog-results-content').html(noResultString);
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
