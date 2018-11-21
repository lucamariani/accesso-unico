---
layout: default
---

<script>
const pratichetxt = "{{ site.popup_pratiche_text }}"
const preferititxt = "{{ site.popup_preferiti_text }}"
const forumtxt = "{{ site.popup_forum_text }}"
const aggiornamentitxt = "{{ site.popup_aggiornamenti_text }}"

/*const bindCloseBtn = (url) => {
  $('#close_btn').click(function() {
    location.href = baseurl + url
  })    
}*/

const bindClick = (url) => {  
  $('#modal').click(function() {
    location.href = baseurl + url
  })
}

$(function() {  
  const menu = getAllUrlParams().menu;
  const back = getAllUrlParams().back;

  /*bindCloseBtn(back)*/
  bindClick(back)

  if ( menu ) {
    const testopopup
    switch(menu) {
    case 'pratiche':
        const testopopup = pratichetxt;
        break;
    case 'preferiti':
        const testopopup =  preferititxt;
        break;
    case 'forum':
          const testopopup =  forumtxt;
          break;
    case 'aggiornamenti':
        const testopopup =  aggiornamentitxt;
        break;
    default:
        const testopopup = aggiornamentitxt;
    }
    $('#menu_txt').text( testopopup );
    $('#menu_img').attr('src', baseurl + '/assets/images/popups/' + menu + '.png')
  }
  $('#open_btn').click();
})
</script>

<div id="main" style="height:500px"></div>
<button id="open_btn" class="Button Button--default js-fr-dialogmodal-open u-hidden" aria-controls="modal">
  Apri
</button>

<div class="Dialog js-fr-dialogmodal u-zindex-50" id="modal">
    <div class="
      u-popupResponsive
      Dialog-content
      Dialog-content--centered
      u-background-white
      u-margin-all-xl
      u-padding-all-xl
      js-fr-dialogmodal-modal
    " aria-labelledby="modal-title">
        <div role="document" class="Prose">
          <p id="menu_txt"></p>
          <img id="menu_img" class="u-popupImgResponsive">          
        </div>
        <button id="close_btn" class="Button Button--danger js-fr-dialogmodal-close u-floatRight u-text-xs">Chiudi</button>
    </div>
</div>
