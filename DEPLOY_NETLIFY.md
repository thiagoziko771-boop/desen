# 🚀 Deploy na Netlify - Passo a Passo

## Pré-requisitos
- Conta no GitHub (grátis em github.com)
- Conta na Netlify (grátis em netlify.com)

---

## PASSO 1: Preparar o Repositório Git

```bash
# Na pasta do projeto
git init
git add .
git commit -m "Initial commit - Desenrola Brasil funnel"
```

---

## PASSO 2: Enviar para GitHub

1. Acesse **github.com** → Clique em "New" (novo repositório)
2. Nome: `desenrola-brasil` (ou outro nome)
3. Selecione "Private" ou "Public"
4. Clique em "Create repository"
5. Copie o comando para enviar:

```bash
git remote add origin https://github.com/seu-usuario/desenrola-brasil.git
git branch -M main
git push -u origin main
```

---

## PASSO 3: Conectar Netlify ao GitHub

1. Acesse **netlify.com** → Clique em "Add new site" 
2. Selecione "Import an existing project"
3. Escolha "GitHub"
4. Autorize o acesso (se pedido)
5. Selecione o repositório `desenrola-brasil`
6. Clique em "Deploy site"

---

## PASSO 4: Configurar Variáveis de Ambiente

Na página do site na Netlify:

1. Vá para **Site settings** → **Build & deploy** → **Environment**
2. Clique em "Edit variables"
3. Adicione as variáveis:

```
AVEN_API_KEY = 2zxA50CzfpTMZgKCwuotYv681fsfo4bcrXrdttHxdD4
CPF_API_TOKEN = 76418167-38e2-46aa-acf1-51ed15b4db9f
```

4. Clique em "Save"

---

## PASSO 5: Redeploy

Após adicionar as variáveis:

1. Vá para **Deploys**
2. Clique em "Trigger deploy" → "Deploy site"
3. Aguarde 2-3 minutos
4. Pronto! Seu site está ao vivo 🎉

---

## URLs Importantes

- **Site**: `https://seu-projeto.netlify.app`
- **Função de PIX**: `https://seu-projeto.netlify.app/.netlify/functions/gerar-pix`
- **Admin**: `https://app.netlify.com/sites/seu-projeto`

---

## Testando Localmente (Opcional)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Logar na Netlify
netlify login

# Rodar localmente
netlify dev
```

Acesse `http://localhost:8888`

---

## ⚠️ Segurança

✅ Chaves de API **NÃO** estão no código
✅ Variáveis seguras no painel Netlify
✅ Frontend não expõe credenciais
✅ CORS configurado corretamente
✅ Função serverless segura

---

## Troubleshooting

### "Erro 403 ao gerar PIX"
- Verifique se as variáveis foram salvas
- Redeploy após adicionar variáveis (trigger deploy)
- Aguarde 30s e teste novamente

### "Erro CORS"
- Verifique se netlify.toml está no root
- A função já trata CORS automaticamente

### "Função não encontrada (404)"
- Verifique se arquivo está em `functions/gerar-pix.js`
- Aguarde o redeploy completar
- Limpe o cache do navegador (Ctrl+Shift+Del)

### "Build failed"
- Verifique o log de deploy
- Certifique-se que o netlify.toml está correto
- Tente fazer push novamente

---

## Monitoramento

Na Netlify você pode:

1. **Logs de Função**: Site settings → Functions → Logs
2. **Analytics**: Site analytics → Estatísticas
3. **Webhooks**: Site settings → Build & deploy → Deploy notifications

---

## Próximos Passos

1. Configure seu domínio customizado (opcional)
   - Site settings → Domain management → Add custom domain

2. Configure SSL/TLS (automático na Netlify)

3. Configure webhooks da Aven Payments:
   - URL: `https://seu-dominio.netlify.app/webhook`
   - Configure no painel Aven Payments

4. Monitore conversões no Google Ads

---

## Diferenças Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Serverless | `/api/` | `/.netlify/functions/` |
| Configuração | `vercel.json` | `netlify.toml` |
| Env Vars | Settings > Env Variables | Site settings > Build & deploy > Environment |
| Deploy | Automático no push | Automático no push |
| Gratuito | Sim | Sim |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

Escolha a que mais gostar! Ambas funcionam perfeitamente.

---

**Pronto para produção! 🚀**

Para deploy em Vercel, veja: `DEPLOY_VERCEL.md`
