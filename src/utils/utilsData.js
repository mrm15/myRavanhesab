import f from "./UtilsFunction";


export default f;

export const addApiUrlToLocalStorage = () => {
  if (window.location.hostname !== "localhost") {
    localStorage.setItem(
      "apiUrl",
      "https://my.ravanhesab.com/myRavanhesab/"
    );
  } else {
    localStorage.setItem("apiUrl",
      "http://localhost/myRavanhesabBackend"
      // "https://my.ravanhesab.com/myRavanhesab/"

    );
  }
};

export const prefixUrl = () => {
  if (
    localStorage.getItem("apiUrl") === null ||
    localStorage.getItem("apiUrl") === undefined
  ) {
    addApiUrlToLocalStorage();
  }
  return localStorage.getItem("apiUrl");
};