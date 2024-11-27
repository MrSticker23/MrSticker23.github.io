document.getElementById('submit-button').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    const correctPassword = 'mypassword'; // Set your correct password here

    if (password === correctPassword) {
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('loading-screen').style.display = 'flex';

        // Simulate loading delay
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            const mainPage = document.getElementById('main-page');
            mainPage.style.display = 'block';
            setTimeout(() => {
                mainPage.style.opacity = '1';
            }, 10);
        }, 2000); // 2-second loading delay
    } else {
        alert('Incorrect password');
    }
});
