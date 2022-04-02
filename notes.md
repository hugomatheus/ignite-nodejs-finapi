# Start

## Criando arquivo package.json com configurações já predefinidas
yarn init -y

## Adicionando framework express
yarn add express
### Executando aplicação
nodemon src/index.js
### Para facilitar pode ser criado um atalho no package.json
 "scripts": {
    "dev": "nodemon src/index.js"
  }

## Utilizando nodemon auxiliando no processo de relod da aplicação (Dependência de desenvolvimento)
yarn add nodemon -D


## UUID
yarn add uuid


# Utilitários

# Finalizar processo de determinada porta

## descobrir o PID de terminada porta
lsof -i tcp:PORT

## encerrar o processo do PID
kill -9 PID

## Exemplo
lsof -i tcp:3333
kill -9 10036
