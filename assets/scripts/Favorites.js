/**
 * @author Luca Mariani
 * @since 03/11/2018
 */

window.Favorites = window.Favorites || {};

/**
 * Favorites
 *
 * This module is used to simulate user's favorites saving.
 * It uses a cookie to save them.
 *
 * @module Favorites
 */

(function (exports) {

  /**
   * The name for the cookie
   */
   const FAVORITES_COOKIE = 'user_favorites'

  /**
   * Object to store favorites.
   * Get values from cookie if available,
   * otherwise inizialize it as an empty object
   */
  var favorites = Cookies.getJSON(FAVORITES_COOKIE) || {}

  /**
   * Synchronize array in cookie before leave the page
   */
  $( window ).unload(function() {
    Cookies.set(FAVORITES_COOKIE,Favorites.getAll())
  });

  /**
   * Bind event handlers on DOM ready
   */
  $(function() {
    _toogleFavoriteButton()
    _bindEventHandlers()
  });

  /**
   * Add a favorite
   *
   * @param {String} name the favorite's name
   * @param {String} url the favorite's url
   */
  exports.add = function(name, url) {
    console.log('adding ' + name + ':' + url);
    favorites[name] = url
  }

  /**
   * Remove a favorite
   *
   * @param {String} name the favorite's name to be removed
   */
  exports.remove = function(name) {
    console.log('removing ' + name);
    delete favorites[name]
  }

  /**
   * Get a favorite by name
   *
   * @param {String} name the favorite's name
   * @return {String} the favorite's value
   */
  exports.getByName = function(name) {
    return favorites[name]
  }

  //get all favorites
  exports.getAll = function() {
    return favorites
  }

  //reset favorites
  exports.reset = function() {
    favorites = {}
  }

  /**
   * Change favorite handler button
   *
   * Check in favorites to see if this scheda is already stored
   * and hide/show buttons accordingly
   */
  function _toogleFavoriteButton() {
    const title = $('#handle-favorite').attr('scheda_title')
    if ( favorites.hasOwnProperty(title) ) {
      $('#add-scheda-to-favorites-btn').hide()
      $('#remove-scheda-from-favorites-btn').show()
    } else {
      $('#add-scheda-to-favorites-btn').show()
      $('#remove-scheda-from-favorites-btn').hide()
    }
  }

  /**
   * Bind event handlers
   */
   function _bindEventHandlers() {
     /**
      * Event: add scheda to favorite button "clicked"
      *
      * Add the scheda in user's favorites
      */
      $('#add-scheda-to-favorites-btn').click(function() {
        var title = $(this).parent().attr('scheda_title')
        var url = $(this).parent().attr('scheda_url')
        Favorites.add(title, url)
        //change button
        _toogleFavoriteButton()
      })

      /**
       * Event: remove scheda from favorite button "clicked"
       *
       * Remove the scheda from user's favorites
       */
       $('#remove-scheda-from-favorites-btn').click(function() {
         const title = $(this).parent().attr('scheda_title')
         Favorites.remove(title)
         //change button
         _toogleFavoriteButton()
       })
   }
})(Favorites)
