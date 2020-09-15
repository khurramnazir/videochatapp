const { pairUp } = require("./index");

describe("pairUp()", () => {
  test("accepts an array of even length and returns an array of sub-arrays containing unique pairs", () => {
    const test1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const test2 = [
      {name:"bob", id:"ihvbd", type:"admin"}, 
      {name:"dave", id:"higvih", type:"user"}, 
      {name:"lauren", id:"yufcy", type:"user"}, 
      {name:"Sophie", id:"sjhdoks", type:"admin"}, 
      {name:"Pete", id:"djkbidf", type:"user"}, 
      {name:"James", id:"lkjdkj", type:"admin"}
    ];
    expect(pairUp(test1)).toHaveLength(5);
    expect(pairUp(test2)).toHaveLength(3);
  });
  test("accepts an array of odd length and returns an array of sub-arrays containing unique pairs and one three", () => {
    const test1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const test2 = [
    {name:"bob", id:"ihvbd", type:"admin"}, 
    {name:"dave", id:"higvih", type:"user"}, 
    {name:"lauren", id:"yufcy", type:"user"}, 
    {name:"Sophie", id:"sjhdoks", type:"admin"}, 
    {name:"Pete", id:"djkbidf", type:"user"}
    ]; 
    expect(pairUp(test1)).toHaveLength(4);
    expect(pairUp(test2)).toHaveLength(2);
  });
  test("returns single person when passed a single ", () => {
    const test3 = [1]
    expect(pairUp(test3)).toEqual([[1]]);
  });
  test("doesnt mutate the original array", () => {
    const test1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(test1).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});


const output = [[1,2],[3,4]]
