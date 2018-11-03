window.Favorites = window.Favorites || {};

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

  //test
  exports.debug = function() {
    console.log(favorites)
  }

  /**
   * Add a favorite
   *
   * @param {String} name the favorite's name
   * @param {String} url the favorite's url
   */
  exports.add = function(name, url) {
    favorites[name] = url
  }

  /**
   * Remove a favorite
   *
   * @param {String} name the favorite's name to be removed
   */
  exports.remove = function(name) {
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
})(Favorites)
