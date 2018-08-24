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

/** theme's schede filtering **/
$(function() {

  // get all theme filters components
  var theme_filters = $('.filter-theme');

  theme_filters.each(function() {
    $(this).on('change', function(event) {
      var checked_number = $('.filter-theme:checked').length;
      // if no filter is checked show all
      if ( checked_number == 0 ) $('.scheda-listing').show();
      else {
        //console.log('filtering ' + theme_name);
        $('.scheda-listing').hide();
        $('.filter-theme:checked').each(function(event) {
          var theme_name = $(this).attr('theme-name');
          $('.scheda-listing.' + theme_name).show();
        });
      }
    });
  });

})

/** profile's schede filtering **/
$(function() {

  // get all theme filters components
  var profile_filters = $('.filter-profile');

  profile_filters.each(function() {
    $(this).on('change', function(event) {

      $('.scheda-listing').hide();
      $('.filter-profile:checked').each(function(event) {
        var profile_name = $(this).attr('profile-name');
        console.log('filtering ' + profile_name);
        $('.scheda-listing.' + profile_name).show();
      });
    });
  });

})
