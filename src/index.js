const express =  require("express");
const { v4: uuidv4 }  = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

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

app.get("/statement", (request, response) =>{
  const { cpf } = request.headers;
  const customer  =  customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!"});
  }

  return response.json(customer.statement);
});

app.listen(3333);