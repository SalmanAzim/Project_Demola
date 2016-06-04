$(document).ready(function () {
  var h_win = $(window).height();
  var w_win = $(window).width();
  realign();
  $(window).resize(function () {
    realign();
  });
});
function realign() {
  var h_win = $(window).height();
  var w_win = $(window).width();
  console.log(h_win + "_" + w_win);
  if (h_win < 768) {
    $('body').css('overflow-y', 'scroll');
  }
  if (w_win < 1366) {
    $('body').css('overflow-x', 'scroll');
  }
  if (h_win > 768 && w_win > 1366) {
    $('body').outerHeight(h_win).outerWidth(w_win).css({ 'overflow-y': 'hidden' }, { 'overflow-x': 'hidden' });
    var adjH = h_win / 768;
    var adjW = w_win / 1366;
    $('.ScreenAdj').each(function () {
      var initH = $(this).height();
      var initW = $(this).width();
      $(this).height(adjH * initH).width(adjW * initW);
      var mL = adjW * parseInt($(this).css('margin-left'));
      var mR = adjW * parseInt($(this).css('margin-right'));
      var mT = adjH * parseInt($(this).css('margin-top'));
      var mB = adjH * parseInt($(this).css('margin-bottom'));
      $(this).css({ 'margin-left': mL }, { 'margin-right': mR }, { 'margin-top': mT }, { 'margin-bottom': mB });
    });
  } else {
    if (h_win > 768) {
      $('body').outerHeight(h_win).css({ 'overflow-y': 'hidden' });
      var adjH = h_win / 768;
      $('.ScreenAdj').each(function () {
        var initH = $(this).height();
        var initW = $(this).width();
        $(this).height(adjH * initH);
        var mT = adjH * parseInt($(this).css('margin-top'));
        var mB = adjH * parseInt($(this).css('margin-bottom'));
        $(this).css({ 'margin-top': mT }, { 'margin-bottom': mB });
      });
    }
    if (w_win > 1366) {
      $('body').outerWidth(w_win).css({ 'overflow-x': 'hidden' });
      var adjW = w_win / 1366;
      $('.ScreenAdj').each(function () {
        var initH = $(this).height();
        var initW = $(this).width();
        $(this).width(adjW * initW);
        var mL = adjW * parseInt($(this).css('margin-left'));
        var mR = adjW * parseInt($(this).css('margin-right'));
        $(this).css({ 'margin-left': mL }, { 'margin-right': mR });
      });
    }
  }
}
