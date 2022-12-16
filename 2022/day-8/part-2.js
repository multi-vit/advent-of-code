/*
--- Part Two ---
Content with the amount of tree cover available, the Elves just need to know the best spot to build their tree house: they would like to be able to see a lot of trees.

To measure the viewing distance from a given tree, look up, down, left, and right from that tree; stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration. (If a tree is right on the edge, at least one of its viewing distances will be zero.)

The Elves don't care about distant trees taller than those found by the rules above; the proposed tree house has large eaves to keep it dry, so they wouldn't be able to see higher than the tree house anyway.

In the example above, consider the middle 5 in the second row:

30373
25512
65332
33549
35390
Looking up, its view is not blocked; it can see 1 tree (of height 3).
Looking left, its view is blocked immediately; it can see only 1 tree (of height 5, right next to it).
Looking right, its view is not blocked; it can see 2 trees.
Looking down, its view is blocked eventually; it can see 2 trees (one of height 3, then the tree of height 5 that blocks its view).
A tree's scenic score is found by multiplying together its viewing distance in each of the four directions. For this tree, this is 4 (found by multiplying 1 * 1 * 2 * 2).

However, you can do even better: consider the tree of height 5 in the middle of the fourth row:

30373
25512
65332
33549
35390
Looking up, its view is blocked at 2 trees (by another tree with a height of 5).
Looking left, its view is not blocked; it can see 2 trees.
Looking down, its view is also not blocked; it can see 1 tree.
Looking right, its view is blocked at 2 trees (by a massive tree of height 9).
This tree's scenic score is 8 (2 * 2 * 1 * 2); this is the ideal spot for the tree house.

Consider each tree on your map. What is the highest scenic score possible for any tree?

PLAN
Refactor variable to keep track of highest tree visibility
Refactor loops to:
Work from inside out for leftTrees and upTrees (currently outside in for these 2)
Still exclude outer trees as they will have 0s in them, only use inner trees
Include count for each view, start each count at 1 as you will always see adjacent tree
Check in each direction and break when outerTree is >= to currentTree
Multiplies the 4 view values together
Checks that against current highest tree visibility
At the end, highest tree visibility should be correct answer
*/

const fs = require("fs");

try {
  data = fs.readFileSync("./day-8-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let highestVisibleTrees = 0;

let forest = data.split("\r\n");
// console.log(forest);

// Iterate through middle rows (excluding first and last), using normal loop starting i at 1 and while i < .length - 1 (to exclude outer trees)
for (let i = 1; i < forest.length - 1; i++) {
  // Split current row string in to an array for easier iteration
  let treeRow = forest[i].split("");
  //   console.log(treeRow);
  for (let j = 1; j < treeRow.length - 1; j++) {
    // console.log(`i = ${i} and j = ${j}`);
    // console.log(`Current number to check is ${treeRow[j]}`);
    let leftTrees = treeRow.slice(0, j).reverse();
    let rightTrees = treeRow.slice(j + 1, treeRow.length);
    let upTrees = [];
    for (let k = 0; k < i; k++) {
      upTrees.push(forest[k].charAt(j));
    }
    upTrees.reverse();
    let downTrees = [];
    for (let l = i + 1; l < forest.length; l++) {
      downTrees.push(forest[l].charAt(j));
    }
    let leftView = 0;
    let rightView = 0;
    let upView = 0;
    let downView = 0;
    for (let m = 0; m < leftTrees.length; m++) {
      leftView++;
      if (leftTrees[m] >= treeRow[j]) {
        break;
      }
    }
    // console.log(`leftView = ${leftView}`);
    for (let n = 0; n < rightTrees.length; n++) {
      rightView++;
      if (rightTrees[n] >= treeRow[j]) {
        break;
      }
    }
    // console.log(`rightView = ${rightView}`);
    for (let p = 0; p < upTrees.length; p++) {
      upView++;
      if (upTrees[p] >= treeRow[j]) {
        break;
      }
    }
    // console.log(`upView = ${upView}`);
    for (let q = 0; q < downTrees.length; q++) {
      downView++;
      if (downTrees[q] >= treeRow[j]) {
        break;
      }
    }
    // console.log(`downView = ${downView}`);
    let viewsTotal = leftView * rightView * upView * downView;
    // console.log(`viewsTotal = ${viewsTotal}`)
    if (viewsTotal > highestVisibleTrees) {
      console.log(`Replacing highestVisibleTrees with ${viewsTotal}`);
      highestVisibleTrees = viewsTotal;
    }
  }
}

console.log(`Final count is ${highestVisibleTrees}`);
