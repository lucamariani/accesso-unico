/** Create lunr index **/
var idx = lunr(function () {
  //this.ref('url');
  this.field('id');
  this.field('title', { boost: 10 });
  this.field('tema');
  this.field('subject');
  this.field('category');
  this.field('year');
  this.field('ente');
  this.field('number');
  this.field('url');
  this.field('tags');

  for (var key in window.store) { // Add the data to lunr
    this.add({
      'id': key,
      'title': window.store[key].title,
      'tema': window.store[key].tema,
      'subject': window.store[key].subject,
      'category': window.store[key].category,
      'year': window.store[key].year,
      'ente': window.store[key].ente,
      'number': window.store[key].number,
      'url': window.store[key].url,
      'tags': window.store[key].tags
    });
  }
});

/** display results **/
function displaySearchResults(results, store) {
  console.log('size: ' + results.length);
  $('#results-size').text(results.length)
  var searchResults = $('#docs-results-list');

  if (results.length) { // Are there any results?
    var appendString = '';

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var key = results[i].ref;
      //console.log('key:' + key);
      var item = store[key];
      //console.log(item);

      appendString += '<div class="Grid-cell u-md-size1of3 u-lg-size1of3 u-margin-r-bottom u-layout-matchHeight">';
      appendString += '<div class="u-nbfc u-flexWrap u-flex u-color-grey-60 u-xs-padding-all-none u-borderShadow-m u-xs-borderShadow-none u-borderRadius-m u-background-white u-sizeFill">';
      appendString += '<div class="u-flexWrap u-flex u-flexAlignSelfStretch u-sizeFill u-padding-r-all"><div class="u-sizeFull u-padding-r-all u-xs-padding-all-none single-doc">';
      appendString += '<a href="' + item.url + '" target="_blank"><h3 class="u-color-50">' + item.title + '</h3></a>';
      appendString += '<p class="object"><b>' + item.subject + '</b></p>';

      if ( item.category.length > 0 )
        appendString += '<p class="pointer" title="Visualizza tutti i documenti della categoria ' + item.category +
          '" onclick="searchFor(\'+category:' + item.category + '\')">Categoria: ' + item.category + '</p>';

      if ( item.tema.length > 0 ) {
        var themeName = ( themes[item.tema] ? themes[item.tema].name : item.tema );
        appendString += '<p class="pointer" title="Visualizza tutti i documenti del tema ' + themeName +
          '" onclick="searchFor(\'+tema:' + item.tema + '\')">Argomento: ' + themeName + '</p></li>';
      }

      if ( item.number.length > 0 )
        appendString += '<p>Numero: ' + item.number + '</p>';

      appendString += '<p class="pointer" title="Visualizza tutti i documenti dell\'anno ' + item.year +
          '" onclick="searchFor(\'+year:' + item.year + '\')">Anno: ' + item.year + '</p>';

      if ( item.ente.length > 0 )
        appendString += '<p>Ente: ' + item.ente + '</p>';

      if ( item.tags.length > 0 ) {
        var docTags = '<p>Tags: ';
        //appendString += '<p>Tags: ' + item.tags + '</p>';
        $.each(item.tags, function(key,value) {
          docTags += '<span class="pointer" title="Visualizza tutti i documenti con tag ' + value +
            '" onclick="searchFor(\'+tags:' + value + '\')">' + value + '</span>, ';
        });
        docTags = docTags.replace(/,\s*$/, "");
        docTags += '</p>';
        appendString += docTags;
      }

      appendString += '</div></div></div></div>';
    }

    searchResults.html(appendString);
  } else {
    searchResults.html('<p>La ricerca non ha prodotto alcun risultato</p>');
  }
  // show results' section
  $('#result-section').show();
}

/*var titleSuggestionHandling = function() {
  console.log("titleSuggestionHandling");
  var $titles = $('#titolo-listing > ul > li').clone()

  $('#titolo').on('keydown', function(event) {
    if (event.which === 9 && $(this).is(':focus')) {
      $(this).blur()
      return true
    }
  })

  $('#titolo').on('keyup', function(event) {
    var text = event.target.value.toLowerCase()

    $('#titolo-listing > ul').html($titles.filter(function(index, elem) {
      var title = $(elem).find('span').html().toLowerCase()
      console.log("title: " + title)

      if (title.indexOf(text) >= 0) {
        return elem
      }
    }))
    $('#titolo-listing > ul > li:first').trigger('mouseenter')
  })
}

var numberSuggestionHandling = function() {
  var $numbers = $('#numero-listing > ul > li').clone()

  $('#numero').on('keydown', function(event) {
    if (event.which === 9 && $(this).is(':focus')) {
      $(this).blur()
      return true
    }
  })

  $('#numero').on('keyup', function(event) {
    var text = event.target.value.toLowerCase()
    $('#numero-listing > ul').html($numbers.filter(function(index, elem) {
      var number = $(elem).find('span').html().toLowerCase()

      if (number.indexOf(text) >= 0) {
        return elem
      }
    }))
    $('#numero-listing > ul > li:first').trigger('mouseenter')
  })
}*/

$(function() {
  //
  //titleSuggestionHandling();
  //numberSuggestionHandling();
  applyUrlFilters();

  /* submit handling */
  $('#docs-search-btn').click(function(event) {
    event.preventDefault();
    var title = $('#titolo').val();
    var number = $('#numero').val();
    var year = $('#year option:selected').val();
    var theme = $('#tema option:selected').val();
    var category = $('#categoria option:selected').val();
    console.log('searching for titolo: ' + title + ', number: ' + number + ',year: ' + year);

    var search_title = '*' + title + '*';
    var search_number = number + '*';
    var search_year = year;
    var search_pattern = '+title:' + search_title + ' +number:' + search_number;
    if ( search_year.indexOf('---') < 0 )
      search_pattern += ' +year:' + search_year;
    if ( theme.indexOf('---') < 0 )
      search_pattern += ' +tema:' + theme;
    if ( category.indexOf('---') < 0 )
      search_pattern += ' +category:' + category;

    console.log('searching for ' + search_pattern);
    var results = idx.search(search_pattern);
    console.log(results);
    displaySearchResults(results, window.store);
  });

})

var applyUrlFilters = function() {
  console.log('applyUrlFilters...');
  // search for theme
  var themeFilters = getAllUrlParams().theme;
  if( themeFilters ) {
    var search_pattern = '+tema:' + themeFilters;
    searchFor( search_pattern );
  }
  // search for tags
  var tagFilters = getAllUrlParams().tags;
  if( tagFilters ) {
    var search_pattern = '+tags:' + tagFilters;
    searchFor( search_pattern );
  }
}

var searchFor = function(search_pattern) {
  console.log('searching for ' + search_pattern);
  var results = idx.search(search_pattern);
  console.log(results);
  displaySearchResults(results, window.store);
}
