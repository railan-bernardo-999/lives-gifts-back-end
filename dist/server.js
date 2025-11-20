import express from 'express';
import { Router } from 'express';
const app = express();
const router = Router();
app.use(express.json());
router.get('/', (req, res) => {
    res.json({ message: 'Olá, mundo!' });
});
app.use(router);
app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});
//# sourceMappingURL=server.js.map