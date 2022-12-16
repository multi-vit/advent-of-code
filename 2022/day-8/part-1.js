/*
--- Day 8: Treetop Tree House ---
The expedition comes across a peculiar patch of tall trees all planted carefully in a grid. The Elves explain that a previous expedition planted these trees as a reforestation effort. Now, they're curious if this would be a good location for a tree house.

First, determine whether there is enough tree cover here to keep a tree house hidden. To do this, you need to count the number of trees that are visible from outside the grid when looking directly along a row or column.

The Elves have already launched a quadcopter to generate a map with the height of each tree (your puzzle input). For example:

30373
25512
65332
33549
35390
Each tree is represented as a single digit whose value is its height, where 0 is the shortest and 9 is the tallest.

A tree is visible if all of the other trees between it and an edge of the grid are shorter than it. Only consider trees in the same row or column; that is, only look up, down, left, or right from any given tree.

All of the trees around the edge of the grid are visible - since they are already on the edge, there are no trees to block the view. In this example, that only leaves the interior nine trees to consider:

The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
The top-middle 5 is visible from the top and right.
The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
The left-middle 5 is visible, but only from the right.
The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
The right-middle 3 is visible from the right.
In the bottom row, the middle 5 is visible, but the 3 and 4 are not.
With 16 trees visible on the edge and another 5 visible in the interior, a total of 21 trees are visible in this arrangement.

Consider your map; how many trees are visible from outside the grid?

PLAN
Need variable to keep count of number of visible trees
Iterate through the rows of numbers and split by new line char - this gives us an array of strings representing each row
Increase count by length of first and last rows, plus (column length - 2) * 2
Iterate through middle rows (excluding first and last), using normal loop starting i at 1 and while i < .length - 1 (to exclude outer trees)
Check if tree is tallest compared to up, down, left and right trees (Math.max?):
    Up/Down - you will be using i for row number and then j for each charAt, so keep same charAt but check slices of 0 - i (trees above) and i to end (trees below)
    Left/Right - you will be using j for charAt so check slices of 0 - j (trees above) and j to end (trees below)
*/

const fs = require("fs");

try {
  data = fs.readFileSync("./day-8-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let visibleTrees = 0;

let forest = data.split("\r\n");
// console.log(forest);

// Increase count by length of first and last rows, plus (column length - 2) * 2
visibleTrees += forest[0].length;
visibleTrees += forest[forest.length - 1].length;
visibleTrees += (forest.length - 2) * 2;
// console.log(visibleTrees);

// Iterate through middle rows (excluding first and last), using normal loop starting i at 1 and while i < .length - 1 (to exclude outer trees)
for (let i = 1; i < forest.length - 1; i++) {
  // Split current row string in to an array for easier iteration
  let treeRow = forest[i].split("");
  //   console.log(treeRow);
  for (let j = 1; j < treeRow.length - 1; j++) {
    // console.log(`i = ${i} and j = ${j}`);
    // console.log(`Current number to check is ${treeRow[j]}`);
    let leftTrees = treeRow.slice(0, j);
    let rightTrees = treeRow.slice(j + 1, treeRow.length);
    let upTrees = [];
    for (let l = 0; l < i; l++) {
      upTrees.push(forest[l].charAt(j));
    }
    let downTrees = [];
    for (let l = i + 1; l < forest.length; l++) {
      downTrees.push(forest[l].charAt(j));
    }
    // console.log(`Left trees is: ${leftTrees}`);
    // console.log("Boolean check to the left:");
    // console.log(`Right trees is: ${rightTrees}`);
    // console.log("Boolean check to the right:");
    // console.log(`upTrees = ${upTrees}`);
    // console.log("Boolean check for above:");
    // console.log(`downTrees = ${downTrees}`);
    // console.log("Boolean check for below:");
    if (
      leftTrees.every((outerTree) => {
        return outerTree < treeRow[j];
      }) ||
      rightTrees.every((outerTree) => {
        return outerTree < treeRow[j];
      }) ||
      upTrees.every((outerTree) => {
        return outerTree < treeRow[j];
      }) ||
      downTrees.every((outerTree) => {
        return outerTree < treeRow[j];
      })
    ) {
      //   console.log("Tree is visible from outside");
      visibleTrees++;
    } else {
      //   console.log("Tree is NOT visible");
    }
  }
}

console.log(`Final count is ${visibleTrees}`);
