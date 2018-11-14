window.Users = window.Users || {};

/**
 * Favorites
 *
 * This module is used to simulate user's login and grants.
 * It uses a cookie to save them.
 *
 * @module Users
 */

(function (exports) {

  const USER_STATUS_COOKIE = 'user_status'

  // onload
  exports.initialize = function() {
    _bindEventHandlers()
  }

  function _bindEventHandlers() {
    startVisibility()
    enableListViewClick()
    enableLoginClick()
    enableLogoutClick()
  }

  // hide
  var hideUserMenu = function() {
    $('.only-loggedin').removeClass('Megamenu-item')
  }

  // show
  var showUserMenu = function(role) {
    // remove all user's entries
    hideUserMenu()
    // then shows only the role granted
    switch (role) {
      case 'pa':
        $('#user-name').text('Gianni Verdi – Comune di Cittadella');
        // console.log('showing...')
        $('.user-pa-entry').addClass('Megamenu-item')
        break;
      case 'private':
        $('#user-name').text('Mario Rossi');
        // console.log('showing...')
        $('.user-private-entry').addClass('Megamenu-item')
        break;

      default:

    }

  }

  var enableListViewClick = function() {
    $('#login-div').click(function() {
      $('#users-list').toggle()
    })
  }

  var enableLoginClick = function() {
    $('#users-list li').click(function() {
      console.log('login clicked...');
      const role = $(this).attr('user-role')
      console.log('user role: ' + role)
      // hide listing
      $('#users-list').hide()
      // add loggedin status
      Cookies.set(USER_STATUS_COOKIE, role)
      location.reload()
      // handle css classes
      // switchLoginClass()
      // handle login mask content
      // setLogoutContentMask()
      // as we changed the css class we need to enable callback again
      // enableLogoutClick()
      // showUserMenu(role)
    })
  }

  var enableLogoutClick = function() {
    $('#logout-icon').click(function() {
      console.log('logout clicked...');
      // add loggedin status
      Cookies.set(USER_STATUS_COOKIE, 0)
      location.reload()
      // handle css classes
      // switchLogoutClass()
      // handle login mask content
      // setLoginContentMask()
      // as we changed the css class we need to enable callback again
      // enableLoginClick()
      // hideUserMenu()
    })
  }

  // on load menu entries should be hided
  // if USER_STATUS_COOKIE is not 1
  var startVisibility = function() {
    const userLogged = Cookies.get(USER_STATUS_COOKIE) || 0
    console.log('userLogged status: ' + userLogged)

    if ( userLogged != 0 ) {
      console.log('setting logout content...');
      // switchLoginClass()
      setLogoutContentMask(userLogged)
    } else {
      setLoginContentMask()
      hideUserMenu()
    }
  }

  // var switchLoginClass = function() {
  //   $('.Header-login').addClass('Header-logout')
  //   $('.Header-login').removeClass('Header-login')
  // }
  //
  // var switchLogoutClass = function() {
  //   $('.Header-logout').addClass('Header-login')
  //   $('.Header-logout').removeClass('Header-logout')
  // }

  var setLoginContentMask = function() {
      // hide logout mask
      $('.logout-mask').hide()
      $('.Headroom-showme.logout-mask').css('max-height',0)
      $('.login-mask').show()
  }

  var setLogoutContentMask = function(role) {
    console.log('setLogoutContentMask')
    showUserMenu(role)

    // hide login mask
    $('.login-mask').hide()
    $('.Headroom-showme.login-mask').css('max-height', '0')
    $('.logout-mask').show()
    $('.Headroom-showme.logout-mask').css('max-height', '5em')
  }



})(Users)