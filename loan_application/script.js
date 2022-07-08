let captchaFirst = Math.floor(1 + Math.random() * 10);
console.log(captchaFirst);

let captchaSecond = Math.floor(1 + Math.random() * 10);
console.log(captchaSecond);
// displaying captcha values on UI
document.getElementById("firstNumber").innerHTML = captchaFirst;
document.getElementById("secondNumber").innerHTML = captchaSecond;
function validateForm() {
  //validating captcha first

  const userCaptcha = document.getElementById("captchaAnswer").value;
  if (parseInt(userCaptcha) !== captchaFirst + captchaSecond) {
    alert("Invalid captcha");
    return false;
  }
  //get data from form
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pan = document.getElementById("pan").value;
  let loanAmount = document.getElementById("loan_amount").value;
  // validate data
  if (name.length === 0) {
    alert("Please Enter Valid name");
    return false;
  }else{
    const names=name.split(" ");
    if(names.length<2){
        alert("mainimum 2 words required in full name")
        return false;
    }else if(names[0].length<4 || names[1].length<4) {
alert ("Each words should have minimum 4 character in full name ")
return false;

    }

  }
  if (email.length === 0) {
    alert("Please Enter Valid Email ID");
    return false;
  }
  if (pan.length === 0) {
    alert("Please Enter Valid PAN Number");
    return false;
  }
  if (loanAmount.length === 0) {
    alert("Please Enter Loan Amount");
    return false;
  } else if (loanAmount.length > 9) {
    alert ("maximum loan amount allowed 999999999")
    return false;
  }

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
