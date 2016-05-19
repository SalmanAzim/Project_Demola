// Time to use some industrial.js!
// This is where we'll initialize our components, 
// and change values with a small value simulator.

// Simulate data every 5 seconds
$(document).ready(function() {
    setTimeout(function() {
        $(".industrial").industrial({});
    },250);

    words = ["good", "evil", "money", "INT", "JS", "lisp", "C++", "C", "java", "nomer", "0xDE", "YAY!", "anims", "death", "BTC"];

    setInterval(function() {
        $(".industrial.tank, .industrial.thermometer, .industrial.gauge").each(function() {
            $(this).industrial(Math.floor(60 + (Math.random()*10)));
        });
        $(".industrial.led").each(function() {
            $(this).industrial(Math.random() > .5);
        });
        $("#read1").each(function() {
            text = 145;
            if($(this)[0].outerText){            
                text = 145;                
            }
            if (parseInt($(this)[0].outerText) > 100){
                text = parseInt($(this)[0].outerText) + 1;                
            }
            $(this).industrial(Math.floor(text));
        });
        $("#read2").each(function() {
            index = Math.floor(Math.random()*words.length);
            $(this).industrial(words[index]);
        });
    }, 2500);

    // Also init our introjs!
    $("#start_intro").click(function() {
        introJs().start();
    });
});