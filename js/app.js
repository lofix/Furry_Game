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
            this.score = 0,
            self = this
    }

    var furry = new Furry;
    var coin = new Coin;
    var game = new Game;

    //Funkcja obliczająca pozycję
    var calcPosition = function(a, b) {
        return a + b * 10;
    }

    //Funkcja określająca na jakiej pozycji znajduje się moneta
    var showCoin = function(coin, game) {
            var coinPosition = calcPosition(coin.x, coin.y);
            game.board[coinPosition].classList.add("coin");
        }
        //Funkcja określająca na jakiej pozycji znajduje się fury
    var showFurry = function(furry, game) {
        var furryPosition = calcPosition(furry.x, furry.y);
        game.board[furryPosition].classList.add("furry");
    }

    var moveFurry = function(furry) {
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
        }
        //Funkcja odpowiedzialna za sterowanie przyciskami WSAD, oraz obliczanie nowej pozycji Furryego
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
            // moveFurry(furry);
        }
        for (var i = 0; i < game.board.length; i++) {
            game.board[i].classList.remove("furry");
        }
        var newPosition = calcPosition(furry.x, furry.y);
        game.board[newPosition].classList.add("furry");
        // console.log(newPosition);

    }



    //GAME
    var gameStep = function(furry) {
        setInterval(function() {
            showFurry(furry, game);
            moveFurry(furry);
            keyboard(furry, game);
        }, 250);
    }
    showCoin(coin, game);
    showFurry(furry, game);
    gameStep(furry);
})
