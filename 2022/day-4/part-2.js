/*
--- Part Two ---
It seems like there is still quite a bit of duplicate work planned. 
Instead, the Elves would like to know the number of pairs that overlap at all.

In the above example, the first two pairs (2-4,6-8 and 2-3,4-5) don't overlap, 
while the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:

5-7,7-9 overlaps in a single section, 7.
2-8,3-7 overlaps all of the sections 3 through 7.
6-6,4-6 overlaps in a single section, 6.
2-6,4-8 overlaps in sections 4, 5, and 6.
So, in this example, the number of overlapping assignment pairs is 4.

PLAN
Refactor from part-1
Continue to compare both pairs
Now just need to check if first digit of one pair is less than or equal to second digit of the comparable pair
And second digit of original pair is greater than or equal to first digit of the comparable pair
*/

const fs = require("fs");

let totalEncompassingPairs = 0;
let data;

try {
  data = fs.readFileSync("./day-4-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let pairsArray = data.split("\r\n");
// console.log(pairsArray);

for (let i = 0; i < pairsArray.length; i++) {
  currentString = pairsArray[i];
  let currentPairs = currentString.split(",");
  let pairOne = currentPairs[0];
  let pairTwo = currentPairs[1];
  let digitsPairOne = pairOne.split("-");
  let digitsPairTwo = pairTwo.split("-");
  if (
    Number(digitsPairOne[0]) <= Number(digitsPairTwo[1]) &&
    Number(digitsPairOne[1]) >= Number(digitsPairTwo[0])
  ) {
    totalEncompassingPairs++;
  } else if (
    Number(digitsPairTwo[0]) <= Number(digitsPairOne[1]) &&
    Number(digitsPairTwo[1]) >= Number(digitsPairOne[0])
  ) {
    totalEncompassingPairs++;
  }
}

console.log(`Total encompassing pairs are: ${totalEncompassingPairs}`);
