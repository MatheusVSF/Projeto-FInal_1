const API_URL = "http://localhost:3000";

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const message = document.getElementById('message');

    loginForm.classList.toggle('active');
    cadastroForm.classList.toggle('active');
    message.style.display = 'none';
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = 'block';

    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Login realizado com sucesso! Redirecionando...', 'success');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        } else {
            showMessage(data.erro || 'Erro ao fazer login', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Erro ao conectar com o servidor', 'error');
    }
});

document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;
    const senha = document.getElementById('cadastro-senha').value;
    const classe = document.getElementById('cadastro-classe').value;

    if (senha.length < 6) {
        showMessage('A senha deve ter no mínimo 6 caracteres', 'error');
        return;
    }

    if (!email.includes('@')) {
        showMessage('Email inválido', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/user/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ nome, email, senha, classe })
        });

        const data = await response.json();

        if (response.ok || response.status === 201) {
            showMessage('Cadastro realizado com sucesso! Faça login.', 'success');

            document.getElementById('cadastroForm').reset();

            setTimeout(() => {
                toggleForms();
                document.getElementById('login-email').value = email;
            }, 2000);
        } else {
            showMessage(data.msg || data.erro || 'Erro ao cadastrar', 'error');
        }
        
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Erro ao conectar com o servidor', 'error');
    }
});
