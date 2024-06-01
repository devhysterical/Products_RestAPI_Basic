import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

interface Product {
  id: number;
  name: string;
  price: number;
}

let products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 20 },
  { id: 3, name: "Keyboard", price: 50 },
  { id: 4, name: "Monitor", price: 200 },
  { id: 5, name: "Headphone", price: 100 },
  { id: 6, name: "Microphone", price: 150 },
  { id: 7, name: "Webcam", price: 80 },
  { id: 8, name: "Printer", price: 300 },
  { id: 9, name: "Scanner", price: 200 },
  { id: 10, name: "Projector", price: 500 },
];

// Get all products
app.get("/products", (req: Request, res: Response) => {
  res.json(products);
});

// Get product by ID
app.get("/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const prod = products.find((prod) => prod.id === id);
  if (prod) {
    res.json(prod);
  } else {
    res.status(404).send("Product not found");
  }
});

// Add new product
app.post("/products:id", (req: Request, res: Response) => {
  const newProduct: Product = req.body;
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
app.put("/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((prod) => prod.id === id);
  if (index !== -1) {
    products[index] = req.body;
    res.json(products[index]);
  } else {
    res.status(404).send("Product not found");
  }
});

// Delete a product
app.delete("/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((prod) => prod.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Product not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
