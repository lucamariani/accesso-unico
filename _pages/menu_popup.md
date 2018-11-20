---
layout: default
---

<script>
const pratiche_txt = "{{ site.popup_pratiche_text }}"
const preferiti_txt = "{{ site.popup_preferiti_text }}"
const forum_txt = "{{ site.popup_forum_text }}"
const aggiornamenti_txt = "{{ site.popup_aggiornamenti_text }}"

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
    $('#menu_txt').text(pratiche_txt);
    $('#menu_img').attr('src', baseurl + '/assets/images/popups/' + menu + '.png')
  }
  $('#open_btn').click();
})
</script>

<div id="main" style="height:500px"></div>
<button id="open_btn" class="Button Button--default js-fr-dialogmodal-open u-hidden" aria-controls="modal">
  Apri
</button>

<div class="Dialog js-fr-dialogmodal" id="modal" style="z-index:50">
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
