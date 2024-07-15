document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const existingAlert = document.getElementById('error-message');
    if (existingAlert) {
        existingAlert.remove();
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            window.location.href = '/user';
        } else {
            // document.getElementById('error-text').innerText = data.message;
            // document.getElementById('error-message').classList.add('show');

            const errorAlert = document.createElement('div');
            errorAlert.setAttribute('id', 'error-message');
            errorAlert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');
            errorAlert.setAttribute('role', 'alert');

            const errorMessage = document.createElement('span');
            errorMessage.innerText = data.message;

            const closeButton = document.createElement('button');
            closeButton.classList.add('btn-close');
            closeButton.setAttribute('data-bs-dismiss', 'alert');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('aria-label', 'Close');
            closeButton.addEventListener('click', function () {
                errorAlert.remove();
            });

            errorAlert.appendChild(errorMessage);
            errorAlert.appendChild(closeButton);

            const formContainer = document.getElementById('login-form');
            formContainer.appendChild(errorAlert);

            document.getElementById('username').value = '';
            document.getElementById('password').value = '';

        }
    } catch (error) {
        document.getElementById('error-text').innerText = 'An error occurred.';
        document.getElementById('error-message').classList.add('show');

    }
});

