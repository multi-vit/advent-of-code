/*
--- Part Two ---
The Elf finishes helping with the tent and sneaks back over to you. 
"Anyway, the second column says how the round needs to end: 
X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. 
The example above now goes like this:

In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. 
This gives you a score of 1 + 3 = 4.
In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

PLAN
Refactor from part-1:
moveScore object becomes resultScore as X-Z now represent the result
calculateResult now becomes calculateMoveScore as we can reverse engineer playerMove from what the opponent played and what the result is:
e.g. opponent plays A (Rock), result is X (lose) so player must play Scissors and receive 3 points for the move
Make sure all other variables are semantically named to reflect new scenario
*/

const fs = require("fs");

const resultScore = {
  X: 0,
  Y: 3,
  Z: 6,
};
// A = rock, B = paper, C = scissors
// X = lose, Y = draw, Z = win
function calculateMoveScore(opponentMove, result) {
  if (opponentMove === "A") {
    switch (result) {
      case "X":
        return 3;
      case "Y":
        return 1;
      default:
        return 2;
    }
  }
  if (opponentMove === "B") {
    switch (result) {
      case "Y":
        return 2;
      case "Z":
        return 3;
      default:
        return 1;
    }
  }
  if (opponentMove === "C") {
    switch (result) {
      case "Z":
        return 1;
      case "X":
        return 2;
      default:
        return 3;
    }
  }
}

let data;
let playerTotal = 0;

try {
  data = fs.readFileSync("./day-2-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let gameArray = data.split("\n");
// console.log(movesArray);

for (let i = 0; i < gameArray.length; i++) {
  // console.log(`Opponent move is ${gameArray[i].charAt(0)}`);
  // console.log(`Result is ${gameArray[i].charAt(2)}`);
  const opponentMove = gameArray[i].charAt(0);
  const result = gameArray[i].charAt(2);
  playerTotal += resultScore[result];
  playerTotal += calculateMoveScore(opponentMove, result);
  // console.log(`Player Total after round ${i + 1} is: ${playerTotal}`);
}

console.log(`Final total is ${playerTotal}`);
