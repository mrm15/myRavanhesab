import {toast} from "react-toastify";

function stringContainsNumber(_string) {
  return /\d/.test(_string);
}

function copyObject(objectKeyValuePairs) {
  const temp = {};
  for (let tempElement in objectKeyValuePairs)
    temp[tempElement] = objectKeyValuePairs[tempElement]
  return temp;
}



const f = {
  stringContainsNumber,
  copyObject
}

export default f;