

function toWords(n) {
  let inWords = "";
  const inStr = n.toString();
  const digits = inStr.split("");
  console.log(digits);

  if (digits.length < 3 && n < 20) {
    inWords = a[n];
    return inWords;
  }
  else if (digits.length < 3 && n >= 20) {
    inWords = b[parseInt(digits[0])] + ' ' + a[parseInt(digits[1])];
    return inWords;
  } else if (digits.length < 4) {
    inWords = a[parseInt(digits[0])] + ' hundred ' + b[parseInt(digits[1])] + ' ' + a[parseInt(digits[2])];
    return inWords;
  } else if (digits.length < 6) {
    inWords = a[parseInt(digits[0])] + 'thousand';
    
    inWords += digits[1] != 0 ?   a[parseInt(digits[1])] + ' hundred ': '';
    inWords += digits[2] != 0 ?   a[parseInt(digits[1])] + ' hundred ': '';

    
    // + b[parseInt(digits[2])] + ' ' + a[parseInt(digits[3])];
    return inWords;
  }



  return inWords;
}

// console.log(toWords(1));
// console.log(toWords(10));
// console.log(toWords(19));
// console.log(toWords(21));
// console.log(toWords(99));
// console.log(toWords(100));
// console.log(toWords(120));
console.log(toWords(121));
console.log(toWords(1000));
console.log(toWords(1029));

