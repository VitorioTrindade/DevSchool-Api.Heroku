import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get ('/matricula', async (req, resp) => {
    try {
        let alunos = await db.tb_matricula.findAll();
        resp.send(alunos);
    } catch (e) {
        resp.send({ erro: "Ocorreu um erro no get!"})
    }
})

app.post ('/matricula', async (req, resp) => {
    try {
        let aluno = req.body;

        let v = await db.tb_matricula.findOne({ where: { nm_aluno: aluno.nome } })
        if (v != null)
            return resp.send({ erro: 'O aluno já existe!' });

        let r = await db.tb_matricula.create({
            nm_aluno: aluno.nome,
            nr_chamada: aluno.numero,
            nm_curso: aluno.curso,
            nm_turma: aluno.turma
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: "Ocorreu um erro no post!"})
    }
})

app.put ('/matricula/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let aluno = req.body.nome;

        let r = await db.tb_matricula.update({ nm_aluno: aluno }, { where: { id_matricula: id }})

            resp.sendStatus(200)
    } catch (e) {
        resp.send({ erro: "Ocorreu um erro no put!"})
    }
}) 

app.delete('/matricula/:id', async (req, resp) => {
    try {
        let r = await db.tb_matricula.destroy({ where: { id_matricula: req.params.id } });
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: "Deu erro no delete!"});
    }
})

app.listen(process.env.PORT,
           x => console.log(`>> Server up at port ${process.env.PORT}`))