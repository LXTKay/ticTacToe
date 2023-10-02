"use strict";

document.querySelector(".gameboard").addEventListener("click",e=>{
  if(e.target.className != "box") return;
  if(e.target.innerHTML != "") return;
  gameboard.progress(e);
});

const msgBox = document.querySelector(".msgBox");
let msg = document.querySelector("#msg");

document.querySelector("#closeButton").addEventListener("click", e=>{
  msgBox.close();
});

document.querySelector("#restart").addEventListener("click", e=>{
  gameboard.clear();
})

const gameboard = (()=>{
  let gameboard = {
    board: ["","","",
            "","","",
            "","",""],
    turnCounter: 0,
    currentPlayer: "X",
    switchPlayer(){
      if(this.currentPlayer == "X"){
        this.currentPlayer = "O";
      } else {
        this.currentPlayer = "X";
      };
    },
    progress(e){
      this.board[e.target.id] = this.currentPlayer;
      e.target.innerHTML = this.currentPlayer;
      if(this.turnCounter >= 4) {
        if(this.checkWin()) return;
      }
      this.switchPlayer();
      this.turnCounter++;
      if(this.turnCounter >= 9) this.draw();
    },
    clear(){
      let boxes = document.querySelectorAll(".box");
      boxes.forEach(function(box){
        box.innerHTML = "";
      });
      this.board.forEach(function(field){
        field = "";
      });
      this.turnCounter = 0;
      this.currentPlayer = "X";
    },
    checkWin(){
      let b = this.board;
      const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
    
      for(const combo of winCombos){
        if(combo.every(index => b[index] === this.currentPlayer)){
          this.win();
          return true;
        };
      };
    },
    win(){
      msg.innerHTML = `${this.currentPlayer} won!`
      msgBox.showModal();
      this.clear();
    },
    draw(){
      msg.innerHTML = `It's a draw!`
      msgBox.showModal();
      this.clear();
    }
  };
  return gameboard;
})();