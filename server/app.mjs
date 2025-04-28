import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello TechUp!");
  });

app.get("/test", (req, res) => {
  return res.json("✅ Server API is working");
});

app.get("/profiles", (req, res) => {
  const profile = {
    data: {
      name: "john",
      age: 20,
    },
  };
  return res.status(200).json(profile);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
