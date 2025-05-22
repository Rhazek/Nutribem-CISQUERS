
# NutriBem - Aplicativo Expo

Este é o repositório do **NutriBem**, um aplicativo mobile desenvolvido com Expo para ajudar no agendamento de consultas nutricionais.

---

## Pré-requisitos

- Node.js instalado
- npm (vem junto com Node.js)
- Expo CLI (recomendo rodar via `npx expo`)

---

## Como rodar o projeto

Este projeto possui duas partes que precisam ser executadas separadamente: o **backend** e o **frontend**.

### 1. Backend

O backend é responsável pela API e deve ser iniciado antes do frontend para que o app funcione corretamente.

```bash
cd backend
npm install
npm start
```

Este comando irá instalar as dependências e iniciar o servidor backend.

---

### 2. Frontend (app mobile)

O frontend é o aplicativo Expo que será executado emulando o app móvel.

```bash
cd nutribem-frontend
npm install
npx expo start
```

Após rodar o comando `npx expo start`, será exibido um menu no terminal com várias opções.

- Para abrir a versão **web** do app no navegador, pressione a tecla **`w`**.
- Para uma melhor experiência na web, recomendamos usar a extensão do navegador chamada **Simulador móvel** (mobile simulator), que permite simular telas de dispositivos móveis com diferentes resoluções e interações táteis.


---

## Estrutura do projeto

- `backend/` - Código do servidor API, banco de dados e lógica do backend
- `nutribem-frontend/` - Código do aplicativo móvel em React Native com Expo


