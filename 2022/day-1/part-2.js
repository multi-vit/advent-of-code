/*
--- Part Two ---
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. 
That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). 
The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?

PLAN
Same as before but push to empty array
Sort the array in descending order
Add the first 3 elements in the array - this gives us the answer!
*/

const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./day-1-input.txt", "utf8");
  // console.log(typeof data);
} catch (err) {
  console.error(err);
}

let splitArray = data.split("\n");
// console.log(splitArray);

let totalsArray = [];

let currentTotal = 0;

for (let i = 0; i < splitArray.length; i++) {
  const currentValue = parseInt(splitArray[i]);
  if (!isNaN(currentValue)) {
    currentTotal += parseInt(splitArray[i]);
    // console.log(`Current total is ${currentTotal}`);
  } else {
    totalsArray.push(currentTotal);
    currentTotal = 0;
  }
}

totalsArray.sort((a, b) => {
  return b - a;
});

// console.log(totalsArray);

let topThreeTotal = totalsArray[0] + totalsArray[1] + totalsArray[2];

console.log(`Top 3 elves total: ${topThreeTotal}`);
