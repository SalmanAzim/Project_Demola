$(document).ready(function () {
    realign();
    $(window).resize(function () {
        realign();
    });
});


function realign() {
    var h_win = $(window).height();
    var w_win = $(window).width();
    var h_doc = $(document).height();
    var w_doc = $(document).width();
    console.log(h_win + "_" + w_win);
    console.log(h_doc + "_" + w_doc);
    if (h_win < 768) {
        $('body').css('overflow-y', 'scroll');
    }

    if (w_win < 1366) {
        $('body').css('overflow-x', 'scroll');
    }
    
    if (h_win > 768 && w_win > 1366) {
        var adjH = h_win / 768;
        var adjW = w_win / 1366;
        var text = 'scale(' + adjW + ',' + adjH + ')';
        $('.ScreenAdj').css('transform', text);
    } else {
        if (h_win > 768) {
            var adj = h_win / 768;
            var text = 'scale(0,' + adj + ')';
            $('.ScreenAdj').css('transform', text);
        }
        if (w_win > 1366) {
            var adj = w_win / 1366;
            var text = 'scale(' + adj + ',0)';
            $('.ScreenAdj').css('transform', text);
        }
    }
}
