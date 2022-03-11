/**
 * XML Schema class is absctraction that helps to validate
 * Morphic Service DATA and COMMAND schemas.
 */

import { XMLValidator, XMLParser, XMLBuilder } from "fast-xml-parser";

export class XMLSchema {
  duplicates = [];

  constructor({ xml, type }) {
    this.xml = typeof xml === "string" ? xml.toLowerCase() : "";
    this.type = typeof type === "string" ? type.toLowerCase() : ""; // RTW or CMD
  }

  get isValid() {
    return typeof XMLValidator.validate(this.xml) === "boolean";
  }

  get parsed() {
    if (!this.isValid) return {};
    const options = {
      ignoreAttributes: false
    };
    const parser = new XMLParser(options);
    return parser.parse(this.xml);
  }

  get singleLine() {
    return this.buildXML(false);
  }

  get formated() {
    return this.buildXML(true);
  }

  get hasRootTags() {
    return Object.prototype.hasOwnProperty.call(this.parsed, this.type);
  }

  get hasDuplicates() {
    return this.duplicates.length >= 1;
  }

  findDuplicates() {
    try {
      for (const [key, value] of Object.entries(this.parsed[this.type])) {
        if (Array.isArray(value)) this.duplicates.push(key);
      }
    } catch {
      return;
    }
  }

  buildXML(format) {
    const options = {
      ignoreAttributes: false,
      format
    };
    const builder = new XMLBuilder(options);
    return builder.build(this.parsed);
  }
}
