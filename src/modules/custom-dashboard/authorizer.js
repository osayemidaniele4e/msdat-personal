const authorizedApprovers = [
  'ebele-muolokwu.nonso@e4email.net',
  'doosuur.gyer@e4email.net',
];

export default (email) => authorizedApprovers.includes(email) || email?.endsWith('@e4email.net');
