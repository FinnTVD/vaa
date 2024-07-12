const formElement = document.getElementById("formElement");
// email
const email = document.getElementById("email");
const mess_validator_email = document.getElementById("mess_validator_email");

function validateEmail(emailValue) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidator = re.test(String(emailValue).toLowerCase());
  if (!emailValidator) {
    mess_validator_email.style.display = "flex";
    mess_validator_email.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền đúng định dạng email của bạn";
    email?.classList.add("input_validator");
    return false;
  } else {
    mess_validator_email.style.display = "none";
    email?.classList.remove("input_validator");
    return true;
  }
}
// selected
const dropdownHeader = document.querySelector(".dropdown_header");
const dropdownList = document.querySelector(".dropdown_list");
const selectedOption = document.getElementById("selected-option");
const dropdown_header_svg = document.getElementById("dropdown_header_svg");
const dropdownItems = document.querySelectorAll(".dropdown_item");
const mess_validator_selected = document.getElementById(
  "mess_validator_selected"
);

dropdownHeader.addEventListener("click", () => {
  dropdownList.style.display =
    dropdownList.style.display === "none" || dropdownList.style.display === ""
      ? "block"
      : "none";
  dropdown_header_svg.style.transform =
    dropdown_header_svg.style.transform === "rotate(0deg)" ||
    dropdown_header_svg.style.transform === ""
      ? "rotate(180deg)"
      : "rotate(0deg)";
});

dropdownItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    selectedOption.textContent = event.target.textContent;
    selectedOption.setAttribute("data-value", event.target.textContent);
    dropdownList.style.display = "none";
    dropdown_header_svg.style.transform = "rotate(0deg)";
  });
});

document.addEventListener("click", (event) => {
  if (
    !dropdownHeader.contains(event.target) &&
    !dropdownList.contains(event.target)
  ) {
    dropdownList.style.display = "none";
    dropdown_header_svg.style.transform = "rotate(0deg)";
  }
});
function validateSelected() {
  if (selectedOption && !selectedOption.getAttribute("data-value")) {
    mess_validator_selected.style.display = "flex";
    mess_validator_selected.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền trông tin này";
    dropdownHeader.classList.add("input_validator");
    return false;
  } else {
    mess_validator_selected.style.display = "none";
    dropdownHeader.classList.remove("input_validator");
    return selectedOption.getAttribute("data-value");
  }
}
// otp
const inputs = document.querySelectorAll(".otp-input");
const mess_validator_otp = document.getElementById("mess_validator_otp");

inputs.forEach((input, index) => {
  let isComposing = false;

  input.addEventListener("compositionstart", () => {
    isComposing = true;
  });

  input.addEventListener("compositionend", () => {
    isComposing = false;
    handleInput(input, index);
  });

  input.addEventListener("input", () => {
    if (!isComposing) {
      handleInput(input, index);
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && index > 0 && input.value.length === 0) {
      inputs[index - 1].focus();
    }
  });
});

function handleInput(input, index) {
  input.value = input.value.replace(/[^0-9]/g, "");

  if (input.value.length === 1 && index < inputs.length - 1) {
    inputs[index + 1].focus();
  }
}
function validateOtp() {
  const otp = Array.from(inputs)
    .map((input) => input.value)
    .join("");
  if (otp === "123456") {
    mess_validator_otp.style.display = "none";
    return true;
  } else {
    mess_validator_otp.style.display = "flex";
    mess_validator_otp.querySelector(".mess_validator_text").textContent =
      "Sai OTP vui lòng điền đúng otp bạn nhận được";
    return false;
  }
}
// pass
const passwordInput = document.getElementById("password");
const mess_validator_pass = document.getElementById("mess_validator_pass");
const mess_validator_passRetype = document.getElementById(
  "mess_validator_passRetype"
);
const passwordRetype = document.getElementById("passwordRetype");
var specialCharPattern = /[^a-zA-Z0-9]/;
var spacePattern = /\s/;
var uppercasePattern = /[A-Z]/;

const wrappers = document.querySelectorAll(".sig_input_warpperpass");
wrappers.forEach((wrapper) => {
  const eyeX = wrapper.querySelector(".eye_x");
  const eye = wrapper.querySelector(".eye");
  const passwordInput = wrapper.querySelector(".input_pass");

  eyeX.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeX.style.display = "none";
      eye.style.display = "block";
    }
  });

  eye.addEventListener("click", function () {
    if (passwordInput.type === "text") {
      passwordInput.type = "password";
      eye.style.display = "none";
      eyeX.style.display = "block";
    }
  });
});

function validatePass({
  minlength,
  uppercase = false,
  characters = false,
  valueCharacters = false,
  retype = false,
}) {
  if (!minlength) {
    console.log("chưa có minlength là một số", minlength);
    return false;
  } else if (minlength < 0) {
    console.log("minlength không được bé hơn không", minlength);
    return false;
  } else if (characters && valueCharacters) {
    console.log(
      "characters và valueCharacters không được cùng hoạt động =>",
      "characters:" + characters,
      "valueCharacters" + valueCharacters
    );
  } else if (retype && !passwordRetype) {
    console.log("chưa thấy input nhập lại xem lại xem");
  }
  if (passwordInput.value.length === 0) {
    mess_validator_pass.style.display = "flex";
    mess_validator_pass.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để trống";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (passwordInput.value.length < minlength) {
    mess_validator_pass.style.display = "flex";
    mess_validator_pass.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu phải ít nhất 6 ký tự";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (spacePattern.test(passwordInput.value)) {
    mess_validator_pass.style.display = "flex";
    mess_validator_pass.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để khoảng trắng";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (characters && specialCharPattern.test(passwordInput.value)) {
    mess_validator_pass.style.display = "flex";
    mess_validator_pass.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để ký tự đặc biệt";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (valueCharacters && !specialCharPattern.test(passwordInput.value)) {
    mess_validator_pass.style.display = "flex";
    mess_validator_pass.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu bắt buộc có ít nhất 1 ký tự đặc biệt";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (uppercase && uppercasePattern.test(passwordInput.value)) {
    mess_validator_pass.style.display = "flex";
    mess_validator_pass.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để chữ viết hoa";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (passwordInput.value !== passwordRetype.value) {
    mess_validator_passRetype.style.display = "flex";
    mess_validator_passRetype.querySelector(
      ".mess_validator_text"
    ).textContent = "Nhập lại mật khẩu không khớp với mật khẩu";
    passwordRetype.classList.add("input_validator");
    return false;
  } else {
    mess_validator_passRetype.style.display = "none";
    mess_validator_pass.style.display = "none";
    passwordInput.classList.remove("input_validator");
    passwordRetype.classList.remove("input_validator");
    return true;
  }
}
// radio
const mess_validator_radio = document.getElementById("mess_validator_radio");
function validateRadio(valueRadio) {
  if (!valueRadio) {
    mess_validator_radio.style.display = "flex";
    mess_validator_radio.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền thông tin này";
    return false;
  } else {
    mess_validator_radio.style.display = "none";
    return valueRadio;
  }
}
//submits
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(formElement);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  console.log(formObject);
  validateEmail(formObject?.email);
  validateOtp();
  validatePass({
    minlength: 6,
    uppercase: true,
    valueCharacters: true,
    retype: true,
  });
  validateSelected();
  validateRadio(formObject?.radio_group);
  console.log(validateRadio(formObject?.radio_group));
});
