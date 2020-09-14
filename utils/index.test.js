const { pairUp } = require("./index");

describe("pairUp()", () => {
  test("accepts an array of unique id's and returns an array of sub-arrays containing unique pairs", () => {
    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(pairUp(test)).toHaveLength(5);
  });
});
