# 🔧 Setup - Escolha seu Deploy

Este projeto está preparado para **Netlify** e **Vercel**. Escolha um:

---

## ✨ OPÇÃO 1: Netlify (Recomendado para iniciantes)

**Pré-requisitos:**
- Conta GitHub
- Conta Netlify

**Passos:**
1. Push para GitHub
2. Em netlify.com → Add new site → Import from Git → GitHub
3. Selecione `desenrola-brasil`
4. Site settings → Build & deploy → Environment → Add variables:
   ```
   AVEN_API_KEY = 2zxA50CzfpTMZgKCwuotYv681fsfo4bcrXrdttHxdD4
   CPF_API_TOKEN = 76418167-38e2-46aa-acf1-51ed15b4db9f
   ```
5. Trigger deploy
6. Pronto! ✅

**Detalhes:** Ver `DEPLOY_NETLIFY.md`

---

## ⚡ OPÇÃO 2: Vercel (Mais rápido)

**Pré-requisitos:**
- Conta GitHub
- Conta Vercel

**Passos:**
1. Push para GitHub
2. Em vercel.com → Add new project → Import Git Repository
3. Selecione `desenrola-brasil`
4. Add environment variables:
   ```
   AVEN_API_KEY = 2zxA50CzfpTMZgKCwuotYv681fsfo4bcrXrdttHxdD4
   CPF_API_TOKEN = 76418167-38e2-46aa-acf1-51ed15b4db9f
   ```
5. Deploy
6. Pronto! ✅

**Detalhes:** Ver `DEPLOY_VERCEL.md`

---

## 📊 Comparação

| Aspecto | Netlify | Vercel |
|--------|---------|--------|
| **Setup** | 📌 Simples | ⚡ Rápido |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Suporte** | Excelente | Excelente |
| **Função Path** | `/.netlify/functions/` | `/api/` |
| **Analytics** | Nativo | Nativo |
| **Gratuito** | Sim | Sim |

---

## 🚀 Git Setup (Igual para ambos)

```bash
# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit - Desenrola Brasil funnel"

# Criar repositório vazio em github.com
# Copiar a URL do repositório

# Enviar para GitHub
git remote add origin https://github.com/seu-usuario/desenrola-brasil.git
git branch -M main
git push -u origin main
```

---

## 📁 Estrutura de Arquivos

```
VERIFICADEV/
├── 📄 index.html              PT1 - Formulário CPF
├── 📄 atendimento.html        PT2 - Chat + PIX
├── 📂 functions/              Netlify serverless
│   └── gerar-pix.js
├── 📂 api/                    Vercel serverless
│   └── gerar-pix.js
├── 📂 css/
├── 📂 js/
├── 📂 assets/
├── 📂 images/
├── 📋 netlify.toml            Config Netlify
├── 📋 vercel.json             Config Vercel
├── 📋 package.json
├── 📋 .env.example
├── 📋 .gitignore              ⚠️ Importante!
├── 📋 README.md
├── 📋 DEPLOY_NETLIFY.md
├── 📋 DEPLOY_VERCEL.md
└── 📋 SETUP.md                Você está aqui
```

---

## ⚠️ IMPORTANTE - .gitignore

O arquivo `.gitignore` foi criado para proteger suas chaves:

```
.env          # Arquivo local de desenvolvimento
.env.local    # Arquivo local com segredos
```

**NUNCA faça push dessas chaves!**

---

## 🔐 Segurança

✅ Chaves **NÃO** estão no código
✅ Protegidas em variáveis de ambiente
✅ Frontend não acessa credenciais
✅ Serverless Functions são seguras

---

## 🧪 Testar Localmente (Opcional)

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify dev
# Acesse http://localhost:8888
```

### Vercel
```bash
npm install -g vercel
vercel dev
# Acesse http://localhost:3000
```

---

## 📞 Próximos Passos

1. **Escolher plataforma** (Netlify ou Vercel)
2. **Push para GitHub**
3. **Conectar no painel** (Netlify ou Vercel)
4. **Adicionar variáveis de ambiente**
5. **Deploy automático**
6. **Testar o funnel**
7. **Configurar webhook** (Aven Payments)
8. **Monitorar conversões** (Google Ads)

---

## 📚 Documentação Completa

- **Netlify:** `DEPLOY_NETLIFY.md`
- **Vercel:** `DEPLOY_VERCEL.md`
- **Projeto:** `README.md`

---

**Escolha uma e bora lançar! 🚀**
