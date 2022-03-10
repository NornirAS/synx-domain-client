/* eslint-disable no-undef */
import { assert } from "chai";
import { uniqValuesArray } from "./array.js";

describe("getDuplicateFreeArray", () => {
  it("return array with no duplicates", () => {
    const array = [1, 2, 2, 2, 3, 4, 4, 5, 5];
    const uniq = uniqValuesArray(array);
    assert.sameMembers(uniq, [1, 2, 3, 4, 5]);
  })
  it("return empty array if argument is not an array", () => {
    const uniq = uniqValuesArray(undefined);
    assert.sameMembers(uniq, []);
  })
});
