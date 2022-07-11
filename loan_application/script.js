let captchaFirst;
let captchaSecond;
newCaptcha();

function newCaptcha() {
  captchaFirst = Math.floor(1 + Math.random() * 10);
  console.log(captchaFirst);
  captchaSecond = Math.floor(1 + Math.random() * 10);
  console.log(captchaSecond);
  // displaying captcha values on UI
  document.getElementById("firstNumber").innerHTML = captchaFirst;
  document.getElementById("secondNumber").innerHTML = captchaSecond;
}

function validateEmail() {
  let email = document.getElementById("email").value;
  let inputEmail=  document.getElementById("emailValidation")
  if (email.length === 0) {
    inputEmail.style.display = "block";
    inputEmail.innerHTML = "*Please Enter Valid Email ID*";

    return false;
  } else {
    // validate email pattern
    // https://regexr.com/
    const pattern = /\w+([.-\w])*[@]{1}(\w)+[.]{1}([.\w]){2,8}/;
    if (!pattern.test(email)) {
      inputEmail.style.display = "block";
      inputEmail.innerHTML = "*Invalid Email Format*";
      // alert("Invalid Email Format");
      return false;
    }
  }

  inputEmail.style.display = "block";
  inputEmail.innerHTML ="";

  return true;
}

function validateName() {
  let name = document.getElementById("name").value;
  let inputName = document.getElementById("nameValidation");

  if (name.length === 0) {
    inputName.style.display = "block";
    inputName.innerHTML = "*Please Enter Valid name*";
    return false;
  } else {

    const names = name.split(" ");
    if (names.length < 2) {
      inputName.innerHTML = "**minimum 2 words required in full name**";
      inputName.style.display = "block";
      return false;
    } else if (names[0].length < 4 || names[1].length < 4) {
      inputName.style.display = "block";
      inputName.innerHTML = "**Each words should have minimum 4 character in full name**";

      return false;
    }
  }
  inputName.style.display = "none";
  inputName.innerHTML = "";

  return true;

} // function ends

// validate pan function start
function validatePan() {
  let pan = document.getElementById("pan").value;
  let inputPan = document.getElementById("panValidation");
  if (pan.length === 0) {
    inputPan.innerHTML = "**Please Enter Valid PAN Number**";
    inputPan.style.display = "block";

    return false;
  } else {
    // validate PAN pattern
    const pattern = /([a-zA-Z]){5}([0-9]{4})[A-Z]/;
    if (!pattern.test(pan)) {
      inputPan.innerHTML = "**Invalid PAN Format**";
      inputPan.style.display = "block";
      return false;
    }
  }
  inputPan.style.display = "none";
  inputPan.innerHTML = "";
  return true;
} // function ends

// validate loan amount function start
function validateLoanAmount() {
  let loanAmount = document.getElementById("loan_amount").value;
  let inputLoanAmount=document.getElementById("loanAmountValidation");
  if (loanAmount.length === 0) {

    inputLoanAmount.innerHTML = "**Please Enter Loan Amount**";
    inputLoanAmount.style.display = "block";
    // alert("Please Enter Loan Amount");
    return false;
  }else if(loanAmount <0 ){
    inputLoanAmount.innerHTML = "**Enter positive number**"; 
    inputLoanAmount.style.display = "block";

  }
  else if (loanAmount.length > 9) {
    inputLoanAmount.innerHTML = "**maximum loan amount allowed 999999999**";
    inputLoanAmount.style.display = "block";
    // alert("maximum loan amount allowed 999999999");
    return false;
  }
  convertNumToWord();
  inputLoanAmount.style.display = "none";
  inputLoanAmount.innerHTML = "";
  return true;
}

// function ends

function validateForm() {
  // validate all the fields if they are valid or not

  if (
    !validateName() ||
    !validateEmail() ||
    !validatePan() ||
    !validateLoanAmount()
  ) {
    newCaptcha();
    return false;
  }

  //validating captcha first

  const userCaptcha = document.getElementById("captchaAnswer").value;
  let inputcaptcha=document.getElementById("captchaValidation");
  if (parseInt(userCaptcha) !== captchaFirst + captchaSecond) {
    inputcaptcha.style.display = "block";
    inputcaptcha.innerHTML = "**Invalid captcha**";
    return false;
  }
      



  //get data from form

  // if success then return true else return false

  let person = {
    name,
    email,
    pan,
    loanAmount,
  };
  console.log(person);
  return true;
}


// learned from stackoverflow
function convertNumToWord(){
  document.getElementById("words").innerHTML= toWords(document.getElementById("loan_amount").value);
}

function toWords(num) {
  const a = [
    "",
    " one ",
    " two ",
    " three ",
    " four ",
    " five ",
    " six ",
    " seven ",
    " eight ",
    " nine ",
    " ten ",
    " eleven ",
    " twelve ",
    " thirteen ",
    " fourteen ",
    " fifteen ",
    " sixteen ",
    " seventeen ",
    " eighteen ",
    " nineteen ",
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  let inWords;
  if (num.toString().length > 9) {
    return "max limit reached";
  }
  // appending 000000000 to the original numbers
  let str = ("000000000" + num).slice(-9);
  let n = str.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  console.log(n);
  str = (n[1] != 0) ? (a[parseInt(n[1])] || b[parseInt(n[1][0])] + a[parseInt(n[1][1])]) + 'crore ' : '';
  str += (n[2] != 0) ? (a[parseInt(n[2])] || b[parseInt(n[2][0])] + a[parseInt(n[2][1])]) + ' lakh ' : "";
  str += (n[3] != 0) ? (a[parseInt(n[3])] || b[parseInt(n[3][0])] + a[parseInt(n[3][1])]) + 'Thousand ' : "";
  str += (n[4] != 0) ?  (a[parseInt(n[4])] ) + ' hundred ' : "";
  str += (n[5] != 0) ? (a[parseInt(n[5])] || b[parseInt(n[5][0])] + a[parseInt(n[5][1])]) : "";

  inWords= str?  str +" Rs. only ": '';
  return inWords.toUpperCase();
}
