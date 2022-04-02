const express =  require("express");
const { v4: uuidv4 }  = require("uuid");

const app = express();
app.use(express.json());

const customers = [];


function verifyExistsAccountByCPF(request, response, next) {
  const { cpf } = request.headers;
  const customer  =  customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!"});
  }
  request.customer = customer;
  return next();
}

app.post("/account", (request, response) => {
  const { name, cpf } = request.body;

  const customersAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if(customersAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!"});
  }

  customers.push({ 
    id: uuidv4(),
    name,
    cpf,
  statement: [] 
  });
  return response.status(201).send();
});

// app.use(verifyExistsAccountByCPF);

app.get("/statement", verifyExistsAccountByCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", verifyExistsAccountByCPF, (request, response) => {
  const { customer } = request;
  const {description, amount } =  request.body;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  };

  customer.statement.push(statementOperation);
  
  return response.status(201).send();
});

app.listen(3333);