/**
 * XML Schema class is absctraction that helps to validate
 * Morphic Service DATA and COMMAND schemas.
 */

import { XMLValidator, XMLParser } from "fast-xml-parser";

export class XMLSchema {
  duplicates = [];

  constructor({ xml, type }) {
    (this.xml = typeof xml === "string" ? xml.toLowerCase() : ""),
      (this.type = typeof type === "string" ? type.toLowerCase() : ""); // RTW or CMD
  }

  get isValid() {
    return typeof XMLValidator.validate(this.xml) === "boolean";
  }

  get parsedXML() {
    if (!this.isValid) return {};
    const options = {
      ignoreAttributes: true
    };
    const parser = new XMLParser(options);
    return parser.parse(this.xml);
  }

  get hasRootTags() {
    return Object.prototype.hasOwnProperty.call(this.parsedXML, this.type);
  }

  get hasDuplicates() {
    return this.duplicates.length >= 1;
  }

  findDuplicates() {
    try {
      for (const [key, value] of Object.entries(this.parsedXML[this.type])) {
        if (Array.isArray(value)) this.duplicates.push(key);
      }
    } catch {
      return;
    }
  }
}
