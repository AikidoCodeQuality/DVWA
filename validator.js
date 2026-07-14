function validateInput(input) {
  // Non-compliant: vulnerable to catastrophic backtracking (ReDoS)
  const regex = /^(a+)+$/;

  return regex.test(input);
}

module.exports = {
  validateInput,
};
