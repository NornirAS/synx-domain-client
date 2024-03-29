// Check if JSON string
export const isJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Check if Base64 string
export const isBase64String = encoded => {
  try {
    atob(encoded);
  } catch (e) {
    return false;
  }
  return true;
};

// Return array of unique values from two arrays
export const arrayUniqValues = (arr1, arr2) => {
  return arr1.filter(obj => {
    return arr2.indexOf(obj) == -1;
  });
};

// Create xml schema from object
export const getXml = (obj, main) => {
  const xmlTagsArray = [];
  for (const value of Object.values(obj)) {
    if (value.length > 0) {
      const xmlTag = `<${value}></${value}>\n`;
      xmlTagsArray.push(xmlTag);
    }
  }
  return `<${main}>\n${xmlTagsArray.join("")}</${main}>`;
};

// Return array of schema elements names
export const getXmlElementNames = xml => {
  const xmlElements = xml.replace(/<RTW|CMD>|<\/(.*?)>/g, "").match(/<(.*?)>/g);
  return xmlElements.map(el => {
    return el.replace(/<|>/g, "");
  });
};
