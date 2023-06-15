export function random_id(length = 8) {
  // TESTED
  var temp_id = Math.random().toString(16).substr(2, length);
  var container = document.getElementById(temp_id);
  while (container != null) {
    temp_id = Math.random().toString(16).substr(2, length);
    container = document.getElementById(temp_id);
  }
  return temp_id;
}

export function validateEmail(email) {
  /*

  Return a validation of an email matched format

  Source : https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

  */
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export function debounce(func, timeout = 150){
  /*

  Allows to to debounce a function

  Source : https://www.freecodecamp.org/news/javascript-debounce-example/

  */
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}