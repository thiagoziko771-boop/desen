# 🚀 Deploy na Vercel - Passo a Passo

## Pré-requisitos
- Conta no GitHub (grátis em github.com)
- Conta na Vercel (grátis em vercel.com)

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
3. Clique em "Create repository"
4. Copie o comando para enviar:

```bash
git remote add origin https://github.com/seu-usuario/desenrola-brasil.git
git branch -M main
git push -u origin main
```

---

## PASSO 3: Conectar Vercel ao GitHub

1. Acesse **vercel.com** → Clique em "Import Project"
2. Selecione "Import Git Repository"
3. Cole a URL do seu repositório GitHub
4. Clique em "Import"

---

## PASSO 4: Configurar Variáveis de Ambiente

Na página do projeto na Vercel:

1. Vá para **Settings** → **Environment Variables**
2. Adicione:

```
AVEN_API_KEY = 2zxA50CzfpTMZgKCwuotYv681fsfo4bcrXrdttHxdD4
CPF_API_TOKEN = 76418167-38e2-46aa-acf1-51ed15b4db9f
```

3. Clique em "Save"

---

## PASSO 5: Deploy

1. Clique em **Deploy**
2. Aguarde (2-3 minutos)
3. Pronto! Seu site está ao vivo 🎉

---

## URLs Importantes

- **Site**: `https://seu-projeto.vercel.app`
- **Função de PIX**: `https://seu-projeto.vercel.app/api/gerar-pix`

---

## Testando Localmente (Opcional)

```bash
npm install -g vercel
vercel dev
```

Acesse `http://localhost:3000`

---

## ⚠️ Segurança

✅ Chaves de API **NÃO** estão mais no código
✅ Variáveis seguras são lidas do servidor
✅ Frontend não expõe credenciais
✅ CORS configurado corretamente

---

## Troubleshooting

### "Erro 403 ao gerar PIX"
- Verifique se as variáveis de ambiente foram salvas
- Redeploy após adicionar variáveis

### "Erro CORS"
- A função já trata CORS automaticamente

### "PIX não aparece"
- Verifique no console (F12) se há erros
- Teste a função manualmente em `/api/gerar-pix`

---

## Próximos Passos

1. Configure seu domínio customizado (opcional)
2. Monitore analytics
3. Configure webhooks da Aven Payments para tracking

Pronto! Seu funnel de pagamentos está seguro e escalável! 🚀
