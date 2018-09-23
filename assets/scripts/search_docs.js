/** Create lunr index **/
var idx = lunr(function () {
  //this.ref('url');
  this.field('id');
  this.field('title', { boost: 10 });
  this.field('tema');
  this.field('category');
  this.field('year');
  this.field('number');
  this.field('url');

  for (var key in window.store) { // Add the data to lunr
    this.add({
      'id': key,
      'title': window.store[key].title,
      'tema': window.store[key].tema,
      'category': window.store[key].category,
      'year': window.store[key].year,
      'number': window.store[key].number,
      'url': window.store[key].url
    });
  }
});

/** display results **/
function displaySearchResults(results, store) {
  console.log(store);
  var searchResults = $('#docs-results-list');

  if (results.length) { // Are there any results?
    var appendString = '';

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
      var key = results[i].ref;
      console.log('key:' + key);
      var item = store[key];
      console.log('item:' + item);

      appendString += '<div class="Grid-cell u-md-size1of3 u-lg-size1of3 u-margin-r-bottom u-layout-matchHeight">';
      appendString += '<div class="u-nbfc u-flexWrap u-flex u-color-grey-60 u-xs-padding-all-none u-borderShadow-m u-xs-borderShadow-none u-borderRadius-m u-background-white u-sizeFill">';
      appendString += '<div class="u-flexWrap u-flex u-flexAlignSelfStretch u-sizeFill u-padding-r-all"><div class="u-sizeFull u-padding-r-all u-xs-padding-all-none">';
      appendString += '<a href="' + item.url + '" target="_blank"><h3 class="u-color-50">' + item.title + '</h3></a>';
      appendString += '<p>Categoria: ' + item.category + '</p>';
      appendString += '<p>Tema: ' + item.tema + '</p></li>';
      appendString += '<p>Numero: ' + item.number + '</p>';
      appendString += '<p>Anno: ' + item.year + '</p>';
      appendString += '</div></div></div></div>';
    }

    searchResults.html(appendString);
  } else {
    searchResults.html('<p>La ricerca non ha prodotto alcun risultato</p>');
  }
  // show results' section
  $('#result-section').show();
}

/** Docs search functions **/
$(function() {
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

      if (title.indexOf(text) >= 0) {
        return elem
      }
    }))
    $('#titolo-listing > ul > li:first').trigger('mouseenter')
  })
})


$(function() {
  var $titles = $('#numero-listing > ul > li').clone()

  /* number filtering */
  $('#numero').on('keydown', function(event) {
    if (event.which === 9 && $(this).is(':focus')) {
      $(this).blur()
      return true
    }
  })

  $('#numero').on('keyup', function(event) {
    var text = event.target.value.toLowerCase()
    $('#numero-listing > ul').html($titles.filter(function(index, elem) {
      var title = $(elem).find('span').html().toLowerCase()

      if (title.indexOf(text) >= 0) {
        return elem
      }
    }))
    $('#numero-listing > ul > li:first').trigger('mouseenter')
  })

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



/** SCHEDE FILTERING **/
var all_schede = $('.scheda-listing');

var update_type_numbers = function() {
  $('#cardinality-pratica').text($('.pratica:visible').length);
  $('#cardinality-servizio').text($('.servizio:visible').length);
}

var update_theme_profile_numbers = function() {
  /*
  if ( $('.filter-theme').length > 0 ) {
    $('#cardinality-edilizia').text($('.edilizia:visible').length);
    $('#cardinality-turismo').text($('.turismo:visible').length);
  } else {
    $('#cardinality-cittadini').text($('.cittadini:visible').length);
    $('#cardinality-imprese').text($('.imprese:visible').length);
    $('#cardinality-imprenditori').text($('.imprenditori:visible').length);
  }
  */
}

var filter = function() {
  var filter_type_checked = $('.filter-type:checked').length;
  if ( $('.filter-theme').length > 0 ) {
    // filter in profile page
    var filter_theme_checked = $('.filter-theme:checked').length;
    $('.scheda-listing').hide();

    $('.filter-theme:checked').each(function(event) {
      var theme_name = $(this).attr('theme-name');
      $('.scheda-listing.' + theme_name).show();
    });
    $('.filter-type:checked').each(function(event) {
      var type_name =  $(this).attr('type-name');
      $('.scheda-listing.' + type_name).show();
    });
    if ( filter_theme_checked > 0 ) {
      $('.filter-theme:not(:checked)').each(function(event) {
        var theme_name = $(this).attr('theme-name');
        $('.scheda-listing.' + theme_name).hide();
      });
    }
    if ( filter_type_checked > 0 ) {
      $('.filter-type:not(:checked)').each(function(event) {
        var type_name =  $(this).attr('type-name');
        $('.scheda-listing.' + type_name).hide();
      });
    }
    if ( ( filter_theme_checked == 0 ) && ( filter_type_checked == 0 ) )
      $('.scheda-listing').show();

  } else {

    // filter in theme page
    filter_by_profile();
    if ( filter_type_checked > 0 ) {
      $('.filter-type:not(:checked)').each(function(event) {
        var type_name =  $(this).attr('type-name');
        $('.scheda-listing.' + type_name).hide();
      });
    }
  }
}
$(function() {

  // get all theme filters components
  var theme_filters = $('.filter-theme');

  theme_filters.each(function() {
    $(this).on('change', function(event) {
      filter();
      update_type_numbers();
    });
  });
})

/** profile's schede filtering **/

var filter_by_profile = function() {
  $('.filter-profile:not(:checked)').each(function(event) {
    var profile_name = $(this).attr('profile-name');
    $('.scheda-listing.' + profile_name).hide();
  });
  $('.filter-profile:checked').each(function(event) {
    var profile_name = $(this).attr('profile-name');
    $('.scheda-listing.' + profile_name).show();
  });
}

$(function() {

  // get all profile filters components
  var profile_filters = $('.filter-profile');

  profile_filters.each(function() {
    $(this).on('change', function(event) {
      filter();
      update_type_numbers();
    });
  });
})

$(function() {
  // get all type filters components
  var type_filters = $('.filter-type');

  type_filters.each(function() {
    $(this).on('change', function(event) {
      filter();
      update_theme_profile_numbers();
    });
  });
})
