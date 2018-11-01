$(function() {
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

var loadProfileContent = function() {
  $('#tab-content-title').text('scegli il profilo in cui ti riconosci >> ');
  $('#tab-content-subtitle').text('ti verrà restituito un elenco di argomenti filtrato in base ai tuoi bisogni ');
}
var loadThemeContent = function() {
  $('#tab-content-title').text('seleziona l’argomento di tuo interesse >> ');
  $('#tab-content-subtitle').text('ogni servizio scelto tra quelli che ti verranno proposti fornisce informazioni adeguate alle tue caratteristiche ');
}

var loadProfiles = function(where) {
  loadProfileContent();
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
  loadThemeContent();
  //console.log('loading themes in ' + where);
  loadItems(window.themes, 'theme', where);

  $('.wizard-item.theme').each(function(index) {
    $( this ).click(function() {
      // store theme
      window.theme = $( this ).attr('item');
      if ( where ) {
        // go to results page
        console.log('showing results for theme ' + window.theme + ' and profile ' + window.profile);
        var results_url = window.baseurl + "/schede_search?profile=" + window.profile + "&theme=" + window.theme;
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
    listItemsContent += '<div class="Grid-cell u-size1of2 u-md-size1of4 u-lg-size1of4"><div class="wizard-item u-textCenter u-text-r-xs ' + what + '" item="' + key + '">';
    listItemsContent += '<img src="' + baseurl + iconsurl + key + '.png"><br>' + items[key].name + '</div></div>';
  };
  wizardItemsList.html(listItemsContent);
}
