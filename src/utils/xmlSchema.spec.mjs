/* eslint-disable no-undef */
import { assert } from "chai";
import { XMLSchema } from "./xmlSchema.mjs";

describe("XMLSchema", () => {
  describe("isValid", () => {
    it("return false if XML is not valid", () => {
      const xml = "";
      const xmlSchema = new XMLSchema({ xml, type: "RTW" });
      assert.isFalse(xmlSchema.isValid);
    });
  });

  describe("parsedXML", () => {
    it("return empty object if xml is not valid", () => {
      const xml = "";
      const xmlSchema = new XMLSchema({ xml, type: "rtw" });
      assert.isEmpty(xmlSchema.parsed);
    });
  });

  describe("hasRootTags", () => {
    it("return false if RTW root tags are missing", () => {
      const xml = "<CMD><TXT></TXT></CMD>";
      const xmlSchema = new XMLSchema({ xml, type: "rtw" });
      assert.isFalse(xmlSchema.hasRootTags);
    });
  });

  describe("hasDuplicates", () => {
    it("return false if duplicates are missing", () => {
      const xml = "<RTW><TXT></TXT></RTW>";
      const xmlSchema = new XMLSchema({ xml, type: "rtw" });
      xmlSchema.findDuplicates();
      assert.isFalse(xmlSchema.hasDuplicates);
    });
  });

  describe("findDuplicates", () => {
    it("return true if duplicates added into array", () => {
      const xml = "<CMD><TXT></TXT><TXT></TXT></CMD>";
      const xmlSchema = new XMLSchema({ xml, type: "cmd" });
      xmlSchema.findDuplicates();
      assert.isTrue(xmlSchema.hasDuplicates);
    });
  });

  describe("singleLineXML", () => {
    it("equal to initial xml to lower case", () => {
      const xml = "<CMD><TXT></TXT></CMD>";
      const xmlSchema = new XMLSchema({ xml, type: "cmd" });
      assert.strictEqual(xml.toLowerCase(), xmlSchema.singleLine);
    });
  });

  describe("formatedXML", () => {
    it("not equal to initial xml to lower case", () => {
      const xml = "<CMD><TXT></TXT></CMD>";
      const xmlSchema = new XMLSchema({ xml, type: "cmd" });
      assert.notEqual(xml.toLowerCase(), xmlSchema.formated);
    });
  });
});
