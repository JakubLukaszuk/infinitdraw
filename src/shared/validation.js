export const checkValidity = (value, rules) => {
  let validity = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    validity = value.trim() !== '' && validity;
  }
  if (rules.minLength) {
    validity = value.length >= rules.minLength;
    if (!validity)
      return validity
  }
  if (rules.maxLength) {
    validity = value.length <= rules.maxLength;
    if (!validity)
      return validity
  }
  if (rules.isEmail) {
    const pattern = /\S+@\S+\.\S+/;
    validity = pattern.test(value) && validity;
  }
  return validity;
}

export const checkStringEquality = (str1, str2) => {
  return str1.trim() === str2.trim()
}
