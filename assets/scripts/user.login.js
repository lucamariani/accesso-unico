const USER_STATUS_COOKIE = 'user_status'

// hide
var hideUserMenu = function() {
  console.log('hiding...')
  $('.only-loggedin').removeClass('Megamenu-item')
}

// show
var showUserMenu = function() {
  console.log('showing...')
  $('.only-loggedin').addClass('Megamenu-item')
}

var enableLoginClick = function() {
  $('.Header-login').click(function() {
    // add loggedin status
    Cookies.set(USER_STATUS_COOKIE, 1)
    // handle css classes
    switchLoginClass()
    // handle login mask content
    setLogoutContentMask()
    // as we changed the css class we need to enable callback again
    enableLogoutClick()
    showUserMenu()
  })
}

var enableLogoutClick = function() {
  $('.Header-logout').click(function() {
    // add loggedin status
    Cookies.set(USER_STATUS_COOKIE, 0)
    // handle css classes
    switchLogoutClass()
    // handle login mask content
    setLoginContentMask()
    // as we changed the css class we need to enable callback again
    enableLoginClick()
    hideUserMenu()
  })
}

// on load menu entries should be hided
// if USER_STATUS_COOKIE is not 1
var startVisibility = function() {
  const userLogged = Cookies.get(USER_STATUS_COOKIE) || 0
  console.log('userLogged status: ' + userLogged)
  if ( userLogged == 1) {
    switchLoginClass()
    setLogoutContentMask()
    showUserMenu()
  }
  else {
    setLoginContentMask()
    hideUserMenu()
  }
}

var switchLoginClass = function() {
  $('.Header-login').addClass('Header-logout')
  $('.Header-login').removeClass('Header-login')
}

var switchLogoutClass = function() {
  $('.Header-logout').addClass('Header-login')
  $('.Header-logout').removeClass('Header-logout')
}

var setLoginContentMask = function() {
    // hide logout mask
    $('#logout-mask').hide()
    $('#login-mask').show()
}

var setLogoutContentMask = function() {
  // hide login mask
  console.log('hiding logout...');
  $('#login-mask').hide()
  $('#logout-mask').show()
}


// onload
$(function() {
  startVisibility()
  enableLoginClick()
  enableLogoutClick()
})
