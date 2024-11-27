document.addEventListener('DOMContentLoaded', () => {
    const correctPassword = 'mypassword'; // Set your correct password here
    const captchaQuestionElement = document.getElementById('captcha-question');
    const captchaAnswerElement = document.getElementById('captcha-answer');
    const errorMessage = document.getElementById('error-message');

    // Generate a simple math CAPTCHA
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    captchaQuestionElement.textContent = `What is ${num1} + ${num2}?`;

    document.getElementById('submit-button').addEventListener('click', function() {
        const password = document.getElementById('password-input').value;
        const captchaAnswer = parseInt(captchaAnswerElement.value, 10);

        // Validate both password and CAPTCHA
        if (password !== correctPassword) {
            showError('Incorrect password.');
        } else if (captchaAnswer !== num1 + num2) {
            showError('CAPTCHA is incorrect.');
        } else {
            errorMessage.style.display = 'none';
            document.getElementById('password-screen').style.display = 'none';
            const loadingScreen = document.getElementById('loading-screen');
            loadingScreen.style.display = 'flex';

            setTimeout(() => {
                loadingScreen.classList.add('show');
            }, 10);

            setTimeout(() => {
                loadingScreen.classList.remove('show');
                loadingScreen.style.display = 'none';
                const mainPage = document.getElementById('main-page');
                mainPage.style.display = 'block';
                setTimeout(() => {
                    mainPage.style.opacity = '1';
                }, 10);
            }, 2000);
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Tab functionality
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
