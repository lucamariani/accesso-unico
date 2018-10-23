/** Create lunr index **/
var idx = lunr(function () {
  this.ref('metaname');
  this.field('title', { boost: 10 });
  this.field('tema');
  this.field('tipo');
  this.field('subtitle');
  this.field('utenza');

  for (var key in window.allschede) { // Add the data to lunr
    this.add({
      'metaname': key,
      'title': window.allschede[key].title,
      'tema': window.allschede[key].tema,
      'tipo': window.allschede[key].tipo,
      'subtitle': window.allschede[key].subtitle,
      'utenza': window.allschede[key].url
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

function displaySearchResults(results) {
  console.log('size: ' + results.length);
  $('#results-size').text(results.length)
  var searchResults = $('#schede-results-list');
  var store = window.allschede;

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
      appendString += '<a href="' + baseurl + item.url + '" target="_blank"><h3 class="u-color-50">' + item.title + '</h3></a>';
      appendString += '<p class="object"><b>' + item.subtitle + '</b></p>';

      if ( item.tema.length > 0 ) {
        var themeName = ( themes[item.tema] ? themes[item.tema].name : item.tema );
        appendString += '<p class="pointer" title="Visualizza tutti i documenti del tema ' + themeName +
          '" onclick="searchFor(\'+tema:' + item.tema + '\')">Argomento: ' + themeName + '</p></li>';
      }

      appendString += '<p class="pointer" title="Visualizza tutti i documenti del profilo ' + item.utenza +
          '" onclick="searchFor(\'+utenza:*' + item.utenza + '*\')">Utenza: ' + item.utenza + '</p>';

      if ( item.tipo.length > 0 ) {
        var tipoName = ( types[item.tipo] ? types[item.tipo].name : item.tipo );
        appendString += '<p class="pointer" title="Visualizza tutti i documenti del tema ' + tipoName +
          '" onclick="searchFor(\'+tema:' + item.tema + '\')">Argomento: ' + tipoName + '</p></li>';
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

$(function() {
  //applyUrlFilters();

  /* reset handling */
  $('#schede-reset-btn').click(function(event) {
    event.preventDefault();
    // empty freesearch
    $('#freesearch').val('');
    // reset theme
    $('#tema').prop('selectedIndex',0)
    // reset type
    $('#tipologia').prop('selectedIndex',0)
  })

  /* submit handling */
  $('#schede-search-btn').click(function(event) {
    event.preventDefault();
    var freesearch = $('#freesearch').val();
    var utenza = $('#utenza option:selected').val();
    var theme = $('#tema option:selected').val();
    var tipo = $('#tipologia option:selected').val();
    console.log('searching for freesearch: ' + freesearch + ',utenza: ' + utenza + ',tipologia: ' + tipo);

    var search_freesearch = '*' + freesearch + '*';
    var search_utenza = '*' + utenza + '*';
    var search_pattern = search_freesearch;
    search_pattern += ' +utenza:' + search_utenza;
    if ( theme.indexOf('---') < 0 )
      search_pattern += ' +tema:' + theme;
    if ( tipo.indexOf('---') < 0 )
      search_pattern += ' +tipo:' + tipo;

    console.log('searching for ' + search_pattern);
    var results = idx.search(search_pattern);
    console.log(results);
    displaySearchResults(results);
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
  displaySearchResults(results);
}
