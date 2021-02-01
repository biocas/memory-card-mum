    const cardsOnce = [
     {
			name: "me-1",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/me-pool.png",
			id: 1,
		},
		{
			name: "me-2",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/me-white.png",
			id: 2
		},
		{
			name: "me-3",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/croissant.png",
			id: 3
		},
		{
			name: "me-4",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/me-jump.png",
			id: 4
		},
		{
			name: "me-5",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/me1.png",
			id: 5
		},
		{
			name: "me-6",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/me-surf.png",
			id: 6
		},
		{
			name: "josh",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/josh.png",
			id: 7
		},
		{
			name: "mano",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/mano3.png",
			id: 8
		},
		{
			name: "mano-lady",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/mano2.png",
			id: 9
		},
		{
			name: "mano-eu",
			img: "http://waddlewaddle.com.au/wp-content/uploads/2021/02/Sem-título-1.png",
			id: 10
		}
];
    var cardArray = $.merge(cardsOnce, cardsOnce);
    let grid = document.querySelector(".grid");
    /* These variables can be used if a play again pop up and a scoreboard/clickboard are to be used
    let scoreBoard = document.querySelector(".scoreBoard");
    let popup = document.querySelector(".popup");
    let playAgain = document.querySelector(".playAgain");
    let clickBoard = document.querySelector(".clickBoard"); */
   // let imgs;
    let cardsId = [];
    let cardsSelected = [];
    let cardsWon = 0;
    let clicks = 0;
    let imgs =  document.getElementsByClassName("card");
    document.addEventListener("DOMContentLoaded", function () {
        //define functions
        arrangeCard(cardArray);
        createBoard(grid, cardArray);
        //this line of code calls a replay function - playAgain.addEventListener("click", replay);
        //add a click function for images
       // imgs = document.getElementsByClassName("card");
        for (var i = 0 ; i < imgs.length; i++) {
            imgs[i].addEventListener('click' , flipCard)}
    });
    //createBoard function
    function createBoard(grid, array) {
        //popup.style.display = "none";
        array.forEach((arr, index) => {
            var card = document.createElement('div');
            card.setAttribute ("id", cardArray[index].id);
            card.setAttribute ("class", "card");
            card.innerHTML = '<div class="inside">\
				<div class="front"><img src="'+ cardArray[index].img +'"\
				alt="'+ cardArray[index].name +'" /></div>\
				<div class="back"><img src="http://waddlewaddle.com.au/wp-content/uploads/2021/02/cover.svg"\
				alt="card down" /></div></div>';
            grid.appendChild(card);
})
}
    // arrangeCard function
    function arrangeCard(array) {
        // Fisher--Yates Algorithm https://dev.to/niinpatel/how-to-correctly-shuffle-an-array-in-javascript-19dl
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }

    }

    // flip Card function
    function flipCard() {
        let selected = $(this).attr("id");
        cardsSelected.push(cardArray[selected].name);
        cardsId.push(selected);
        this.classList.add("flip");
        this.setAttribute("src", cardArray[selected].img);
        if (cardsId.length === 2) {
            setTimeout(checkForMatch, 500);
                for (var i = 0 ; i < cardsId.length; i++) {
                        $(cardsId[i]).addClass("picked");

            }
            }
    }

    // checkForMatch function
    function checkForMatch() {

            let firstCard = cardsId[0];
            let secondCard = cardsId[1];
            if (cardsSelected[0] === cardsSelected[1] && firstCard == secondCard) {
                let flipped =  document.getElementsByClassName("flip");
                 $('#match-img-pop').show();
                    cardsWon += 1;
                for (var i = 0 ; i < flipped.length; i++) {
                    flipped[i].classList.add("matched");
                }
                //line of code for scoreboard - scoreBoard.innerHTML = cardsWon;
                setTimeout(hidePopUpImg, 2000);
                setTimeout(checkWon,2000);

            } else {
                for (var i = 0 ; i < imgs.length; i++) {
                    if ($(imgs[i]).hasClass( "flip" ) && !$(imgs[i]).hasClass("matched")) {
                        imgs[i].classList.remove("flip");
                        }

                }
            }
        cardsSelected = [];
        cardsId = [];
        clicks += 1;
        //line of code to show number of clicks - clickBoard.innerHTML = clicks;
    }

    function hidePopUpImg() {
        if ($('.memory-game-pop-imgs').is(':visible')) {
            $('.memory-game-pop-imgs').hide();
        }
    }

    function checkWon() {
        if (cardsWon == cardArray.length / 2) {
            setTimeout(()=> $('#win-img-pop').show(),300);

           // setTimeout(hidePopUpImg, 2000);
            //setTimeout(()=> popup.style.display = "flex" ,300);
        }
    }

    // The replay function

    function replay() {
        arrangeCard(cardArray);
        grid.innerHTML = "";
        createBoard(grid, cardArray);
        cardsWon = 0;
        clicks = 0;
        /* function for scoreboard
        clickBoard.innerHTML = 0;
        scoreBoard.innerHTML = 0; */
        popup.style.display = "none";
    }

