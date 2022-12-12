/*
--- Day 7: No Space Left On Device ---
You can hear birds chirping and raindrops hitting leaves as the expedition proceeds. 
Occasionally, you can even hear much louder sounds in the distance; how big do the animals get out here, anyway?

The device the Elves gave you has problems with more than just its communication system. You try to run a system update:

$ system-update --please --pretty-please-with-sugar-on-top
Error: No space left on device
Perhaps you can delete some files to make space for the update?

You browse around the filesystem to assess the situation and save the resulting terminal output (your puzzle input). 
For example:

$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
The filesystem consists of a tree of files (plain data) and directories (which can contain other directories or files). 
The outermost directory is called /. You can navigate around the filesystem, 
moving into or out of directories and listing the contents of the directory you're currently in.

Within the terminal output, lines that begin with $ are commands you executed, very much like some modern computers:

cd means change directory. This changes which directory is the current directory, but the specific result depends on the argument:
cd x moves in one level: it looks in the current directory for the directory named x and makes it the current directory.
cd .. moves out one level: it finds the directory that contains the current directory, then makes that directory the current directory.
cd / switches the current directory to the outermost directory, /.
ls means list. It prints out all of the files and directories immediately contained by the current directory:
123 abc means that the current directory contains a file named abc with size 123.
dir xyz means that the current directory contains a directory named xyz.
Given the commands and output in the example above, you can determine that the filesystem looks visually like this:

- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
Here, there are four directories: / (the outermost directory), a and d (which are in /), and e (which is in a). 
These directories also contain files of various sizes.

Since the disk is full, your first step should probably be to find directories that are good candidates for deletion. 
To do this, you need to determine the total size of each directory. 
The total size of a directory is the sum of the sizes of the files it contains, directly or indirectly. 
(Directories themselves do not count as having any intrinsic size.)

The total sizes of the directories above can be found as follows:

The total size of directory e is 584 because it contains a single file i of size 584 and no other directories.
The directory a has total size 94853 because it contains files f (size 29116), g (size 2557), and h.lst (size 62596), 
plus file i indirectly (a contains e which contains i).
Directory d has total size 24933642.
As the outermost directory, / contains every file. Its total size is 48381165, the sum of the size of every file.
To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes. 

In the example above, these directories are a and e; the sum of their total sizes is 95437 (94853 + 584). 
(As in this example, this process can count files more than once!)

Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?

PLAN
Need to keep track of directories:
    Object? Then can have nested objects as sub directories?
    Assume / is overall object
    If dir, add the letters of the directory to the object?
Need to handle commands (if line starts with $):
    cd = variable to keep track of where we are and could use to access object? e.g. let cd = /a/e
    ls = doesn't really do anything other than tell us to expect a list of things contained inside current dir 
    (if dir, add letters as new key of nested object, else add number to value of existing object)
Need to find sizes of files, add together (if applicable) and set as value of directory keys. Don't forget to add to parent directory totals too
Need grand total variable
Iterate through all directories and if less than 100,000, add it to grand total 
*/

const fs = require("fs");

try {
  data = fs.readFileSync("./day-7-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let directorySizes = { home: 0 };
let grandTotal = 0;
let currentDirectory = ["home"];

let commands = data.split("\r\n");
// console.log(commands);

//TODO
// Works for test file but not for input file!
// Need to account for nested directories with the same name

for (let i = 1; i < commands.length; i++) {
  //   console.log(`Current command is ${commands[i]}`);
  let commandSplit = commands[i].split(" ");
  // Handle changing directory
  if (commandSplit[1] === "cd") {
    // console.log(`Directory to change to should be ${commandSplit[commandSplit.length - 1]}`);
    if (commandSplit[commandSplit.length - 1] === "..") {
      // console.log(`.. = Move up a level`);
      currentDirectory.pop();
      // console.log(`Current directory is now: ${currentDirectory}`);
    } else {
      currentDirectory.push(commandSplit[commandSplit.length - 1]);
      // console.log(`Current directory is now: ${currentDirectory}`);
    }
  }
  // Skip if command is "ls", although this may have use in future (and may be important!)
  else if (commandSplit[1] === "ls") {
    // console.log(`ls command, skipping`);
    continue;
  }
  // Handle adding new directories to the structure sizes object
  else if (commandSplit[0] === "dir") {
    // console.log(`Directory to add should be ${commandSplit[commandSplit.length - 1]}`);
    if (!(commandSplit[commandSplit.length - 1] in directorySizes)) {
      //   console.log(`New directory not already in:`);
      //   console.table(directorySizes);
      directorySizes[commandSplit[commandSplit.length - 1]] = 0;
      //   console.log(`Should now be added:`);
      //   console.table(directorySizes);
    }
  }
  // Handle adding file sizes to current directories
  else if (typeof Number(commandSplit[0]) === "number") {
    // console.log(`Total to add to current directory is: ${parseInt(commandSplit[0])}`);
    for (let j = 0; j < currentDirectory.length; j++) {
      directorySizes[currentDirectory[j]] += Number(commandSplit[0]);
      //   console.table(directorySizes);
    }
  } else {
    console.log(`Unhandled situation: ${commands[i]}`);
  }
}

// Loop through directories and if less than or equal to 100,000 then add it to grant total
for (const directory in directorySizes) {
  if (directorySizes[directory] <= 100000) {
    grandTotal += directorySizes[directory];
  }
}

console.log("Final structure sizes:");
console.table(directorySizes);

// Is home the sum of all other directories?
let subTotalDirectories = 0;
for (const directory in directorySizes) {
  if (directorySizes[directory] !== "home") {
    subTotalDirectories += directorySizes[directory];
  }
}

console.log(grandTotal);
