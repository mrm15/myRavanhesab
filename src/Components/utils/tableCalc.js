import str from "./StringFunctions";
import commaSeparator from "./CommaSeparator";

const sum = (values, data, calcParams) => {
  return commaSeparator(values.reduce((acc, value) => acc + +value, 0));
};

const separateNumbers = (cell, formatterParams, onRendered) => {
  let temp= cell.getValue()
  if(temp.includes(",")){
    temp = temp.replaceAll(",","");
  }
  return commaSeparator(temp);
}
function addSeparator(cols,fields){

  if (fields !== undefined) {
    if (fields.length > 0) {
      for (let col of cols) {
        if (fields.includes(col.field)) {
          col.formatter = tableCalc.separateNumbers;
          col.topCalc = tableCalc.sum;
          // col.topCalc = "sum";
        }
      }
    }
  }



}

const tableCalc = {
  sum,
  separateNumbers,
  addSeparator,
};

export default tableCalc;
