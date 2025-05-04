# 🤖 Bot da FURIA CS2 no Telegram

>Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de desenvolvedor na FURIA Esports.

Trata-se de um bot de Telegram desenvolvido em Node.js com TypeScript que fornece informações atualizadas sobre o time de CS2 da FURIA Esports.

## 🚀 Bot em Produção

O bot está disponível publicamente e em execução no Telegram:

🔗 [@O_mais_novo_furioso_bot](https://t.me/O_mais_novo_furioso_bot)

Este bot está hospedado no [Railway](https://railway.app), permitindo testes em tempo real sem necessidade de instalação local.

## 📌 Funcionalidades

- `/start`: Mostra o menu inicial com botões interativos.  
- `/proximosjogos`: Lista os próximos jogos da FURIA com data, campeonato e adversário.  
- `/ultimosjogos`: Mostra os últimos 5 jogos da equipe com placar, data, campeonato e vencedor.  
- `/lineup`: Exibe a lineup atual da FURIA.  
- `/noticias`: Busca e exibe as últimas notícias relacionadas ao time.  

Cada comando também pode ser acessado por meio de botões no menu principal. O bot exibe mensagens de carregamento enquanto busca os dados e fornece feedback ao usuário em caso de erro.

## 🛠️ Tecnologias e APIs

- Node.js  
- TypeScript  
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)  
- [PandaScore API](https://pandascore.co/) – para dados de jogos e lineup  
- [Draft5 API](https://draft5.gg) – para notícias da equipe  

## 🧪 Instalação Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/ygor-ccarvalho/telegram-bot-furia.git
   cd telegram-bot-furia
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   TELEGRAM_BOT_TOKEN=seu_token_aqui
   PANDASCORE_API_KEY=seu_token_aqui
   ```

4. Inicie o bot em modo de desenvolvimento:

   ```bash
   npm run dev
   ```


## 📂 Estrutura do Projeto

```
furia-telegram-bot/
├── src/
│   ├── bot/
│   │   ├── commands/       # Comandos como /start, /proximosjogos, etc.
│   │   ├── services/       # Integração com APIs e scraping
│   ├── config/             # Arquivos de configuração como .env e constantes
│   └── utils/              # Funções auxiliares
├── .env                    # Token do bot (ignorado pelo git)
└── README.md
```

## ✅ Próximos passos (ideias)

- Cadastro de usuários para notificação automática de novas notícias.
- Histórico de performance do time.

---

Sinta-se à vontade para contribuir ou sugerir melhorias! 💪