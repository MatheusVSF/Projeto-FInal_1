// --- DADOS DO USUÁRIO ---
// --- DADOS DO USUÁRIO ---
async function get_dados() {
    try {
        console.log("Iniciando busca de dados...");
        const resposta = await fetch("http://127.0.0.1:3000/user/get", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            console.log("Dados do usuário recebidos:", dados);

            if (!dados) {
                console.warn("Objeto de dados vazio recebido.");
                return;
            }

            // Elementos Desktop
            const elNome = document.getElementById("nome_usuario");
            const elNivel = document.getElementById("nivel_usuario");
            const elMoedas = document.getElementById("moedas_usuario");
            const elBarraXP = document.getElementById("barra_xp_usuario");

            // Atualização segura
            if (elNome) elNome.innerText = dados.nome || "Heroi";
            if (elNivel) elNivel.innerText = dados.nivel !== undefined ? dados.nivel : "1";
            if (elMoedas) elMoedas.innerText = dados.moedas !== undefined ? dados.moedas : "0";

            // Lógica da Barra de XP
            const xpAtual = dados.xp || 0;
            const porcentagemXP = Math.min((xpAtual % 100), 100);

            if (elBarraXP) {
                elBarraXP.style.width = `${porcentagemXP}%`;
                elBarraXP.innerText = `${xpAtual} XP`;
            }

            // Elementos Mobile
            const elNivelM = document.getElementById("nivel_usuario_m");
            const elXpM = document.getElementById("xp_usuario_m");
            const elMoedasM = document.getElementById("moedas_usuario_m");

            if (elNivelM) elNivelM.innerText = dados.nivel || "1";
            if (elXpM) elXpM.innerText = xpAtual;
            if (elMoedasM) elMoedasM.innerText = dados.moedas || "0";

            // Carrega o restante
            carregarTarefas();
            carregarTags();

        } else {
            console.error("Erro na resposta do servidor:", resposta.status);
            // Comentado para evitar loop infinito em caso de erro de API na mesma página
            // alert("Sessão expirada. Faça login novamente.");
            // window.location.href = "index.html";
        }
    } catch (erro) {
        console.error("Erro de conexão ao buscar dados:", erro);
    }
}

// --- LOGOUT ---
document.getElementById("btn_logout").addEventListener("click", async () => {
    try {
        const resposta = await fetch("http://127.0.0.1:3000/user/logout", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (resposta.ok) {
            window.location.href = "index.html";
        }
    } catch (erro) {
        console.error("Erro ao sair:", erro);
    }
});


// --- TAREFAS ---

// Carregar Tarefas (Pendentes e Concluídas)
async function carregarTarefas() {
    const listaPendentes = document.getElementById("lista-tarefas-pendentes");
    const listaConcluidas = document.getElementById("lista-tarefas-concluidas");

    listaPendentes.innerHTML = '<div class="text-center w-100"><div class="spinner-border text-purple" role="status"></div></div>';

    try {
        // Busca Pendentes
        const respPendentes = await fetch("http://127.0.0.1:3000/tarefa/get_p", { credentials: 'include' });
        const tarefasPendentes = await respPendentes.json();

        // Busca Concluídas
        const respConcluidas = await fetch("http://127.0.0.1:3000/tarefa/get_c", { credentials: 'include' });
        const tarefasConcluidas = await respConcluidas.json();

        // Renderiza Pendentes
        listaPendentes.innerHTML = "";
        if (tarefasPendentes.length === 0) {
            listaPendentes.innerHTML = '<p class="text-center text-muted w-100 mt-4">Nenhuma missão ativa. Crie uma nova!</p>';
        } else {
            tarefasPendentes.forEach(t => {
                listaPendentes.innerHTML += criarCardTarefa(t, false);
            });
        }

        // Renderiza Concluídas
        listaConcluidas.innerHTML = "";
        if (tarefasConcluidas.length === 0) {
            listaConcluidas.innerHTML = '<p class="text-center text-muted w-100 mt-4">Nenhuma missão completada ainda.</p>';
        } else {
            tarefasConcluidas.forEach(t => {
                listaConcluidas.innerHTML += criarCardTarefa(t, true);
            });
        }

    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
        listaPendentes.innerHTML = '<p class="text-danger">Erro ao carregar missões.</p>';
    }
}

// Template HTML do Card de Tarefa
function criarCardTarefa(t, concluida) {
    const dataFormatada = t.prazo ? new Date(t.prazo).toLocaleDateString('pt-BR') : 'Sem prazo';
    const corDificuldade = {
        'Fácil': 'success',
        'Média': 'warning',
        'Difícil': 'danger'
    }[t.dificuldade] || 'secondary';

    // Botões diferentes para pendente vs concluída
    let botoesAcao = '';

    if (!concluida) {
        botoesAcao = `
            <div class="d-flex justify-content-between mt-3">
                <button onclick="concluirTarefa('${t.id}')" class="btn btn-outline-success btn-sm flex-grow-1 me-2">
                    <i class="bi bi-check-lg"></i> Concluir
                </button>
                <button onclick="deletarTarefa('${t.id}')" class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    } else {
        botoesAcao = `
            <div class="d-flex justify-content-end mt-3">
                <button onclick="deletarTarefa('${t.id}')" class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash"></i> Deletar
                </button>
            </div>
        `;
    }

    return `
        <div class="col-md-6 mb-3">
            <div class="card h-100 border-0 shadow-sm task-card ${concluida ? 'bg-light opacity-75' : ''}">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-${corDificuldade}">${t.dificuldade}</span>
                        <small class="text-muted"><i class="bi bi-calendar"></i> ${dataFormatada}</small>
                    </div>
                    <h5 class="card-title fw-bold text-dark">${t.titlo}</h5>
                    <p class="card-text text-secondary flex-grow-1">${t.descricao}</p>
                    
                    ${botoesAcao}
                </div>
            </div>
        </div>
    `;
}


// Criar Tarefa
const formCriar = document.getElementById("form_criar_tarefa");
formCriar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const novaTarefa = {
        titlo: document.getElementById("titulo_tarefa").value,
        descricao: document.getElementById("descricao_tarefa").value,
        prazo: document.getElementById("prazo_tarefa").value,
        dificuldade: document.getElementById("dificuldade_tarefa").value,
        tags: document.getElementById("tag_tarefa").value // Pega apenas um ID por enquanto
    };

    try {
        const resp = await fetch("http://127.0.0.1:3000/tarefa/criar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(novaTarefa)
        });

        if (resp.ok) {
            alert("Missão aceita! ⚔️");
            formCriar.reset();
            carregarTarefas(); // Atualiza a lista
        } else {
            const erro = await resp.json();
            alert("Erro ao criar: " + (erro.erro || "Tente novamente"));
        }
    } catch (err) {
        console.error(err);
    }
});

// Concluir Tarefa
async function concluirTarefa(id) {
    if (!confirm("Concluir esta missão?")) return;

    try {
        const resp = await fetch("http://127.0.0.1:3000/tarefa/concluir", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id: id })
        });

        if (resp.ok) {
            carregarTarefas(); // Atualiza
            // Atualizar dados do usuário (XP/Moedas) seria bom aqui também
            get_dados();
        } else {
            alert("Erro ao concluir tarefa");
        }
    } catch (err) {
        console.error(err);
    }
}

// Deletar Tarefa
async function deletarTarefa(id) {
    if (!confirm("Tem certeza que deseja abandonar esta missão?")) return;

    try {
        const resp = await fetch("http://127.0.0.1:3000/tarefa/deletar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id: id })
        });

        if (resp.ok) {
            carregarTarefas();
        } else {
            alert("Erro ao deletar tarefa");
        }
    } catch (err) {
        console.error(err);
    }
}


// --- TAGS (Simulação / Futuro) ---
// Como não vi o controller de Tags completo, vou fazer um mock ou tentar listar se houver endpoint

async function carregarTags() {
    const selectTag = document.getElementById("tag_tarefa");
    try {
        const resposta = await fetch("http://127.0.0.1:3000/tag/get_T", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (resposta.ok) {
            const tags = await resposta.json();
            selectTag.innerHTML = '<option value="" selected>Sem tag</option>';
            tags.forEach(tag => {
                const option = document.createElement("option");
                option.value = tag.id; // Supondo que o backend retorna {id, titlo}
                option.text = tag.titlo;
                selectTag.appendChild(option);
            });
        }
    } catch (erro) {
        console.error("Erro ao carregar tags:", erro);
    }
}

async function criarTag() {
    const nome = document.getElementById("nome_nova_tag").value;
    const cor = document.getElementById("cor_nova_tag").value; // Cor ainda não salva no banco, apenas visual se o back suportar

    if (!nome) return alert("Digite um nome para a tag");

    try {
        const resp = await fetch("http://127.0.0.1:3000/tag/criar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ titlo: nome })
        });

        if (resp.ok) {
            alert(`Tag "${nome}" criada com sucesso!`);
            document.getElementById("nome_nova_tag").value = ""; // Limpa input

            // Fecha modal
            const modalEl = document.getElementById('modalCriarTag');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            // Recarrega tags no select
            carregarTags();
        } else {
            const erro = await resp.json();
            alert("Erro ao criar tag: " + (erro.erro || "Tente novamente"));
        }
    } catch (erro) {
        console.error(erro);
    }
}


// Inicialização
// --- LOJA DE CONQUISTAS ---

async function carregarLoja() {
    const lista = document.getElementById("lista-loja");
    lista.innerHTML = '<div class="text-center w-100"><div class="spinner-border text-purple" role="status"></div></div>';

    try {
        const resp = await fetch("http://127.0.0.1:3000/conquista/listar_loja", { credentials: 'include' });
        const itens = await resp.json();

        lista.innerHTML = "";
        if (itens.length === 0) {
            lista.innerHTML = '<p class="text-center text-muted col-12">Loja vazia no momento.</p>';
        } else {
            itens.forEach(item => {
                lista.innerHTML += `
                    <div class="col-md-4 col-sm-6 mb-3">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body text-center d-flex flex-column">
                                <div class="mb-2">
                                    <i class="bi bi-trophy-fill text-warning fs-1"></i>
                                </div>
                                <h6 class="card-title fw-bold">${item.titlo}</h6>
                                <p class="small text-muted flex-grow-1">${item.descricao || "Sem descrição"}</p>
                                <div class="d-grid gap-2">
                                    <button onclick="comprarItem('${item.id}', '${item.titlo}', '${item.descricao}', ${item.preco})" 
                                            class="btn btn-outline-purple btn-sm">
                                        <i class="bi bi-cart-plus"></i> ${item.preco} Moedas
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (err) {
        console.error("Erro loja:", err);
        lista.innerHTML = '<p class="text-danger">Erro ao carregar loja.</p>';
    }
}

async function carregarInventario() {
    const lista = document.getElementById("lista-inventario");
    try {
        // Aproveitando a rota get_c que retorna conquistas do usuario marcadas como "true" (compradas)
        const resp = await fetch("http://127.0.0.1:3000/conquista/get_c", { credentials: 'include' });
        const itens = await resp.json();

        lista.innerHTML = "";
        if (itens.length === 0) {
            lista.innerHTML = '<p class="text-center text-muted col-12">Você não possui itens ainda.</p>';
        } else {
            itens.forEach(item => {
                lista.innerHTML += `
                    <div class="col-md-4 col-sm-6 mb-3">
                        <div class="card h-100 border-success shadow-sm" style="background-color: #f0fff4;">
                            <div class="card-body text-center d-flex flex-column">
                                <div class="mb-2">
                                    <i class="bi bi-check-circle-fill text-success fs-1"></i>
                                </div>
                                <h6 class="card-title fw-bold text-success">${item.titlo}</h6>
                                <p class="small text-muted flex-grow-1">${item.descricao || ""}</p>
                                <span class="badge bg-success">Adquirido</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (err) {
        console.error("Erro inventario:", err);
    }
}

async function comprarItem(id, titlo, descricao, preco) {
    if (!confirm(`Comprar "${titlo}" por ${preco} moedas?`)) return;

    try {
        const resp = await fetch("http://127.0.0.1:3000/conquista/comprar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id_item: id, titlo, descricao, preco })
        });

        if (resp.ok) {
            alert("Compra realizada com sucesso! 🎉");
            get_dados(); // Atualiza moedas

            // Troca para aba de inventário automaticamente
            const tabInventario = new bootstrap.Tab(document.getElementById('tab-inventario'));
            tabInventario.show();
            carregarInventario();
        } else {
            const erro = await resp.json();
            alert("Erro: " + (erro.erro || "Falha na compra"));
        }
    } catch (err) {
        console.error(err);
    }
}

// Criar item da Loja (Admin)
document.getElementById("form_criar_conquista_loja").addEventListener("submit", async (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo_conquista").value;
    const descricao = document.getElementById("descricao_conquista").value;
    const preco = document.getElementById("preco_conquista").value;

    try {
        const resp = await fetch("http://127.0.0.1:3000/conquista/criar_loja", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ titlo: titulo, descricao: descricao, preco: preco })
        });

        if (resp.ok) {
            alert("Item adicionado à loja!");
            document.getElementById("form_criar_conquista_loja").reset();

            // Troca para aba da loja
            const tabLoja = new bootstrap.Tab(document.getElementById('tab-loja'));
            tabLoja.show();
            carregarLoja();
        } else {
            const erro = await resp.json();
            alert("Erro: " + (erro.erro || "Tente novamente"));
        }
    } catch (err) {
        console.error(err);
    }
});


// Inicialização
get_dados();
carregarLoja(); // Carrega a loja ao iniciar
