/*
--- Part Two ---
As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.

Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.

Again considering the example above, the crates begin in the same configuration:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
Moving a single crate from stack 2 to stack 1 behaves the same as before:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, 
resulting in this new configuration:

        [D]
        [N]
    [C] [Z]
    [M] [P]
 1   2   3
Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:

        [D]
        [N]
[C]     [Z]
[M]     [P]
 1   2   3
Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:

        [D]
        [N]
        [Z]
[M] [C] [P]
 1   2   3
In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.

Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. 
After the rearrangement procedure completes, what crate ends up on top of each stack?

PLAN
Refactor from part-1
If moveNumber > 1, pop values off into new array, reverse them and concat to arrayTo
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
  if (parsedInstructions[i].moveNumber === 1) {
    const crateToMove = columnsArray[parsedInstructions[i].arrayFrom].pop();
    columnsArray[parsedInstructions[i].arrayTo].push(crateToMove);
  } else {
    let cratesToMove = [];
    for (let j = 0; j < parsedInstructions[i].moveNumber; j++) {
      cratesToMove.push(columnsArray[parsedInstructions[i].arrayFrom].pop());
    }
    cratesToMove.reverse();
    columnsArray[parsedInstructions[i].arrayTo] =
      columnsArray[parsedInstructions[i].arrayTo].concat(cratesToMove);
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
