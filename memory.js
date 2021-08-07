$(document).ready(function(){

    var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

    var yes = new Audio("yes.wav");

    var reveal_sound = new Audio("reveal_sound.wav");

    var cards_positions= new Array(12);

    var pictures = new Array(12);

    var drawn = false;

    var random_value = 0;

    function random(){
       return  Math.floor(Math.random()*12+1);
    }

    function random_tab(){
        var randomly_drawn_layout = new Array(12);
         
        for(i=0; i<randomly_drawn_layout.length; i++){
             do{

                random_value = random();
                drawn = true;

                for(j=0; j<randomly_drawn_layout.length; j++){
                  if(randomly_drawn_layout[j] == random_value){
                    drawn = false;
                  }
                }

            if(drawn == true){
                randomly_drawn_layout[i] = random_value;  
            }

        }while(drawn != true);
    }
        return randomly_drawn_layout;
    }

    cards_positions = random_tab();

    for(i=0; i<cards_positions.length; i++){
        pictures[i] = cards[cards_positions[i]-1];
    }

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
        yes.play();

       }else{
        
        // second card
        
        secondCardNumber = this.id;
        yes.play();

        if(pictures[firstCardNumber] == pictures[secondCardNumber]){
            
            setTimeout(function(){hide2Cards(secondCardNumber, firstCardNumber)}, 750);
            $('#'+firstCardNumber).off('click');
            $('#'+secondCardNumber).off('click');
            reveal_sound.play();

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