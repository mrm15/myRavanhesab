/** Convert a 2D array into a CSV string
 */

const mySpecialString = "--------------------------------------";
const arrayToCsv = (data) => {
  return data.map(row => row
    .map(String)  // convert every value to String
    .map(v => v.replaceAll('"', '""'))  // escape double colons
    .map(v => `"${v}"`)  // quote it
    .join(',')  // comma-separated
  ).join('\r\n');  // rows starting on new lines
}

const stringifyObjectsOfArrayAndJoin = (data) => {

  const temp = data.map(v => {
    if (typeof (v) === 'object') return JSON.stringify(v);
    return v;
  })
  return temp.join(mySpecialString);
  // return data.toString();
}
const stringToArray = (str) => {
  const arr = str.split("------");
  return arr;
}
/** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
const downloadBlob = (content, filename, contentType) => {
  // Create a blob
  let blob = new Blob([content], {type: contentType});
  let url = URL.createObjectURL(blob);

  // Create a link to download it
  let pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
}
const encodeToAscii = (str) => {
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i) + " ";
    newStr += code
  }
  //debugger
  return newStr;
}

const decodeFromAscii = (str) => {
  //debugger
  const array = str.split(" ");

  let decodeStr = '';
  for (let i = 0; i < array.length; i++) {
    let de = String.fromCharCode(array[i]);
    decodeStr += de
  }
  // decodeStr= decodeStr.replaceAll(" ","");
  decodeStr = decodeStr.replaceAll("\x00", "");
  return decodeStr;
}

const makeReadyToDownloadFile = (arrayObjects, fileName, suffix = "") => {
  let str = stringifyObjectsOfArrayAndJoin(arrayObjects);
  str = encodeToAscii(str);
  suffix && (fileName += "." + suffix)
  downloadBlob(str, fileName, 'text/csv;charset=utf-8;')
}


const makeReadyToTableConfigFromUpload = (text) => {
  let temp = decodeFromAscii(text)
  temp = temp.split(mySpecialString);
  // temp.forEach(v => {
  //   v = JSON.parse(v)
  //   //debugger
  // })
  const newArray = temp.map(v => JSON.parse(v))
  //debugger
  return newArray;


}

const removeComma = (input) => {
  if (!input) {
    return ""
  }
  if (typeof input === 'number') {
    input += ""
  }
  return input.replaceAll(",", "")
}
const nullToZero = (input) => (input === null ? 0 : input);
const copyToClipBoard = (txt) => {
  navigator.clipboard.writeText(txt)
}

const generateCaptchaCode = () => {
  // captcha
  let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
  let first = alphabets[Math.floor(Math.random() * alphabets.length)];
  let second = Math.floor(Math.random() * 10);
  let third = Math.floor(Math.random() * 10);
  let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
  let sixth = Math.floor(Math.random() * 10);
  return first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString() + sixth.toString();
};


const hasBadCharacters = (inputText) => {
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return format.test(inputText)
}

const replacePlusWithTwoZeros = (value) => {
  value = value.replace("+", "00")
  return value;
}
const replaceTimesWithThreeZeros = (value) => {
  value = value.replace("*", "000")
  return value;
}

const replacePlusAndTimesWithZeros = (value) => {
  value = replacePlusWithTwoZeros(value);
  value = replaceTimesWithThreeZeros(value);
  return value
}
const randomNumberGenerator = () => Math.random() * 10000000000

const addUniqId = (object) => {

  const temp = {...object};
  temp.uniqId = randomNumberGenerator();
  return temp;
}

const jalaliMonth = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const giveMonthByNumber = (string) => {

  if (isNaN(parseInt(string))) {
    return ""
  }

  return jalaliMonth[(parseInt(string) - 1)]
}

const fishIdChanger = (object) => {

  const newObject = {};
  for (let key in object) {
    if (key === "11") newObject.name = object[key]      // آقا/خانم
    if (key === "12") newObject.salary = object[key]      // حقوق ماه
    if (key === "13") newObject.accountNumber = object[key]     // شماره حساب
    if (key === "14") newObject.jobTitle = object[key]      // شغل
    if (key === "15") newObject.education = object[key]     // تحصیلات
    if (key === "16") newObject.daysOfWork = object[key]      // کارکرد
    if (key === "17") newObject.requestDate = object[key]     // تاریخ درخواست
    if (key === "18") newObject.startWorkDate = object[key]      // تاریخ شروع به کار
    if (key === "19") newObject.jobReward = object[key] // مزد شغل      // مزد شغل
    if (key === "20") newObject.workerBen = object[key]     // بن کارگری
    if (key === "21") newObject.workerHousing = object[key]      // حق مسکن
    if (key === "22") newObject.workerPost = object[key]      // حق پست
    if (key === "23") newObject.workerChild = object[key]     // حق اولاد
    if (key === "24") newObject.workerMission = object[key]      // حق ماموریت
    if (key === "25") newObject.overTime = object[key]      // اضافه کار
    if (key === "26") newObject.otherRewards = object[key]     // سایر پاداش ها
    if (key === "27") newObject.workerInsurance = object[key]     // حق بیمه سهم کارگر
    if (key === "28") newObject.workerTax = object[key]     // مالیات
    if (key === "29") newObject.workerVam = object[key]     // قسط وام
    if (key === "30") newObject.workerKosurat = object[key]     // سایر کسورات
    if (key === "31") newObject.helpful = object[key]     // مساعده
    if (key === "32") newObject.lifeInsurance = object[key]     // بیمه عمر و حوادث
    if (key === "33") newObject.workerOtherBime = object[key]     // بیمه مکمل درمان
    if (key === "34") newObject.workerInsuranceCEO = object[key]   // بیمه سهم کارفرما
    if (key === "35") newObject.sanavat = object[key] // سنوات
    if (key === "36") newObject.title = object[key] // عنوان فیش حقوقی
  }
  return newObject;
}
const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
const utilsFunction = {
  fileToDataUri,
  fishIdChanger,
  jalaliMonth,
  giveMonthByNumber,
  replacePlusAndTimesWithZeros,
  replaceTimesWithThreeZeros,
  replacePlusWithTwoZeros,
  downloadBlob,
  arrayToCsv,
  encodeToAscii,
  decodeFromAscii,
  stringToArray,
  makeReadyToDownloadFile,
  makeReadyToTableConfigFromUpload,
  removeComma,
  nullToZero,
  copyToClipBoard,
  generateCaptchaCode,
  hasBadCharacters,
  randomNumberGenerator,
  addUniqId

}
export default utilsFunction

