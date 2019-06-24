/** Create lunr index **/
var idx = lunr(function () {
  //this.ref('url');
  this.field('id');
  this.field('title', { boost: 10 });
  this.field('subtitle');
  this.field('category');
  this.field('year');
  this.field('tags');

  for (var key in window.news) { // Add the data to lunr
    this.add({
      'id': key,
      'title': window.news[key].title,
      'sutitle': window.news[key].subtitle,
      'category': window.news[key].category,
      'year': window.news[key].year,
      'tags': window.news[key].tags
    });
  }
});

/** display results **/
function displaySearchResults(results, store) {
  console.log('size: ' + results.length);
  $('#results-size').text(results.length)
  let searchResultsObject = $("div[id*='news-results-list-col']");

  // first reset columns' results
  searchResultsObject.each(function(index) {
    $(this).html('');
  })

  if (results.length) { // Are there any results?
    var appendString = '';

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var key = results[i].ref;
      var item = store[key];

      appendString = '<div class="Grid-cell u-margin-r-bottom">';
      appendString += '<div class="u-nbfc u-flexWrap u-flex u-color-grey-60 u-xs-padding-all-none u-borderShadow-m u-xs-borderShadow-none u-borderRadius-m u-background-white u-sizeFill">';
      if(item.serpImage) appendString += '<img src="' + item.serpImage + '" class="u-sizeFull" alt="porro vel rem">';
      appendString += '<div class="docs-box u-flexWrap u-flex u-flexAlignSelfStretch u-sizeFill u-padding-r-all"><div class="u-sizeFull u-padding-r-all u-xs-padding-all-none single-doc">';      
      appendString += '<a target="_blank" href="' + item.url + '"><h3 class="u-color-50">' + item.title + '</h3></a>';
      appendString += '<p class="object"><b>' + item.date + '</b></p>';
 
      appendString += '<div class="doc-properties">';
      if ( item.category.length > 0 )
        appendString += '<p class="pointer" title="Visualizza tutti i documenti della categoria ' + item.category +
          '" onclick="searchFor(\'+category:' + item.category + '\')">Argomento: ' + item.category + '</p>';

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
      appendString += '<br><br></div>';
      appendString += '</div></div></div></div>';

      // divide in 3 columns
      let columnIndex = (i % 3);
      searchResultsObject.eq(columnIndex).append(appendString);
    }

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
  $('#news-search-btn').click(function(event) {
    event.preventDefault();
    const title = $('#titolo').val();
    const theme = $('#tema option:selected').val();
    const category = $('#categoria option:selected').val();
    const tags = $('#tags option:selected').val();
    console.log('searching for titolo: ' + title + ',tags: ' + tags);

    const search_title = title;
    // const search_title = title;
    let search_pattern = (title ? '+title:' + search_title : '');

    if ( category.indexOf('---') < 0 )
      search_pattern += ' +category:' + category;
    if ( tags.indexOf('---') < 0 )
      search_pattern += ' +tags:' + tags;

    console.log('searching for ' + search_pattern);
    var results = idx.search(search_pattern);
    console.log(results);
    displaySearchResults(results, window.news);
  });

})

var applyUrlFilters = function() {
  console.log('applyUrlFilters...');
  // search for theme
  var categoryFilters = getAllUrlParams().category;
  if( categoryFilters ) {
    var search_pattern = '+category:' + categoryFilters;
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
  displaySearchResults(results, window.news);
}
