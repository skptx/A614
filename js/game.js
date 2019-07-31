const numDivs = 36;
const maxHits = 10;

let hits = 0;
let lose = 0;
let firstHitTime = 0;

function round() {

  
  if (hits === maxHits) {
    endGame();
  }
  else {
    let divSelector = randomDivId();
    $(divSelector).addClass("target");
    $(divSelector).text(hits+1);
    lastDivSelector=divSelector;
  }
  if (hits === 0) {
    firstHitTime=getTimestamp();
  }


}

function endGame() {
  
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-lose").text(lose);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;

   $(event.target).removeClass("target");
   $(event.target).text("");


    round();
  }
  else {
    lose++;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
     location.reload();  
  });
  $("#button-start").click(function() {
     round();
  });
}

$(document).ready(init);
