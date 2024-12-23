document.addEventListener('DOMContentLoaded', () => {
    // Initialize user data
    const correctPassword = 'mypassword';
    const userName = 'User123';
    let userCurrency = {
        type: 'Coins',
        amount: 1000
    };

    // CAPTCHA elements
    const captchaQuestionElement = document.getElementById('captcha-question');
    const captchaAnswerElement = document.getElementById('captcha-answer');
    const errorMessage = document.getElementById('error-message');
    const usernameDisplay = document.getElementById('username-display');
    const currencyDisplay = document.getElementById('currency-display');

    // Generate CAPTCHA
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    captchaQuestionElement.textContent = `What is ${num1} + ${num2}?`;

    // On Submit
    document.getElementById('submit-button').addEventListener('click', function () {
        const password = document.getElementById('password-input').value;
        const captchaAnswer = parseInt(captchaAnswerElement.value, 10);

        // Validate password and CAPTCHA
        if (password !== correctPassword) {
            showError('Incorrect password.');
        } else if (captchaAnswer !== num1 + num2) {
            showError('CAPTCHA is incorrect.');
        } else {
            errorMessage.style.display = 'none';
            document.getElementById('password-screen').style.display = 'none';

            // Show loading screen
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.style.display = 'flex';
            setTimeout(() => {
                loadingScreen.classList.add('show');
            }, 10);

            setTimeout(() => {
                loadingScreen.classList.remove('show');
                loadingScreen.style.display = 'none';

                // Show main page
                const mainPage = document.getElementById('main-page');
                mainPage.style.display = 'block';
                setTimeout(() => {
                    mainPage.style.opacity = '1';

                    // Update username and currency
                    usernameDisplay.textContent = userName;
                    currencyDisplay.textContent = `${userCurrency.amount} ${userCurrency.type}`;
                }, 10);
            }, 2000);
        }
    });

    // Error message display
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabContents.forEach((content) => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.getAttribute('data-tab')).classList.add('active');
        });
    });
});
