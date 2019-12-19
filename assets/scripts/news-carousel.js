$(function () 
  {
    var ticker = function () 
    {      
      if ($('#news-slider li').length > 1) {
        ticker_timeout = setTimeout(function () {

          $('#news-slider li:first').animate({ marginLeft: '-25%' }, 450, function () {
            $(this).detach().appendTo('ul#news-slider').attr('style', '');
          });

          ticker();
        }, 3500);
      }
    }

    $('#news-slider').hover(function () {
      $('#news-slider').stop();
      clearTimeout(ticker_timeout);
    }, function () {
      ticker();
    });

    ticker();
  })