# Requisitos da aplicação

## Cadastro de carro

**RF**

- Deve ser possível cadastrar um novo carro

**RN**

- Não deve ser possível cadastrar um carro com um aplaca já existente.
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

**RN**

- O aluguel deve ter duração mínima de 24 horas.
- Ao realizar um aluguel, o status do carro deverá ser mudado para indisponível.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

## Devolução do carro

**RF**

- Deve ser possível realizar a devolução de um carro

**RN**

- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário da devolução seja superior ao horário previsto da entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- O usuário deve estar autenticado na aplicação.
- Caso haja multa, deverá ser somado o total do aluguel.

## Cadastro de especificação

**RF**

- Deve ser possível cadastrar uma especificação.

**RN**

- Não deve ser possível cadastrar uma especificação com um nome já cadastrado.
- Apenas administradores podem realizar o cadastro.

## Listagem de especificações

**RF**

- Deve ser possível listar todas as especificações.

## Cadastro de categoria

**RF**

- Deve ser possível cadastrar uma categoria.

**RN**

- Não deve ser possível cadastrar uma categoria com um nome já cadastrado.
- Apenas administradores podem realizar o cadastro.

## Listagem de categorias

**RF**

- Deve ser possível listar todas as categorias.
