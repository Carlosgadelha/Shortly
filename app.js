import express from "express";
import cors from "cors";
import usersRouter from "./routers/usersRouter.js";
import urlsRouter from "./routers/urlsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRouter)
app.use(urlsRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
})