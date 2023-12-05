
const ONLY_NUMBER = { pattern: /^[0-9]*$/, message: 'is not a valid number!' };
const PHONE = { pattern: /^04+[0-9]{8}$/, message: 'The phone number is 04 and has 10 digits' };

const NumberValidations = {
  ONLY_NUMBER,
  PHONE,
};
export default NumberValidations;
