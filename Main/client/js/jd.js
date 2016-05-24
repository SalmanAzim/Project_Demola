$(document).ready(function(){


    var h=$('body').height();
    var adj=h-63-60-42-40-3;

    $('.tab-content>.active').height(adj);

    console.log('h: ', h);

    console.log('adj: ', adj);
});
