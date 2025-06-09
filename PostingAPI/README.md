# Posting System - Laravel 

Este projeto é uma API de um blog simples com autenticação, recuperação de senha e CRUD de postagens.

## Tecnologias

- **Backend:** Laravel
- **Autenticação:** Laravel Sanctum
- **Banco:** MySQL / phpMyAdmin

## Funcionalidades

Registro de usuário  
Login  
Recuperação de senha (forgot + reset)  
CRUD de postagens (título, conteúdo, autor, data de criação)  
Controle de permissão (somente o dono da postagem pode editar ou excluir)

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/HudsonCarneiro/PostingSystem
cd PostingSystem
cp .env.example .env
php artisan key:generate

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=SystemPosting
DB_USERNAME=root
DB_PASSWORD=

php artisan migrate

php artisan serve

php artisan test
