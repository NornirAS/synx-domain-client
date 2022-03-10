/* eslint-disable no-undef */
import { assert } from "chai";
import { isEmpty, isJsonString } from "./object.js";

const objects = ["string", 7, { a: 1 }, ["a", "b"]];
const emptyObjects = [null, undefined, "", {}, []];

describe("isEmpty", () => {
  it("return false if object is not empty", () => {
    objects.forEach(obj => {
      assert.isFalse(isEmpty(obj));
    });
  });
  it("return true if empty object", () => {
    emptyObjects.forEach(obj => {
      assert.isTrue(isEmpty(obj));
    });
  });
});

describe("isJsonString", () => {
  it("return true if JSON string", () => {
    const jsonString = JSON.stringify({ a: 1 });
    assert.isTrue(isJsonString(jsonString));
  });
  it("return false if not JSON string", () => {
    objects.forEach(obj => {
      assert.isFalse(isJsonString(obj));
    });
  });
});
