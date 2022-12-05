/*
--- Day 5: Supply Stacks ---
The expedition can depart as soon as the final supplies have been unloaded from the ships. 
Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. 
To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. 
After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, 
and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). 
For example:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
In this example, there are three stacks of crates. 
Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. S
tack 2 contains three crates; from bottom to top, they are crates M, C, and D. 
Finally, stack 3 contains a single crate, P.

Then, the rearrangement procedure is given. 
In each step of the procedure, a quantity of crates is moved from one stack to a different stack. 
In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
In the second step, three crates are moved from stack 1 to stack 3. 
Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

        [Z]
        [N]
    [C] [D]
    [M] [P]
 1   2   3
Then, both crates are moved from stack 2 to stack 1. 
Again, because crates are moved one at a time, crate C ends up below crate M:

        [Z]
        [N]
[M]     [D]
[C]     [P]
 1   2   3
Finally, one crate is moved from stack 1 to stack 2:

        [Z]
        [N]
        [D]
[C] [M] [P]
 1   2   3
The Elves just need to know which crate will end up on top of each stack; 
in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.

After the rearrangement procedure completes, what crate ends up on top of each stack?

PLAN
Need to separate columns in to arrays (array of arrays?)
        Separate line in to crates for that row
        Calculate number of columns
        Iterate through crateRows
        Split crate rows by space
        Iterate through splitCrateRow
        Keep track of columns filled, whilst number of columns does not equal totalColumns:
        If current char is [ then need to take the 3 characters and push them to corresponding column and increment i by 3
        Use columns filled as index of crateColumns you want to push currentCrate to
Need to get a list of instructions
        Loop through lines
        If line starts with "m", it is a move
        Push to instructions array
Follow the instructions for each array - remember top value gets moved first, so use .pop() 
          Build an object with instructions in
          Apply instructions
Get the final value of each array and push it to a string with no spaces
        Need variable of empty string to add to
        Loop through array of arrays and take final value of each array, adding it to the string
        Return the string
*/

const fs = require("fs");

let data;

function extractInstructions(linesArray) {
  let instructionsArray = [];
  for (let i = 0; i < linesArray.length; i++) {
    if (linesArray[i].charAt(0) === "m") {
      instructionsArray.push(linesArray[i]);
    }
  }
  return instructionsArray;
}
function parseInstructions(instructionsArray) {
  let instructions = [];
  for (let i = 0; i < instructionsArray.length; i++) {
    let parsedInstruction = { moveNumber: 0, arrayFrom: 0, arrayTo: 0 };
    let currentInstruction = instructionsArray[i].split(" ");
    parsedInstruction.moveNumber = Number(currentInstruction[1]);
    parsedInstruction.arrayFrom = Number(currentInstruction[3]) - 1;
    parsedInstruction.arrayTo = Number(currentInstruction[5]) - 1;
    instructions.push(parsedInstruction);
  }
  return instructions;
}

function extractRows(linesArray) {
  let rowsArray = [];
  let i = 0;

  while (linesArray[i].includes("[")) {
    rowsArray.push(linesArray[i]);
    i++;
  }
  return rowsArray;
}
function getNumberOfColumns(rowsArray) {
  let spaces = 0;
  for (let i = 0; i < rowsArray[rowsArray.length - 1].length; i++) {
    if (rowsArray[rowsArray.length - 1].charAt(i) === " ") {
      spaces++;
    }
  }
  const totalColumns = (rowsArray[rowsArray.length - 1].length - spaces) / 3;
  return totalColumns;
}
function rowsToColumns(totalColumns, rowsArray) {
  // Creates array of arrays and populates with number of arrays needed (each array representing a column)
  const crateColumns = [];
  for (let i = 0; i < totalColumns; i++) {
    crateColumns.push([]);
  }
  // Parses rows and populates column arrays in reverse order
  for (let i = 0; i < rowsArray.length; i++) {
    let currentColumn = 1;
    let emptySpaces = 0;
    const splitCrateRow = rowsArray[i].split(" ");
    // console.log(splitCrateRow);
    for (let j = 0; j < splitCrateRow.length; j++) {
      // console.log(`Current element is: ${splitCrateRow[i]}`);
      if (splitCrateRow[j] === "") {
        emptySpaces++;
        // console.log(`Empty Spaces Total: ${emptySpaces}`);
      } else if (splitCrateRow[j] !== "") {
        // console.log(`Dealing with letter: ${splitCrateRow[j]}`);
        if (emptySpaces > 1) {
          const remainder = emptySpaces % 4;
          currentColumn += (emptySpaces - remainder) / 4;
        }
        // console.log(`Need to add ${splitCrateRow[j]} to column: ${currentColumn}`);
        crateColumns[currentColumn - 1].push(splitCrateRow[j]);
        currentColumn++;
        emptySpaces = 0;
      }
    }
    // console.log("Crates Columns:");
    // console.log(crateColumns);
  }
  // Corrects the order
  for (let i = 0; i < crateColumns.length; i++) {
    crateColumns[i].reverse();
  }
  return crateColumns;
}

try {
  data = fs.readFileSync("./day-5-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let linesArray = data.split("\r\n");
// console.log(linesArray);

const rowsArray = extractRows(linesArray);
// console.log("Rows Array:");
// console.log(rowsArray);
const totalColumns = getNumberOfColumns(rowsArray);
// console.log(`Total columns: ${totalColumns}`);

const columnsArray = rowsToColumns(totalColumns, rowsArray);

console.log("crateColumns");
console.log(columnsArray);

const extractedInstructions = extractInstructions(linesArray);
const parsedInstructions = parseInstructions(extractedInstructions);
// console.log(extractedInstructions);
console.log(parsedInstructions);

for (let i = 0; i < parsedInstructions.length; i++) {
  // console.log(`Current instruction is:`);
  // console.log(parsedInstructions[i]);
  for (let j = 0; j < parsedInstructions[i].moveNumber; j++) {
    const crateToMove = columnsArray[parsedInstructions[i].arrayFrom].pop();
    columnsArray[parsedInstructions[i].arrayTo].push(crateToMove);
  }
  // console.log("crateColumns after move");
  // console.log(columnsArray);
}

console.log("Ending crateColumns");
console.log(columnsArray);

let topCrateString = "";
for (let i = 0; i < totalColumns; i++) {
  if (columnsArray[i].length > 0) {
    topCrateString += columnsArray[i][[columnsArray[i].length - 1]];
  } else {
    topCrateString += " ";
  }
}

const parsedString = topCrateString.replace(/[\[\]]/gm, "");

console.log(parsedString);
