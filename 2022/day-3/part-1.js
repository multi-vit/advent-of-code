/*
--- Day 3: Rucksack Reorganization ---
One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. 
Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

The list of items for each rucksack is given as characters all on a single line. 
A given rucksack always has the same number of items in each of its two compartments, 
so the first half of the characters represent items in the first compartment, 
while the second half of the characters represent items in the second compartment.

For example, suppose you have the following list of contents from six rucksacks:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
The fourth rucksack's compartments only share item type v.
The fifth rucksack's compartments only share item type t.
The sixth rucksack's compartments only share item type s.
To help prioritize item rearrangement, every item type can be converted to a priority:

Lowercase item types a through z have priorities 1 through 26.
Uppercase item types A through Z have priorities 27 through 52.
In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

PLAN
Variable to keep track of total ✅
Need some way of tracking priorities - use an algorithm with character code and abstract in to function? ✅
Split the input file in to an array ✅
Remove any trailing \r or \n if needed ✅
Iterate through the array ✅
Split the string into two halves ✅
Iterate through each character in first string and use .includes() method to check if second string has it ✅
If second string has it, check if letter is uppercase - comparison with str.toUpperCase() if returns true it is uppercase ✅
Call relevant priority function and add result to total ✅
Print total at the end ✅
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

for (let i = 0; i < rucksackArray.length; i++) {
  let firstHalfString = rucksackArray[i].slice(0, rucksackArray[i].length / 2);
  let secondHalfString = rucksackArray[i].slice(rucksackArray[i].length / 2);
  //   console.log(firstHalfString);
  //   console.log(secondHalfString);
  for (let i = 0; i < firstHalfString.length; i++) {
    if (secondHalfString.includes(firstHalfString[i])) {
      if (firstHalfString[i] === firstHalfString[i].toUpperCase()) {
        prioritiesTotal += uppercasePriority(firstHalfString[i]);
        break;
      } else {
        prioritiesTotal += lowercasePriority(firstHalfString[i]);
        break;
      }
    }
  }
}

console.log(`prioritiesTotal is: ${prioritiesTotal}`);
