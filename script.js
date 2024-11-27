document.getElementById('submit-button').addEventListener('click', function() {
    const password = document.getElementById('password-input').value;
    const correctPassword = 'mypassword'; // Set your correct password here

    if (password === correctPassword) {
        document.getElementById('password-screen').style.display = 'none';
        
        // Show the loading screen with a slight delay to ensure rendering
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'flex';
        setTimeout(() => {
            loadingScreen.classList.add('show');
        }, 10); // Delay to trigger CSS animations

        // Simulate loading delay
        setTimeout(() => {
            loadingScreen.classList.remove('show');
            loadingScreen.style.display = 'none';
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


// Tab navigation
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding tab content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});
