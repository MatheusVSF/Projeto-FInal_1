async function fazerLogin(email, senha) {
    try {
        const resposta = await fetch("http://127.0.0.1:3000/user/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email, senha: senha })
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            console.log(dados);
            if (dados.email === "sentience@gmail.com") {
                window.location.href = "adm.html";
            } else {
                window.location.href = "home.html";
            }
        } else {
            const erro = await resposta.json();
            console.error("Erro: ", erro);
            alert("Erro no login: " + (erro.erro || "Verifique suas credenciais"));
        };
    } catch (erro) {
        console.error("Erro: ", erro);
    };
};

async function fazerCadastro({ nome, email, senha, classe }) {
    try {
        const resposta = await fetch("http://127.0.0.1:3000/user/cadastrar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email, senha: senha, nome: nome, classe: classe })
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            console.log(dados);
            alert("Cadastro realizado com sucesso! Faça login.");
            return true;
        } else {
            const erro = await resposta.json();
            console.error("Erro: ", erro)
            alert("Erro no cadastro: " + (erro.erro || erro.msg));
            return false;
        };
    } catch (erro) {
        console.log(erro);
        return false;
    };
};

const loginSection = document.getElementById('login-section');
const cadastroSection = document.getElementById('cadastro-section');
const btnIrCadastro = document.getElementById('btn-ir-cadastro');
const btnIrLogin = document.getElementById('btn-ir-login');

btnIrCadastro.addEventListener('click', () => {
    loginSection.classList.add('d-none');
    cadastroSection.classList.remove('d-none');
});

btnIrLogin.addEventListener('click', () => {
    cadastroSection.classList.add('d-none');
    loginSection.classList.remove('d-none');
});


document.querySelectorAll('.btn-ver-senha').forEach(btn => {
    btn.addEventListener('click', function () {

        const input = this.previousElementSibling;
        const icon = this.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });
});



const formLogin = document.getElementById("form_login")
formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const email = document.getElementById("email_login").value
    const senha = document.getElementById("senha_login").value

    fazerLogin(email, senha)
})

const formCadastro = document.getElementById("form_cadastro")
formCadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const classe = document.getElementById("classe").value

    const sucesso = await fazerCadastro({ nome: nome, email: email, senha: senha, classe: classe })

    if (sucesso) {

        setTimeout(() => {
            cadastroSection.classList.add('d-none');
            loginSection.classList.remove('d-none');

            formCadastro.reset();
        }, 1500)
    }
})