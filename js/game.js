const numDivs = 36;    
const maxHits = 11;

let hits =1;
let firstHitTime = 0;

function round() {
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  // FIXME: надо бы убрать "target" прежде чем искать новый
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(".target").text(hits);
  // TODO: помечать target текущим номером
  $(".game-field").one("click",function(){
    firstHitTime=getTimestamp();
  });

  // FIXME: тут надо определять при первом клике firstHitTime
 
  if (hits === maxHits) {
    //getTimestamp();
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".container").addClass("d-none");
  $(".button-start").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
  $("#button-reload").click(function() {
    location.reload();
  });
}

function handleClick(event) {

  
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;

    round();
    
  }
  
  else {
    $(event.target).addClass("miss");
    handleClick();

  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}


function init() {
  $(".button-start").click(round);
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
// round();


  $(".game-field").click(handleClick);
   
  
  
}
$(document).ready(init);
