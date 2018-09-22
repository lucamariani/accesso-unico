$(function() {
  addWizardTabHandler();
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
