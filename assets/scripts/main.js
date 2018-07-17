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
