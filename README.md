# PostingSystem

Sistema de postagens simples com autenticação, desenvolvido com **Laravel** no backend e **Vue.js + Vuetify** no frontend.

---

##  Tecnologias Utilizadas

### Backend
- Laravel 11 (API RESTful)
- MySQL
- phpMyAdmin (opcional)
- Sanctum (Autenticação com token)
- PHPUnit (Testes automatizados)

### Frontend
- Vue 3
- Vuetify (UI framework)
- Pinia (gerenciamento de estado)
- Axios (consumo de API)
- Vite (build)
- Cypress (E2E)
- Jest (testes unitários)

---

##  Funcionalidades

### Autenticação
- Registro de conta com nome, e-mail e senha
- Login com e-mail e senha
- Recuperação de senha por e-mail
- Logout

### Postagens
- Criar, editar e excluir postagens (apenas pelo autor)
- Listagem pública de todas as postagens
- Visualização de título, conteúdo, autor e data de criação


---

## Instalação

### Backend (Laravel)

```bash
cd PostingAPI
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
### Frontend
```bash
cd PostingAPP
npm install
npm run dev
```

