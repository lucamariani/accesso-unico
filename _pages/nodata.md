---
layout: nodata
---
<script>
$(function() {
  var where = window.location.search.substr(1);
  if ( where ) $('h2').append(' per il comune di ' + where);
  $('#open_btn').click();
})
</script>
<button id="open_btn" class="Button Button--default js-fr-dialogmodal-open u-hidden" aria-controls="modal">
  Apri
</button>
<div class="Dialog js-fr-dialogmodal" id="modal">
    <div class="
      Dialog-content
      Dialog-content--centered
      u-background-white
      u-layout-prose
      u-margin-all-xl
      u-padding-all-xl
      js-fr-dialogmodal-modal
    " aria-labelledby="modal-title">
        <div role="document" class="Prose">
            <h2 class="u-cf u-text-h2 u-borderHideFocus" id="modal-title" tabindex="0">Dati non disponibili</h2>
            <p>
                Dati non disponibili in rete.
            </p>
            <!--<button class="Button Button--danger js-fr-dialogmodal-close u-floatRight">Chiudi</button>-->
        </div>
    </div>
</div>
