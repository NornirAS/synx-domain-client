export const requiredRule = (v, fieldName) => {
  return !!v || `${fieldName} is required.`;
};

export const lengthRule = (v, fieldName, maxLen) => {
  return (
    !v ||
    v.length <= maxLen ||
    `The length of ${fieldName} must be ${maxLen} characters or fewer.`
  );
};

export const smallerOrEqualRule = (v, fieldName, maxNum) => {
  return (
    parseInt(v) <= maxNum ||
    `The ${fieldName} value cannot be more than ${maxNum}.`
  );
};

export const biggerOrEqualRule = (v, fieldName, minNum) => {
  return (
    parseInt(v) >= minNum ||
    `The ${fieldName} value cannot be less than ${minNum}.`
  );
};

// Rule for {{subdomain}}.cioty.com or cioty.com/{{service}}
export const urlPartRule = (v, fieldName) => {
  return (
    /^[a-zA-Z0-9]{0,1}[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]$/.test(v) ||
    `The ${fieldName} can contain only alphanumeric characters and hyphen(-).`
  );
};

export const ghostUriRule = (v, fieldName) => {
  return (
    /^([a-zA-Z0-9-]+?)(?=\.)\.cioty.com(?=\/)\/([a-zA-Z0-9-]+?)(?=##)##\d+$/.test(
      v
    ) || `The ${fieldName} is not valid.`
  );
};

export const emptyOrAlphanumericRule = (v, fieldName) => {
  return (
    !v ||
    /^[A-Za-z0-9]+$/g.test(v) ||
    `The ${fieldName} can contain only alphanumeric characters.`
  );
};
