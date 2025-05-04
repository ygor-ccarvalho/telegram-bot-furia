
# 🤖 Bot Oficial da FURIA CS2 no Telegram

Este é um bot de Telegram que fornece informações atualizadas sobre o time de CS2 da FURIA, incluindo jogos passados, próximos confrontos, lineup atual e últimas notícias.

👉 [Acesse o bot no Telegram](https://t.me/O_mais_novo_furioso_bot)

## 📦 Funcionalidades

- `/start`: Mostra o menu inicial com botões interativos.
- `/proximosjogos`: Lista os próximos jogos da FURIA com data, campeonato e adversário.
- `/ultimosjogos`: Mostra os últimos 5 jogos da equipe com placar, data, campeonato e vencedor.
- `/lineup`: Exibe a lineup atual da FURIA.
- `/noticias`: Busca e exibe as últimas notícias relacionadas ao time.

Cada comando também pode ser acessado por meio de botões no menu principal, e o bot exibe mensagens de carregamento enquanto busca os dados.

## 🛠️ Tecnologias e APIs

- **Node.js**
- **TypeScript**
- **node-telegram-bot-api**: Integração com a API do Telegram.
- **PandaScore API**: Usada para obter dados dos jogos e lineup.
- **Cheerio + Puppeteer**: Utilizados para fazer scraping de notícias.
- **dotenv**: Para gerenciamento de variáveis de ambiente.

## 🚀 Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/furia-telegram-bot.git
   cd furia-telegram-bot
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com sua token do bot e do Pandscore:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   PANDASCORE_API_KEY=your_API_token_here
   ```

4. Inicie o bot em modo desenvolvimento:
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
