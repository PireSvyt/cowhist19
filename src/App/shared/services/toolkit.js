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
