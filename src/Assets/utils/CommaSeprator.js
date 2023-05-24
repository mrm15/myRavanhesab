import NumericFunction from "./NumericFunction";
import utilsFunction from "./utilsFunction";

const commaSeparator = (input) => {
  if (typeof input === "string" && input[0] === "(" && input[input.length - 1] === ")") {
    debugger
    input = Array.from(input);
    input.pop();
    input.shift();
    input = +input.toString().replaceAll(",", "")

    return "(" + Number(input).toLocaleString() + ")"
  }
  if (isNaN(+input)) {
    return input
  }

  return Number(input).toLocaleString()
}
// 3 Number Separator
// const separator = x => x + "".replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export default commaSeparator;


export const parseToEnRemoveComma = (inputWithCommaAndPersianNumber) => {
  if (typeof inputWithCommaAndPersianNumber !== "string") {
    inputWithCommaAndPersianNumber += "";
  }
  const t = NumericFunction.p2e(utilsFunction.removeComma(inputWithCommaAndPersianNumber));

  return t
}

export const formatToPersianAddComma = (number) => {
  const t = ("" + NumericFunction.e2p((commaSeparator(number) + "")))

  return t
}
