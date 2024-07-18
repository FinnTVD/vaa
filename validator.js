// const formElement = document.getElementById("formElement");
// email
// const email = document.getElementById("email");
// const mess_validator_email = document.getElementById("mess_validator_email");

function validateEmail(item) {
  const input = document.getElementById(item.id);
  const err = document.getElementById(item?.error);
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidator = re.test(String(input.value).toLowerCase());
  if (!emailValidator) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền đúng định dạng email của bạn";
    input?.classList.add("input_validator");
    return false;
  } else {
    err.style.display = "none";
    input?.classList.remove("input_validator");
    return true;
  }
}
// selected
function selected() {
  const dropdown_container = document.querySelectorAll(".dropdown_container");
  dropdown_container.forEach((item) => {
    const dropdownHeader = item.querySelector(".dropdown_header");
    const dropdownList = item.querySelector(".dropdown_list");
    const dropdown_header_svg = item.querySelector("#dropdown_header_svg");

    const dropdownItems = item.querySelectorAll(".dropdown_item");
    const selectedOption = item.querySelector(".selected-option");
    dropdownHeader?.addEventListener("click", () => {
      dropdownList.style.display =
        dropdownList.style.display === "none" ||
        dropdownList.style.display === ""
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
        selectedOption.style.color = "#3f3f3f";
        dropdownList.style.display = "none";
        dropdown_header_svg.style.transform = "rotate(0deg)";
      });
    });
    document.addEventListener("click", (event) => {
      if (
        !dropdownHeader?.contains(event.target) &&
        !dropdownList?.contains(event.target)
      ) {
        if (dropdownList) {
          dropdownList.style.display = "none";
          dropdown_header_svg.style.transform = "rotate(0deg)";
        }
      }
    });
  });
}
selected();
function validateSelected(item) {
  const selected = document.getElementById(item.id);
  const err = document.getElementById(item?.error);
  if (!selected) {
    return true;
  }
  if (selected && !selected.getAttribute("data-value")) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền trông tin này";
    selected.parentElement.classList.add("input_validator");
    return false;
  } else {
    err.style.display = "none";
    selected.parentElement.classList.remove("input_validator");
    return true;
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

function validatePass(item) {
  const passwordInput = document.getElementById(item.id);
  const err = document.getElementById(item.error);
  const passwordRetype = document.getElementById(item.idRetype);
  const errRetype = document.getElementById(item.errorRetype);

  if (item?.valueCharacters && specialCharPattern.test(passwordInput.value)) {
    err.style.display = "none";
    passwordInput.classList.remove("input_validator");
  }
  if (passwordInput.value.length === 0) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để trống";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (item?.minlength && passwordInput.value.length < item?.minlength) {
    err.style.display = "flex";
    err.querySelector(
      ".mess_validator_text"
    ).textContent = `Mật Khẩu phải ít nhất ${item?.minlength} ký tự`;
    passwordInput.classList.add("input_validator");
    return false;
  } else if (spacePattern.test(passwordInput.value)) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để khoảng trắng";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (item?.characters && specialCharPattern.test(passwordInput.value)) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để ký tự đặc biệt";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (
    item?.valueCharacters &&
    !specialCharPattern.test(passwordInput.value)
  ) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu bắt buộc có ít nhất 1 ký tự đặc biệt";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (item?.uppercase && uppercasePattern.test(passwordInput.value)) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Mật Khẩu không được để chữ viết hoa";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (item?.pass && passwordInput.value !== item?.pass) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "mật khẩu cũ không đúng";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (item?.oldpass && passwordInput.value === item?.oldpass) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "mật khẩu mới không được trùng với mật khẩu cũ";
    passwordInput.classList.add("input_validator");
    return false;
  } else if (passwordRetype && passwordInput.value !== passwordRetype.value) {
    if (errRetype) {
      errRetype.style.display = "none";
      passwordRetype.classList.remove("input_validator");
    }
    err.style.display = "none";
    passwordInput.classList.remove("input_validator");
    errRetype.style.display = "flex";
    errRetype.querySelector(".mess_validator_text").textContent =
      "Nhập lại mật khẩu không khớp với mật khẩu";
    passwordRetype.classList.add("input_validator");
    return false;
  } else {
    if (errRetype) {
      errRetype.style.display = "none";
      passwordRetype.classList.remove("input_validator");
    }
    err.style.display = "none";
    passwordInput.classList.remove("input_validator");
    return true;
  }
}
// radio
// const mess_validator_radio = document.getElementById("mess_validator_radio");
function validateRadio(item, valueRadio) {
  const err = document.getElementById(item?.error);
  if (!valueRadio) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền thông tin này";
    return false;
  } else {
    err.style.display = "none";
    return valueRadio;
  }
}
// text
function validateText(item) {
  const input = document.getElementById(item.id);
  const err = document.getElementById(item?.error);
  if (!input) {
    return true;
  }
  if (input?.value) {
    input.classList.remove("input_validator");
    err.style.display = "none";
    return input.value;
  } else {
    input?.classList.add("input_validator");
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền thông tin này";
    return false;
  }
}
// phone
function validatePhone(item) {
  const input = document.getElementById(item.id);
  const err = document.getElementById(item?.error);
  const checked = document.getElementById(item?.checked);
  if (!input) {
    return true;
  }
  var phonePattern = /^[0-9]{10}$/;
  if (item?.checked && checked?.getAttribute("data-value") === "false") {
    input.value = "";
    return true;
  }
  if (!phonePattern.test(input.value)) {
    input.classList.add("input_validator");
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Vui lòng điền đúng định dạng số điện thoại";
    return false;
  } else {
    input.classList.remove("input_validator");
    err.style.display = "none";
    return true;
  }
}
// checkbox
function validateCheckbox(item) {
  const input = document.getElementById(item.id);
  const err = document.getElementById(item?.error);
  if (!input) {
    return true;
  }
  if (!input.checked) {
    err.style.display = "flex";
    err.querySelector(".mess_validator_text").textContent =
      "Vùi lòng đọc điều khoản trước khi đang ký";
    return false;
  } else {
    err.style.display = "none";
    return true;
  }
}
function onSubmitForm(option) {
  var formElement = option?.form;
  formElement.onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(formElement);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    var isValidate = true;
    option?.input?.forEach((item, index) => {
      if (item?.type === "text") {
        if (!validateText(item)) {
          isValidate = false;
        }
      }
      if (item?.type === "email") {
        if (!validateEmail(item)) {
          isValidate = false;
        }
      }
      if (item?.type === "radio") {
        if (!validateRadio(item, formObject?.[item?.id])) {
          isValidate = false;
        }
      }
      if (item?.type === "phone") {
        if (!validatePhone(item)) {
          isValidate = false;
        }
      }
      if (item?.type === "selected") {
        if (!validateSelected(item)) {
          isValidate = false;
        }
      }
      if (item?.type === "password") {
        if (!validatePass(item)) {
          isValidate = false;
        }
      }
      if (item?.type === "checkbox") {
        if (!validateCheckbox(item)) {
          isValidate = false;
        }
      }
    });
    if (isValidate) {
      option?.selected?.forEach((item, index) => {
        const value = document.getElementById(item).getAttribute("data-value");
        formObject[item] = value.trim().replace(/\n/g, "");
      });
      console.log(formObject);
      if (option.function) {
        option.function(formObject);
      }
    }
  };
}
