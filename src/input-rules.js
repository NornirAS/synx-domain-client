export const requiredRule = (v, fieldName) => {
  return !!v || `${fieldName} is required.`;
};

export const lengthRule = (v, fieldName, maxLen) => {
  return (
    (v && v.length) <= maxLen ||
    `The length of ${fieldName} must be ${maxLen} characters or fewer.`
  );
};

export const subDomainRule = (v, fieldName) => {
  return (
    /^[a-zA-Z0-9]{0,1}[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]$/.test(v) ||
    `The ${fieldName} can contain only alphanumeric characters and hyphen(-).`
  );
};

export const emptyOrAlphanumericRule = (v, fieldName) => {
  return (
    !v ||
    /^[A-Za-z0-9]+$/g.test(v) ||
    `The ${fieldName} can contain only alphanumeric characters`
  );
};
