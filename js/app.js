document.addEventListener("DOMContentLoaded", function() {
    //create Furry
    function Furry() {
        this.x = 0,
            this.y = 0,
            this.direction = "right"
    }
    //create Coin
    function Coin() {
        this.x = Math.floor(Math.random() * 10),
            this.y = Math.floor(Math.random() * 10)
    }

    //create Game
    function Game() {
        this.board = document.querySelectorAll("#board div"),
            this.furry = new Furry,
            this.coin = new Coin,
            this.score = 0
    }

    var furry = new Furry;
    var coin = new Coin;
    var game = new Game;

    //Calculate position function
    var calcPosition = function(a, b) {
        return a + b * 10;
    }

    //Function which returns coin position
    var showCoin = function(coin) {
        var coinPosition = calcPosition(coin.x, coin.y);
        return coinPosition;
    };

    //Function which calculate furry position
    var showFurry = function(furry, game) {
        var furryPosition = calcPosition(furry.x, furry.y);
        game.board[furryPosition].classList.add("furry");
    };
    // Function which updates scoreboard
    var updateResult = function(game) {
        var scoreboard = document.querySelector(".score");
        scoreboard.innerHTML = game.score;
    };

    //Function which changes furry position
    var moveFurry = function(game) {
        var furryDirection = furry.direction;
        switch (furryDirection) {
            case "up":
                furry.y--;
                break;

            case "down":
                furry.y++;
                break;

            case "left":
                furry.x--;
                break;

            case "right":
                furry.x++;
                break;
        }
    };



    var keyboard = function(furry, game) {
        document.onkeypress = function(event) {
            var key = event.which;
            switch (key) {
                case 119:
                    furry.direction = "up";
                    break;
                case 115:
                    furry.direction = "down";
                    break;
                case 97:
                    furry.direction = "left";
                    break;
                case 100:
                    furry.direction = "right";
                    break;
            }
        }
        for (var i = 0; i < game.board.length; i++) {
            game.board[i].classList.remove("furry");
        }
        var furryPosition = calcPosition(furry.x, furry.y);
        game.board[furryPosition].classList.add("furry");

        if (showCoin(coin) == furryPosition) {
            game.score += 1;
            game.board[showCoin(coin)].classList.remove("coin");
            coin = new Coin;
            game.board[showCoin(coin)].classList.add("coin");
        }
        updateResult(game);

    };

    //Check if furry hit the wall
    var check = function(furry) {
        var instructions = document.querySelector(".instructions");
        var board = document.querySelector("#board");
        var end = document.querySelector(".end");
        if (furry.x > 9 || furry.x < 0 || furry.y < 0 || furry.y > 9) {
            instructions.style.display = "block";
            board.style.display = "block";
            end.style.display = "none";
            instructions.style.display = "none";
            board.style.display = "none";
            end.style.display = "block";
        }
    }

    //Render function
    var render = function(furry) {
        setInterval(function() {
            check(furry);
            showFurry(furry, game);
            moveFurry(furry);
            keyboard(furry, game);

        }, 250);
    }

    game.board[showCoin(coin)].classList.add("coin"); //initial coin
    render(furry);
})
