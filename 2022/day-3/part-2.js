/*
--- Part Two ---
As you finish identifying the misplaced items, the Elves come to you with another issue.

For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. 
For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. 
That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, 
and at most two of the Elves will be carrying any other item type.

The problem is that someone forgot to put this year's updated authenticity sticker on the badges. 
All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

Additionally, nobody wrote down which item type corresponds to each group's badges. 
The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. 
So, in the above example, the first group's rucksacks are the first three lines:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg

And the second group's rucksacks are the next three lines:

wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?

PLAN
Refactor from part-1.js:
Don't split string in half
Loop through current string
Check if next 2 strings .includes() current character
If it does, check upper/lowercase as before
Add value to total
*/

const fs = require("fs");

function lowercasePriority(letter) {
  // UTF-16 code for "a" is 97 and need to start at 1
  // No index needed for charCodeAt as defaults to 0
  return letter.charCodeAt() - 96;
}

function uppercasePriority(letter) {
  // UTF-16 code for "A" is 65 and need to start at 27
  return letter.charCodeAt() - 38;
}

let prioritiesTotal = 0;
let data;

try {
  data = fs.readFileSync("./day-3-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let rucksackArray = data.split("\r\n");
// console.log(rucksackArray);

for (let i = 0; i < rucksackArray.length; i += 3) {
  const currentString = rucksackArray[i];
  for (let j = 0; j < currentString.length; j++) {
    if (
      rucksackArray[i + 1].includes(currentString[j]) &&
      rucksackArray[i + 2].includes(currentString[j])
    ) {
      if (currentString[j] === currentString[j].toUpperCase()) {
        prioritiesTotal += uppercasePriority(currentString[j]);
        break;
      } else {
        prioritiesTotal += lowercasePriority(currentString[j]);
        break;
      }
    }
  }
}

console.log(`prioritiesTotal is: ${prioritiesTotal}`);
