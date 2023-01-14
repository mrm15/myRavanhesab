function stringContainsNumber(_string) {
  return /\d/.test(_string);
}

function copyObject(objectKeyValuePairs) {
  const temp = {};
  for (let tempElement in objectKeyValuePairs)
    temp[tempElement] = objectKeyValuePairs[tempElement]
  return temp;
}

function onlyLettersAndNumbers(str) {
  return /^[A-Za-z0-9]*$/.test(str);
}
function onlyNumbers(str) {
  return /^[0-9]*$/.test(str);
}




function hasBadCharacter(srt) {
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return format.test(srt)
}


const f = {
  onlyNumbers,
  hasBadCharacter,
  onlyLettersAndNumbers,
  stringContainsNumber,
  copyObject
}

export default f;