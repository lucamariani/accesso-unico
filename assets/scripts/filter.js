/* ACTIONS */
var update_type_numbers = function() {
  $('#cardinality-pratica').text($('.pratica:visible').length);
  $('#cardinality-servizio').text($('.servizio:visible').length);
}

var applyUrlFilters = function() {
  console.log('applyUrlFilters...');
  // filter themes
  var themeFilters = getAllUrlParams().theme;
  if(themeFilters) {
    console.log('themeFilters: ' + themeFilters);
    $.each(themeFilters.split(','), function( key,value ) {
      if ( $('.filter-theme[theme-name=' + value + ']').size() > 0 )
        $('.filter-theme[theme-name=' + value + ']').prop('checked', true);
    });
  }
  // filter types
  var typeFilters = getAllUrlParams().type;
  if(typeFilters) {
    console.log('typeFilters: ' + typeFilters);
    $.each(typeFilters.split(','), function( key,value ) {
      if ( $('.filter-type[type-name=' + value + ']').size() > 0 )
        $('.filter-type[type-name=' + value + ']').prop('checked', true);
    });
  }
  // filter profile
  var profileFilters = getAllUrlParams().profile;
  if(profileFilters) {
    console.log('profileFilters: ' + profileFilters);
    $.each(profileFilters.split(','), function( key,value ) {
      if ( $('.filter-profile[profile-name=' + value + ']').size() > 0 )
        $('.filter-profile[profile-name=' + value + ']').prop('checked', true);
    });
  }
}

var filter = function() {
  var filter_type_checked = $('.filter-type:checked').length;
  // filter in profile page
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

var changeProfile = function(parameters) {
  var profileName = $('.change-profile:checked').attr('profile-name');
  var redirectUrl = baseurl + '/profili/' + profileName + parameters;
  console.log('redirectUrl: ' + redirectUrl);
  window.location = redirectUrl;
}

var changeTheme = function(parameters) {
  var themeName = $('.change-theme:checked').attr('theme-name');
  var redirectUrl = baseurl + '/temi/' + themeName + parameters;
  console.log('redirectUrl: ' + redirectUrl);
  window.location = redirectUrl;
}

var applyHandlers = function() {
  themeFilterHandler();
  typeFilterHandler();
  profileFilterHandler();
  profileChangeHandler();
  themeChangeHandler();
}

/* HANDLERS */
var themeFilterHandler = function() {
  // apply handler for each theme filters component
  $('.filter-theme').each(function() {
    $(this).on('change', function(event) {
      filter();
      update_type_numbers();
    });
  });
}

var profileFilterHandler = function() {
  // apply handler for each profile filters component
  $('.filter-profile').each(function() {
    $(this).on('change', function(event) {
      filter();
      update_type_numbers();
    });
  });
}

var typeFilterHandler = function() {
  // apply handler for each type filters component
  $('.filter-type').each(function() {
    $(this).on('change', function(event) {
      filter();
    });
  });
}

// add profile change handler
var profileChangeHandler = function() {
  var parameters = '';

  $('.change-profile').change(function() {
    var addUrlParameterChar = '?';
    // get the selected themes
    if ( $('.filter-theme:checked').length > 0 ) {
      parameters += addUrlParameterChar + 'theme=';
      addUrlParameterChar = '&';
    }
    // get theme type_filters
    $('.filter-theme:checked').each(function() {
      console.log($(this).attr('theme-name'));
      parameters += $(this).attr('theme-name') + ',';
    });
    // remove last comma
    parameters = parameters.replace(/,\s*$/, "");

    // get the selected types
    if ( $('.filter-type:checked').length > 0 ) parameters += addUrlParameterChar + 'type=';
    // get type filter
    $('.filter-type:checked').each(function() {
      //type_filter_array.push( $(this).attr('type-name') );
      parameters += $(this).attr('type-name') + ',';
    });
    // remove last comma
    parameters = parameters.replace(/,\s*$/, "");
    // change profile
    changeProfile(parameters);
  });
}
// add theme change handler
var themeChangeHandler = function() {
  var parameters = '';

  $('.change-theme').change(function() {
    var addUrlParameterChar = '?';
    // get the selected themes
    if ( $('.filter-profile:checked').length > 0 ) {
      parameters += addUrlParameterChar + 'profile=';
      addUrlParameterChar = '&';
    }
    // get profile type_filters
    $('.filter-profile:checked').each(function() {
      console.log($(this).attr('profile-name'));
      parameters += $(this).attr('profile-name') + ',';
    });
    // remove last comma
    parameters = parameters.replace(/,\s*$/, "");

    // get the selected types
    if ( $('.filter-type:checked').length > 0 ) parameters += addUrlParameterChar + 'type=';
    // get type filter
    $('.filter-type:checked').each(function() {
      //type_filter_array.push( $(this).attr('type-name') );
      parameters += $(this).attr('type-name') + ',';
    });
    // remove last comma
    parameters = parameters.replace(/,\s*$/, "");
    // change theme
    changeTheme(parameters);
  });
}
/* END HANDLERS */

/* MAIN */
$(function() {
  applyUrlFilters();
  filter();
  //update_type_numbers();
  applyHandlers();
})
