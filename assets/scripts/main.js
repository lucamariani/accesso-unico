/** Header search functions **/
$(function() {
  var $projects = $('#projects > ul > li').clone()

  $('#search-form').on('submit', function() {
    var $sel = $('#projects > ul > li.is-selected')
    if ($sel.length > 0) {
      window.location = $sel.find('a').attr('href')
      return false
    }
  })

  $('#cerca').on('keydown', function(event) {
    if (event.which === 9 && $(this).is(':focus')) {
      $(this).blur()
      return true
    }
  })

  $('#cerca').on('keyup', function(event) {
    var text = event.target.value.toLowerCase()
    $('#projects > ul').html($projects.filter(function(index, elem) {
      var project = $(elem).find('span').html().toLowerCase()

      if (project.indexOf(text) >= 0) {
        return elem
      }
    }))
    $('#projects > ul > li:first').trigger('mouseenter')
  })
})

/** Home search functions **/
$(function() {
  var $projects = $('#home-projects > ul > li').clone()

  $('#home-search-form').on('submit', function() {
    var $sel = $('#home-projects > ul > li.is-selected')
    if ($sel.length > 0) {
      window.location = $sel.find('a').attr('href')
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

/**
 * Get the filter to apply from url.
 * If a filter is specifid byt there is not scheda for profile,thema return false
 */
var applyUrlFilter = function() {
  if ( $('.filter-theme').length > 0 ) {
    // filter in profile page
    // http://127.0.0.1:4000/accesso-unico/profili/cittadini/?turismo
    var requested_theme = window.location.search.substr(1);
    console.log('requested_theme: ' + requested_theme);

    if ( requested_theme ) {
      if ( $('.filter-theme[theme-name=' + requested_theme + ']').size() > 0 )
        $('.filter-theme[theme-name=' + requested_theme + ']').prop('checked', true);
      else return false;
    }
  } else {
    // filter in theme page
    // http://127.0.0.1:4000/accesso-unico/temi/cittadini/?cittadini
    var requested_profile = window.location.search.substr(1);
    console.log('requested_profile: ' + requested_profile);

    if ( requested_profile ) {
      if ( $('.filter-profile[profile-name=' + requested_profile + ']').size() > 0 )
        $('.filter-profile[profile-name=' + requested_profile + ']').prop('checked', true);
      else return false;
    }
  }
  filter();
  return true;
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

$(function() {
  if ( ! applyUrlFilter() ) {
    console.log('hiding scheda as there are not scheda for requested profile,thema');
  }
  applyFilters();
  update_type_numbers();
})

var changeProfile = function(parameters) {
  var profileName = $('.change-profile:checked').attr('profile-name');
  var redirectUrl = baseurl + '/profili/' + profileName;
  console.log('redirectUrl: ' + redirectUrl);
  window.location = redirectUrl;
}

// apply filter on profile changes
var applyFilters = function() {
    /*if ( profile_filters.theme ) {
      console.log('applying theme filters...');
      profile_filters.theme.each(function() {
        $('.filter-theme[theme-name=' + $(this) + ']').prop('checked', true);
      });
    }
    if ( profile_filters.type ) {
      console.log('applying type filters...');
      profile_filters.type.each(function() {
        $('.filter-type[type-name=' + $(this) + ']').prop('checked', true);
      });
    }*/

}

// add profile change handler
$(function() {
  var theme_filter_array = [];
  var type_filter_array = [];
  var parameters = '';

  $('.change-profile').change(function() {

    if ('.filter-theme:checked') parameters += '?theme='
    // get theme type_filters
    $('.filter-theme:checked').each(function() {
      console.log($(this).attr('theme-name'));
      //theme_filter_array.push($(this).attr('theme-name'));
      parameters += $(this).attr('theme-name') + ',';
    });
    // remove last comma
    parameters = parameters.replace(/,\s*$/, "");

    // add theme selected filters
    //profile_filters['theme'] = theme_filter_array;

    if ( $('.filter-type:checked') ) parameters += '&type='
    // get type filter
    $('.filter-type:checked').each(function() {
      //type_filter_array.push( $(this).attr('type-name') );
      parameters += $(this).attr('type-name') + ',';
    });
    // remove last comma
    parameters = parameters.replace(/,\s*$/, "");

    // add type selected filters
    //profile_filters['type'] = type_filter_array;

    console.log(parameters);
    changeProfile(parameters);
  });

});
