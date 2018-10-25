$(function() {
  addWizardTabHandler();
  // load only profiles as theme tab is hidden
  loadProfiles();
  //loadThemes();
})

var reloadItems = function() {
  window.themes = window.allthemes;
  window.profiles = window.allprofiles;
  loadProfiles();
  loadThemes();
}

/* add click handler to tabs */
var addWizardTabHandler = function() {
  var tab_links = $('.wizard-link');

  tab_links.each(function(index){
    var tab_div_id = $( this ).attr('href');
    var tab_div = $(tab_div_id);

    $( this ).click(function() {
      if ( tab_div.is(':hidden') ) {
        // remove tab active
        tab_links.removeClass('active');
        // change tab active
        $( this ).addClass('active');
        // change content
        $('.tab-pane').hide();
        // reload items
        reloadItems();
        // show tab content
        tab_div.show();
      }
    });
  })
}

var loadProfiles = function(where) {
  //console.log('loading profiles in ' + where);
  loadItems(window.profiles, 'profile', where);

  $('.wizard-item.profile').each(function(index) {
    $( this ).click(function() {
      // store profile
      window.profile = $( this ).attr('item');
      if ( where ) {
        // go to results page
        console.log('showing results for profile ' + window.profile + ' and theme ' + window.theme);
        var results_url = window.baseurl + "/temi/" + window.theme + "?profile=" + window.profile;
        window.location.href = results_url;
      } else {
        // load theme items
        window.themes = window.schede[window.profile];
        loadThemes('#wizard-profile-list');
      }
    });
  });
}

var loadThemes = function(where) {
  //console.log('loading themes in ' + where);
  loadItems(window.themes, 'theme', where);

  $('.wizard-item.theme').each(function(index) {
    $( this ).click(function() {
      // store theme
      window.theme = $( this ).attr('item');
      if ( where ) {
        // go to results page
        console.log('showing results for theme ' + window.theme + ' and profile ' + window.profile);
        var results_url = window.baseurl + "/profili/" + window.profile + "?theme=" + window.theme;
        window.location.href = results_url;
      } else {
        // load profile items
        window.profiles = window.schede[window.theme];
        loadProfiles('#wizard-theme-list');
      }
    });
  });
}

/* load items */
var loadItems = function(items,what,where) {
  console.log('loading ' + what);
  console.log(items);
  if ( ! where ) where = $('#wizard-' + what + '-list');
  var listItemsContent = '';
  var wizardItemsList = $(where);
  for (var key in items) {
    listItemsContent += '<li><div class="wizard-item u-text-r-xs ' + what + '" item="' + key + '">' + items[key].name + '</div></li>';
  };
  wizardItemsList.html(listItemsContent);
}
