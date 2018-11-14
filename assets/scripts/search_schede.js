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

var getResultBox = function(item) {
  console.log(item)
  var appendString = '';

  //var profileIcon = '<img onclick="profileTagClick(\'' + item.utenza + '\')" title="' + item.utenza + '" class="servizio-icon" src="' + baseurl + iconsurl + item.utenza+'.png">';
  var profileName = ( profiles[item.utenza] ? profiles[item.utenza].name : item.utenza );
  var profileIcon = '<img title="' + profileName + '" class="servizio-icon" src="' + baseurl + iconsurl + 'grigio_' + item.utenza+'.png">';

  if ( item.tema.length > 0 ) {
    var themeName = ( themes[item.tema] ? themes[item.tema].name : item.tema );
    //var themeIcon = '<img onclick="themaTagClick(\'' + item.tema + '\')" title="' + themeName + '" class="servizio-icon" src="' + baseurl + iconsurl + item.tema+'.png">';
    var themeIcon = '<img title="' + themeName + '" class="servizio-icon" src="' + baseurl + iconsurl + 'rosso_' + item.tema+'.png">';
  }

  if ( item.tipo.length > 0 ) {
    var tipoName = ( types[item.tipo] ? types[item.tipo].name : item.tipo );
    var tipoIcon = '<img title="' + tipoName + '" class="servizio-icon" src="' + baseurl + iconsurl + item.tipo + '_rosso.png">';
  }

  appendString += '<div class="Grid-cell u-sizeFull u-md-size1of3 u-lg-size1of3 u-margin-r-bottom u-layout-matchHeight u-padding-r-all servizio-box">';
  appendString += '<div class="u-nbfc u-borderRadius-m u-color-grey-30 u-background-white servizio-btn-container">';
  appendString += '<section class="u-text-r-l u-padding-r-all u-layout-prose">';
  appendString += '<div class="u-text-p u-padding-r-bottom"><p class="u-color-50 u-text-r-s u-textWeight-600">' +
                    item.title + '</p><p class="u-textSecondary u-text-r-xxs">' + item.date + '</p></div>';
  appendString += '<h3 class="u-text-p u-textWeight-400 u-color-grey-80 u-margin-r-bottom">' + item.description + '</h3>';

  appendString += '<div class="servizio-icons">' + profileIcon + themeIcon + tipoIcon + '</div>';

  appendString += '<a href="' + baseurl + item.url + '" target="_blank">' +
                    '<button class="Button u-text-m u-background-50 u-color-white u-sizeFull go-servizio-btn">Vai al servizio</button></a>';

  appendString += '</section></div></div>';

  /*

  if ( item.tipo.length > 0 ) {
    var tipoName = ( types[item.tipo] ? types[item.tipo].name : item.tipo );
    appendString += '<p class="pointer" title="Visualizza tutti le schede del tema ' + tipoName +
      '" onclick="typeTagClick(\'' + item.tipo + '\')">Tipologia: ' + tipoName + '</p></li>';
  }*/


  return appendString;
}

function addIcon(name, title) {
  return '<img title="' + title + '" class="icon-search-results u-margin-right-s" src="' + baseurl + iconsurl + name +'.png">';
}

function displaySearchResults(results, utenza, theme, tipo) {
  console.log('u: ' + utenza + ' | th: ' + theme + ' | ti: ' + tipo )
  var result_text = ( results.length > 1 ? ' servizi trovati' : ' servizio trovato' )
  $('#results-size').text(results.length + result_text)

  var profileName = ( profiles[utenza] ? profiles[utenza].name : utenza );
  const utenzaIcon = 'cerchio_grigio_' + utenza;
  var filtersIcons = addIcon(utenzaIcon, profileName)

  if ( theme && theme.indexOf('---') < 0 ) {
    const themeIcon = 'cerchio_rosso_' + theme;
    const themeName = ( themes[theme] ? themes[theme].name : theme )
    filtersIcons += addIcon(themeIcon, themeName)
  }
  if ( tipo && tipo.indexOf('---') < 0 ) {
    const tipoIcon = 'cerchio_rosso_' + tipo;
    const tipoName = ( types[tipo] ? types[tipo].name : tipo )
    filtersIcons += addIcon(tipoIcon, tipoName)
  }
  $('#filter-text').html(filtersIcons)

  var searchResults = $('#schede-results-list')
  var store = window.allschede

  if (results.length) { // Are there any results?
    var appendString = ''

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var key = results[i].ref
      //console.log('key:' + key);
      var item = store[key]
      //console.log(item);

      appendString += getResultBox(item)
    }

    searchResults.html(appendString);
  } else {
    searchResults.html('<p>La ricerca non ha prodotto alcun risultato</p>');
  }
  // show results' section
  $('#results-div').show();
}

var resetForm = function() {
  // empty freesearch
  $('#freesearch').val('');
  // reset theme
  $('#tema').prop('selectedIndex',0)
  // reset profile
  $('#utenza').prop('selectedIndex',0)
  // reset type
  $('#tipologia').prop('selectedIndex',0)
  // empty results
  $('#results-div').hide();
}

/*
 * Hide search mask and show new search button
 */
var hideSearchMask = function() {
  $( "#docs-search-form" ).toggle();
  $( "#new-search-btn" ).toggle();

  $( "#new-search-btn" ).click(function() {
    $( "#docs-search-form" ).show( "blind", function() {
      // Animation complete.
    });
    $( "#new-search-btn" ).hide();
  });
}

$(function() {

  /* reset handling */
  $('#schede-reset-btn').click(function(event) {
    event.preventDefault();
    resetForm();
  })

  /* submit handling */
  $('#schede-search-btn').click(function(event) {
    event.preventDefault();
    // var freesearch = $('#freesearch').val();
    var utenza = $('#utenza option:selected').val();
    var theme = $('#tema option:selected').val();
    var tipo = $('#tipologia option:selected').val();
    console.log('searching for utenza: ' + utenza + ',tipologia: ' + tipo);

    // var search_freesearch = '*' + freesearch + '*';
    var search_utenza = '*' + utenza + '*';
    var search_pattern = '';
    search_pattern += ' +utenza:' + search_utenza;
    if ( theme.indexOf('---') < 0 )
      search_pattern += ' +tema:' + theme;
    if ( tipo.indexOf('---') < 0 )
      search_pattern += ' +tipo:' + tipo;

    console.log('searching for ' + search_pattern);
    var results = idx.search(search_pattern);
    console.log(results);
    //hide search mask and show new search Button
    hideSearchMask();
    displaySearchResults(results, utenza, theme, tipo);
  });

  applyUrlFilters();

})

var applyUrlFilters = function() {
  console.log('applyUrlFilters...');
  var search_pattern = '';

  // search for tags
  var profileFilters = getAllUrlParams().profile;
  if( profileFilters ) {
    search_pattern += '+utenza:*' + profileFilters + '* ';
    $('#utenza').val(profileFilters);
  }

  // search for theme
  var themeFilters = getAllUrlParams().theme;
  if( themeFilters ) {
    search_pattern += '+tema:' + themeFilters + ' ';
    $('#tema').val(themeFilters);
  }

  if (search_pattern.length > 0) {
    //hide search mask
    hideSearchMask();
    searchFor( search_pattern, profileFilters, themeFilters );
  }
}

/**
 *
 */
var searchFor = function(search_pattern, profileFilters = null, themeFilters = null) {
  // utenza is required
  var utenza = profileFilters
  if ( search_pattern.indexOf('utenza') == -1 ) {
    utenza = $('#utenza option:selected').val();
    search_pattern += ' +utenza:*' + utenza + '*';
  }
  console.log('searching for ' + search_pattern);
  var results = idx.search(search_pattern);
  displaySearchResults(results, utenza, themeFilters);
}

var profileTagClick = function(profile) {
  searchFor('+utenza:*' + profile +'*');
  resetForm();
  $('#utenza').val(profile);
}

var themaTagClick = function(theme) {
  searchFor('+tema:' + theme);
  resetForm();
  $('#tema').val(theme);
}

var typeTagClick = function(type) {
  searchFor('+tipo:' + type);
  resetForm();
  $('#tipologia').val(type);
}
