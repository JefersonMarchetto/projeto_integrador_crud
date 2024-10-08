# Projeto Integrador: Sistema de Cadastro de Mães e Alunos

## Descrição

Este projeto é um sistema de gerenciamento de cadastro de mães e alunos. Ele permite que os usuários possam cadastrar, listar, editar e excluir mães, além de cadastrar e listar os alunos associados a cada mãe. O sistema foi desenvolvido utilizando uma stack de tecnologia baseada em Node.js, React e MySQL.

## Funcionalidades

### Mães:
- **Adicionar mãe**: Cadastro de mães com informações como nome, CPF, etc.
- **Listar mães**: Visualizar uma lista de todas as mães cadastradas.
- **Editar mãe**: Modificar os dados de uma mãe.
- **Deletar mãe**: Remover uma mãe do sistema.
- **Visualizar filhos**: Visualizar os filhos associados a cada mãe.

### Alunos:
- **Adicionar aluno**: Cadastro de alunos vinculados a uma mãe.
- **Listar alunos**: Os alunos aparecem na lista ao lado das respectivas mães.

## Tecnologias Utilizadas

- **Frontend**:
  - React.js
  - Axios para fazer requisições HTTP
  - Bootstrap para layout e estilos

- **Backend**:
  - Node.js com Express.js para criação do servidor
  - MySQL como banco de dados relacional
  - Cors para habilitar o cross-origin

- **Banco de Dados**:
  - MySQL com tabelas de `mae` e `aluno`, incluindo os seguintes campos principais:
    - `mae`: nome, CPF, entre outros.
    - `aluno`: nome, data de nascimento, gênero.

## Instalação e Configuração

### Pré-requisitos

- **Node.js** instalado.
- **MySQL** instalado e configurado.
- **Git** instalado (para clonar o projeto).

### Passo a Passo

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/<usuario>/<repositorio>.git
