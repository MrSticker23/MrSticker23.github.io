document.addEventListener('DOMContentLoaded', () => {
    // List of users and their passwords
    const users = {
        "user1": "password1",
        "user2": "password2",
        "user3": "password3"
    };

    // Currency for each user
    const userCurrency = {
        "user1": 100,
        "user2": 200,
        "user3": 50
    };

    const captchaQuestionElement = document.getElementById('captcha-question');
    const captchaAnswerElement = document.getElementById('captcha-answer');
    const errorMessage = document.getElementById('error-message');
    const passwordScreen = document.getElementById('password-screen');
    const mainPage = document.getElementById('main-page');
    const usernameDisplay = document.getElementById('username-display');
    const currencyDisplay = document.getElementById('currency-display');

    // Generate a simple math CAPTCHA
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    captchaQuestionElement.textContent = `What is ${num1} + ${num2}?`;

    document.getElementById('submit-button').addEventListener('click', function() {
        const enteredPassword = document.getElementById('password-input').value;
        const enteredUsername = document.getElementById('username-input').value; // Assuming you have an input for username
        const captchaAnswer = parseInt(captchaAnswerElement.value, 10);

        // Validate the username, password, and CAPTCHA
        if (users[enteredUsername] !== enteredPassword) {
            showError('Incorrect username or password.');
        } else if (captchaAnswer !== num1 + num2) {
            showError('CAPTCHA is incorrect.');
        } else {
            // Set the user info (username and currency)
            usernameDisplay.textContent = `Username: ${enteredUsername}`;
            currencyDisplay.textContent = `Currency: $${userCurrency[enteredUsername]}`;

            // Hide the password screen and show the main page
            passwordScreen.style.display = 'none';
            mainPage.style.display = 'block';

            // Show the main page smoothly
            setTimeout(() => {
                mainPage.style.opacity = '1';
            }, 10);
        }
    });

    // Function to show error messages
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Tab functionality (same as before)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked button and corresponding content
            button.classList.add('active');
            const tabContent = document.getElementById(button.getAttribute('data-tab'));
            tabContent.classList.add('active');
        });
    });
});
