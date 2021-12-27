# Requisitos da aplicação

## Cadastro de carro

**RF**

- Deve ser possível cadastrar um novo carro

**RN**

- Não deve ser possível cadastrar um carro com um aplaca já existente.
<!-- - Não deve ser possível alterar a placa de um carro já cadastrado. -->
- O carro deve ser cadastrado, por padrão com disponibilidade.
- Somente usuários administradores poderão cadastrar novos carros.

## Listagem de carros

**RF**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**RN**

- O usuário não precisa estar autenticado no sistema.

## Cadastro de especificação no carro

**RF**

- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**RN**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

## Cadastro de imagens do carro

**RF**

- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**RNF**

- Utilizar o multer para upload dos arquivos.

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Somente usuários administradores podem cadastrar a imagem para o carro.

## Aluguel de carro

**RF**

- Deve ser possível cadastrar um aluguel.

**RNF**

**RN**

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
