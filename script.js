const validPasswords = ["password1", "password2", "password3"]; // Add your multiple passwords here
const passwordInput = document.getElementById("password-input");
const submitButton = document.getElementById("submit-button");
const errorMessage = document.getElementById("error-message");
const loadingScreen = document.getElementById("loading-screen");
const mainContent = document.getElementById("main-content");
const passwordContainer = document.getElementById("password-container");

submitButton.addEventListener("click", () => {
  const enteredPassword = passwordInput.value;

  if (validPasswords.includes(enteredPassword)) {
    passwordContainer.style.display = "none";
    errorMessage.style.display = "none";
    loadingScreen.style.display = "block";

    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainContent.style.display = "block";
    }, 3000);
  } else {
    errorMessage.style.display = "block";
    passwordInput.value = "";
  }
});
