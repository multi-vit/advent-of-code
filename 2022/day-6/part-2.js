/*
--- Part Two ---
Your device's communication system is correctly detecting packets, but still isn't working. 
It looks like it also needs to look for messages.

A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.

Here are the first positions of start-of-message markers for all of the above examples:

mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26
How many characters need to be processed before the first start-of-message marker is detected?

PLAN
Refactor from part-1
Will work with 14 nested checks!?
*/

const fs = require("fs");

try {
  data = fs.readFileSync("./day-6-input.txt", "utf8");
  // console.log(data);
} catch (err) {
  console.error(err);
}

let packetMarker = 13;
for (let i = 13; i < data.length; i++) {
  packetMarker++;
  if (
    data[i] !== data[i - 1] &&
    data[i] !== data[i - 2] &&
    data[i] !== data[i - 3] &&
    data[i] !== data[i - 4] &&
    data[i] !== data[i - 5] &&
    data[i] !== data[i - 6] &&
    data[i] !== data[i - 7] &&
    data[i] !== data[i - 8] &&
    data[i] !== data[i - 9] &&
    data[i] !== data[i - 10] &&
    data[i] !== data[i - 11] &&
    data[i] !== data[i - 12] &&
    data[i] !== data[i - 13]
  ) {
    if (
      data[i - 1] !== data[i - 2] &&
      data[i - 1] !== data[i - 3] &&
      data[i - 1] !== data[i - 4] &&
      data[i - 1] !== data[i - 5] &&
      data[i - 1] !== data[i - 6] &&
      data[i - 1] !== data[i - 7] &&
      data[i - 1] !== data[i - 8] &&
      data[i - 1] !== data[i - 9] &&
      data[i - 1] !== data[i - 10] &&
      data[i - 1] !== data[i - 11] &&
      data[i - 1] !== data[i - 12] &&
      data[i - 1] !== data[i - 13]
    ) {
      if (
        data[i - 2] !== data[i - 3] &&
        data[i - 2] !== data[i - 4] &&
        data[i - 2] !== data[i - 5] &&
        data[i - 2] !== data[i - 6] &&
        data[i - 2] !== data[i - 7] &&
        data[i - 2] !== data[i - 8] &&
        data[i - 2] !== data[i - 9] &&
        data[i - 2] !== data[i - 10] &&
        data[i - 2] !== data[i - 11] &&
        data[i - 2] !== data[i - 12] &&
        data[i - 2] !== data[i - 13]
      ) {
        if (
          data[i - 3] !== data[i - 4] &&
          data[i - 3] !== data[i - 5] &&
          data[i - 3] !== data[i - 6] &&
          data[i - 3] !== data[i - 7] &&
          data[i - 3] !== data[i - 8] &&
          data[i - 3] !== data[i - 9] &&
          data[i - 3] !== data[i - 10] &&
          data[i - 3] !== data[i - 11] &&
          data[i - 3] !== data[i - 12] &&
          data[i - 3] !== data[i - 13]
        ) {
          if (
            data[i - 4] !== data[i - 5] &&
            data[i - 4] !== data[i - 6] &&
            data[i - 4] !== data[i - 7] &&
            data[i - 4] !== data[i - 8] &&
            data[i - 4] !== data[i - 9] &&
            data[i - 4] !== data[i - 10] &&
            data[i - 4] !== data[i - 11] &&
            data[i - 4] !== data[i - 12] &&
            data[i - 4] !== data[i - 13]
          ) {
            if (
              data[i - 5] !== data[i - 6] &&
              data[i - 5] !== data[i - 7] &&
              data[i - 5] !== data[i - 8] &&
              data[i - 5] !== data[i - 9] &&
              data[i - 5] !== data[i - 10] &&
              data[i - 5] !== data[i - 11] &&
              data[i - 5] !== data[i - 12] &&
              data[i - 5] !== data[i - 13]
            ) {
              if (
                data[i - 6] !== data[i - 7] &&
                data[i - 6] !== data[i - 8] &&
                data[i - 6] !== data[i - 9] &&
                data[i - 6] !== data[i - 10] &&
                data[i - 6] !== data[i - 11] &&
                data[i - 6] !== data[i - 12] &&
                data[i - 6] !== data[i - 13]
              ) {
                if (
                  data[i - 7] !== data[i - 8] &&
                  data[i - 7] !== data[i - 9] &&
                  data[i - 7] !== data[i - 10] &&
                  data[i - 7] !== data[i - 11] &&
                  data[i - 7] !== data[i - 12] &&
                  data[i - 7] !== data[i - 13]
                ) {
                  if (
                    data[i - 8] !== data[i - 9] &&
                    data[i - 8] !== data[i - 10] &&
                    data[i - 8] !== data[i - 11] &&
                    data[i - 8] !== data[i - 12] &&
                    data[i - 8] !== data[i - 13]
                  ) {
                    if (
                      data[i - 9] !== data[i - 10] &&
                      data[i - 9] !== data[i - 11] &&
                      data[i - 9] !== data[i - 12] &&
                      data[i - 9] !== data[i - 13]
                    ) {
                      if (
                        data[i - 10] !== data[i - 11] &&
                        data[i - 10] !== data[i - 12] &&
                        data[i - 10] !== data[i - 13]
                      ) {
                        if (
                          data[i - 11] !== data[i - 12] &&
                          data[i - 11] !== data[i - 13]
                        ) {
                          if (data[i - 12] !== data[i - 13]) {
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log(`Final packet marker is: ${packetMarker}`);
