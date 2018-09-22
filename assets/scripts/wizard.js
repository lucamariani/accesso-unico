$(function() {
  addWizardTabHandler();
  loadProfiles(1);
})

/* add click handler to tabs */
var addWizardTabHandler = function() {
  var tab_links = $('.wizard-link');

  tab_links.each(function(index){
    var tab_div_id = $( this ).attr('href');
    var tab_div = $(tab_div_id);

    $( this ).click(function() {
      if ( tab_div.is(':hidden') ) {
        $('.tab-pane').hide();
        tab_div.show();
      }
    });
  })
}

/* load profiles */
var loadProfiles = function(whereID) {
  console.log(window.profiles);
}

/* load themes */
var loadThemes = function(whereID) {

}

/* load profiles */
var loadItems = function(items,whereID) {

}
