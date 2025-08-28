# Guia de Deploy no GitHub

## 📋 Pré-requisitos

- Conta no GitHub
- Node.js instalado (versão 16+)
- Git configurado

## 🚀 Passos para Publicar

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nome: `dashboard-gestao-projetos`
4. Marque como "Public"
5. NÃO inicialize com README
6. Clique "Create repository"

### 2. Configurar Projeto Local

```bash
# Clone ou baixe os arquivos do projeto
mkdir dashboard-gestao-projetos
cd dashboard-gestao-projetos

# Inicializar repositório Git
git init
git remote add origin https://github.com/SEU_USUARIO/dashboard-gestao-projetos.git
```

### 3. Editar Configurações

No arquivo `package.json`, altere:
```json
"homepage": "https://SEU_USUARIO.github.io/dashboard-gestao-projetos"
```
Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

### 4. Instalar Dependências

```bash
npm install
```

### 5. Testar Localmente

```bash
npm start
```
Acesse `http://localhost:3000` para verificar se tudo está funcionando.

### 6. Fazer Deploy

```bash
# Adicionar arquivos ao Git
git add .
git commit -m "Initial commit: Dashboard de Gestão de Projetos"
git push -u origin main

# Deploy no GitHub Pages
npm run deploy
```

### 7. Configurar GitHub Pages

1. Vá ao repositório no GitHub
2. Clique em "Settings"
3. Role até "Pages"
4. Em "Source", selecione "Deploy from a branch"
5. Escolha branch "gh-pages"
6. Clique "Save"

### 8. Acessar Site

Após alguns minutos, seu site estará disponível em:
`https://SEU_USUARIO.github.io/dashboard-gestao-projetos`

## 🔄 Atualizações Futuras

Para atualizar o site após mudanças:

```bash
git add .
git commit -m "Descrição da mudança"
git push origin main
npm run deploy
```

## 🛠️ Solução de Problemas

### Erro de Deploy
- Certifique-se que o campo "homepage" no package.json está correto
- Verifique se o branch gh-pages foi criado

### Site não carrega
- Aguarde até 10 minutos para propagação
- Verifique se GitHub Pages está configurado corretamente
- Verifique se o repositório é público

### Erro 404
- Confirme que a URL está correta
- Certifique-se que o deploy foi feito com sucesso

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no terminal
2. Consulte a documentação do GitHub Pages
3. Verifique se todas as dependências foram instaladas

---

🎉 **Parabéns!** Seu dashboard estará online e acessível para qualquer pessoa!