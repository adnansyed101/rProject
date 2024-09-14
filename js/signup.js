// Event listener for the sign-up button
document
  .querySelector(".sign-up-button")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Retrieve form values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const universityId = document.getElementById("university-id").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();
    const passwordStrengthMessage = document.getElementById(
      "password-strength-message"
    );
    const passwordStrengthIndicator = document.getElementById(
      "password-strength-indicator"
    );

    // Check if all fields are filled
    if (
      !firstName ||
      !lastName ||
      !email ||
      !universityId ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Check if the email is a valid ULAB email address
    if (email.slice(-12) !== "@ulab.edu.bd") {
      alert("Please enter a valid ULAB email address.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check password strength
    const strength = checkPasswordStrength(password);
    if (!strength.isValid) {
      alert(
        "Your password is too weak. Please follow the requirements to make it strong."
      );
      passwordStrengthMessage.textContent = `Requirements: ${strength.requirements.join(
        ", "
      )}`;
      passwordStrengthIndicator.style.backgroundColor = "red";
      return;
    } else {
      passwordStrengthIndicator.style.backgroundColor = strength.color;
    }

    // Redirect to index page
    window.location.href = "index.html";
  });

// Function to check password strength
function checkPasswordStrength(password) {
  let strength = { isValid: false, color: "red", requirements: [] };

  if (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    strength.isValid = true;
    strength.color = "green";
  } else {
    if (password.length < 12)
      strength.requirements.push("at least 12 characters");
    if (!/[A-Z]/.test(password))
      strength.requirements.push("at least one uppercase letter");
    if (!/\d/.test(password)) strength.requirements.push("at least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      strength.requirements.push("at least one special character");

    if (password.length >= 8) {
      strength.color = "yellow";
    }
  }

  return strength;
}

// Real-time password strength checking
document.getElementById("password").addEventListener("input", function () {
  const password = this.value.trim();
  const strength = checkPasswordStrength(password);
  const passwordStrengthMessage = document.getElementById(
    "password-strength-message"
  );
  const passwordStrengthIndicator = document.getElementById(
    "password-strength-indicator"
  );

  if (strength.isValid) {
    passwordStrengthMessage.textContent = "Password is strong.";
  } else {
    passwordStrengthMessage.textContent = `Requirements: ${strength.requirements.join(
      ", "
    )}`;
  }

  passwordStrengthIndicator.style.backgroundColor = strength.color;
});

// Toggle password visibility
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    this.classList.toggle("fa-eye-slash");
  });

document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    const confirmPasswordInput = document.getElementById("confirm-password");
    const type = confirmPasswordInput.type === "password" ? "text" : "password";
    confirmPasswordInput.type = type;
    this.classList.toggle("fa-eye-slash");
  });
