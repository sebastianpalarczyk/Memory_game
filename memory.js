document.addEventListener("DOMContentLoaded", function(){

    var pictures = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

    var divs = new Array(12);
    for(i=0; i<12; i++){
        var element = $('#'+i);
        divs[i] = element;
    }
    
    divs.forEach(div=>{
        $(div).on('click', revealCard);
    })

    var oneVisible = false;
    var turnCounter = 0;
    var firstCardNumber;
    var secondCardNumber;
    var lock = false;
    var pairsLeft = 6;

    function revealCard(){

    if(lock == false){

       lock = true;

       var picture = "url(img/"+pictures[this.id]+")";

       $("#"+this.id).css('background-image', picture);
       $('#'+this.id).addClass('cardA');
       $('#'+this.id).removeClass('card');

       if(oneVisible == false){
        
        // first card
        oneVisible = true;
        firstCardNumber = this.id;
        lock = false;

       }else{
        
        // second card
        
        secondCardNumber = this.id;

        if(pictures[firstCardNumber] == pictures[secondCardNumber]){
            
            setTimeout(function(){hide2Cards(secondCardNumber, firstCardNumber)}, 750);
            $('#'+firstCardNumber).off('click');
            $('#'+secondCardNumber).off('click');

        }else{

            setTimeout(function(){restore2Cards(secondCardNumber, firstCardNumber)}, 1000);
            
        }
        
        turnCounter++;
        $('.score').html('Turn counter: '+turnCounter);
        oneVisible = false;

       }

    }
       
   
}

    function hide2Cards(nr1, nr2){

        $('#'+nr1).css('opacity', '0');
        $('#'+nr2).css('opacity', '0');

        pairsLeft--;

        if(pairsLeft == 0){

            $('.board').html('<h1> You win! <br> You done in '+turnCounter+' turns</h1>');
        }

        lock = false;

    }

    function restore2Cards(nr1, nr2){

       $("#"+nr1).css('background-image', 'url(img/karta.png');
       $('#'+nr1).addClass('card');
       $('#'+nr1).removeClass('cardA');

       $("#"+nr2).css('background-image', 'url(img/karta.png');
       $('#'+nr2).addClass('card');
       $('#'+nr2).removeClass('cardA');

       lock = false;
    
    }
   
})