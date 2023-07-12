import express from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'

const  app = express();
const PORT = 8000

app.use(cors());
app.use(express.json());

app.use("/cart", proxy("http://localhost:8001"));
app.use("/customer", proxy("http://localhost:8002"));
app.use("/inventory", proxy("http://localhost:8003"));
app.use("/orders", proxy("http://localhost:8004"));
app.use("/search", proxy("http://localhost:8005"));
app.use("/wishlist", proxy("http://localhost:8006"));
app.use("/admin", proxy("http://localhost:8007"));
app.use("/product", proxy("http://localhost:8008"));

app.listen(PORT, () => {
  console.log("Gateway is Listening to Port "+ PORT);
});