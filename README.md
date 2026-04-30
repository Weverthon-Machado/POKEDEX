<div align="center">

<img src="./assets/logo.png" alt="Pokédex Logo" width="250"/>

# 📱 Pokédex App

Um aplicativo mobile de Pokédex construído com **React Native** e **Expo**, consumindo a [PokéAPI](https://pokeapi.co/) para exibir informações detalhadas de cada Pokémon.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## ✨ Funcionalidades

- 🔍 **Busca por nome ou ID** — encontre qualquer Pokémon rapidamente
- 🎨 **Tema dinâmico** — a cor do app muda de acordo com o tipo do Pokémon
- 🏷️ **Exibição do ID** — badge com o número da Pokédex (`#001`, `#025`...)
- 🔠 **Nome em maiúsculas** — identidade visual marcante
- ⚡ **Tipos com cores** — badges coloridos por tipo (fogo, água, grama...)
- 📏 **Altura e peso** — estatísticas do Pokémon
- ⬅️➡️ **Navegação por botões** — avançar e voltar entre os Pokémons
- 🏠 **Voltar ao início** — retorna para o Bulbasaur (#001) com um clique
- 🚫 **Proteção contra ID negativo** — botão anterior desabilitado no #001
- 🌐 **Compatível com Web** — rode no navegador com `expo start --web`

---

## 📸 Preview

> *Adicione aqui screenshots do app rodando no celular ou no navegador*

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [Expo Go](https://expo.dev/client) no celular (Android ou iOS)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pokedex.git

# Entre na pasta do projeto
cd pokedex

# Instale as dependências
npm install
```

### Executando

```bash
# Inicia o servidor de desenvolvimento
npx expo start
```

| Comando | Ação |
|--------|------|
| `w` | Abre no navegador web |
| `a` | Abre no emulador Android |
| `i` | Abre no emulador iOS (Mac) |
| 📱 QR Code | Escaneia com o Expo Go no celular |

### Para rodar na Web

Se for a primeira vez rodando no navegador:

```bash
npx expo install react-dom react-native-web
npx expo start
# Pressione W
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|-----------|-----|
| [React Native](https://reactnative.dev/) | Framework mobile |
| [Expo](https://expo.dev/) | Plataforma de desenvolvimento |
| [PokéAPI](https://pokeapi.co/) | API de dados dos Pokémons |
| JavaScript (ES6+) | Linguagem principal |

---

## 📁 Estrutura do projeto

```
pokedex/
├── assets/
│   ├── logo.png
│   ├── icon.png
│   └── splash-icon.png
├── App.js          # Componente principal
├── app.json        # Configurações do Expo
├── index.js        # Entry point
└── package.json
```

---

## 📚 API utilizada

Todos os dados são consumidos da **[PokéAPI](https://pokeapi.co/)** — uma API pública, gratuita e completa sobre o universo Pokémon.

Endpoint principal usado:

```
GET https://pokeapi.co/api/v2/pokemon/{id ou nome}
```

---



## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
