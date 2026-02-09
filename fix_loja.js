const { query } = require("./dao/conecao");

async function fixLojaUser() {
    try {
        console.log("Verificando usuário LOJA...");
        const res = await query("SELECT * FROM Usuario WHERE id = 'LOJA'");

        if (res.rows.length === 0) {
            console.log("Criando usuário LOJA...");
            // Insere um usuário dummy para satisfazer a Foreign Key
            // Ajuste os campos conforme sua tabela Usuario (email, senha, nome, etc)
            await query("INSERT INTO Usuario (id, email, senha, nome, classe, xp, nivel, moedas, conquistas, ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
                ['LOJA', 'loja@game.life', 'sistema', 'Loja Oficial', 'Sistema', 0, 999, 999999, null, true]);
            console.log("Usuário LOJA criado com sucesso!");
        } else {
            console.log("Usuário LOJA já existe.");
        }
    } catch (err) {
        console.error("Erro ao criar usuário LOJA:", err.message);
    }
}

fixLojaUser();
