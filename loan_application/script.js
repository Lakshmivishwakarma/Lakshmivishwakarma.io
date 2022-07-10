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
  if (email.length === 0) {
    alert("Please Enter Valid Email ID");
    return false;
  } else {
    // validate email pattern
    // https://regexr.com/
    const pattern = /\w+([.-\w])*[@]{1}(\w)+[.]{1}([.\w]){2,8}/;
    if (!pattern.test(email)) {
      alert("Invalid Email Format");
      return false;
    }
  }
  return true;
}

function validateName() {
  let name = document.getElementById("name").value;
  if (name.length === 0) {
    alert("Please Enter Valid name");
    return false;
  } else {
    const names = name.split(" ");
    if (names.length < 2) {
      alert("minimum 2 words required in full name");
      return false;
    } else if (names[0].length < 4 || names[1].length < 4) {
      alert("Each words should have minimum 4 character in full name ");
      return false;
    }
  }
  return true;
}

function validatePan() {
  let pan = document.getElementById("pan").value;
  if (pan.length === 0) {
    alert("Please Enter Valid PAN Number");
    // document.getElementById("pan").focus();
    return false;
  } else {
    // validate PAN pattern
    const pattern = /([a-zA-Z]){5}([0-9]{4})[A-Z]/;
    if (!pattern.test(pan)) {
      alert("Invalid PAN Format");
      return false;
    }
  }
  return true;
}

function validateLoanAmount() {
  let loanAmount = document.getElementById("loan_amount").value;
  if (loanAmount.length === 0) {
    alert("Please Enter Loan Amount");
    return false;
  } else if (loanAmount.length > 9) {
    alert("maximum loan amount allowed 999999999");
    return false;
  }
  return true;
}

function validateForm() {
  // validate all the fields if they are valid or not

  if (
    !validateName() ||
    !validateEmail() ||
    !validatePan() ||
    !validateLoanAmount()
  ) {
    alert("form values are invalid");
    newCaptcha();
    return false;
  }

  //validating captcha first

  const userCaptcha = document.getElementById("captchaAnswer").value;
  if (parseInt(userCaptcha) !== captchaFirst + captchaSecond) {
    alert("Invalid captcha");
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
