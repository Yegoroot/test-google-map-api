Императивный стиль:

function double (arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2);
  }
  return results;
}

Декларативный стиль:

function double (arr) {
  return arr.map((item) => item * 2);
}