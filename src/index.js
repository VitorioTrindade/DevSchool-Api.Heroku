import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get ('/matricula', async (req, resp) => {
    try {
        let alunos = await db.tb_matricula.findAll({
            order: [['id_matricula', 'desc']],
        });
        resp.send(alunos);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
})

app.post ('/matricula', async (req, resp) => {
    try {
        let { nome, chamada, curso, turma } = req.body;

        let w = req.body;

        let v = await db.tb_matricula.findOne({ where: { nm_aluno: nome } })
        let sala = await db.tb_matricula.findOne({ where: { nm_turma: w.turma } });
        let numero = await db.tb_matricula.findOne({ where: { nr_chamada: w.chamada } });

        if (nome === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O nome do aluno é obrigatório!' });

        if (chamada === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O campo da chamada é obrigatório!' });

        if (chamada < 0 )
            return resp.send({ erro: 'O número da chamada não pode ser negativo' });

        if ( sala != null && numero != null )
            return resp.send({ erro: 'Já existe um aluno com esse número' });    

        if (curso === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O nome do curso é obrigatório!' });

        if (turma === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O nome da turma é obrigatório!' });

        let r = await db.tb_matricula.create({
            nm_aluno: nome,
            nr_chamada: chamada,
            nm_curso: curso,
            nm_turma: turma
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
})

app.put ('/matricula/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let { nome, chamada, curso, turma } = req.body;

        if (nome === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O nome do aluno é obrigatório!' });

        if (chamada === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O campo da chamada é obrigatório!' });

        if (chamada < 0 )
            return resp.send({ erro: 'O número da chamada não pode ser negativo' });

        if (chamada != Number(chamada) )
            return resp.send({ erro: 'O campo da chamada tem que ser preenchido com números!' });

        if (curso === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O nome do curso é obrigatório!' });

        if (turma === '' || nome.replace(/\n/g, '') == '')
            return resp.send({ erro: 'O nome da turma é obrigatório!' });

        let r = await db.tb_matricula.update(
            { 
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso,
                nm_turma: turma 
            },
            { where: { id_matricula: id }})

            resp.sendStatus(200)
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
}) 

app.delete('/matricula/:id', async (req, resp) => {
    try {
        let r = await db.tb_matricula.destroy({ where: { id_matricula: req.params.id } });
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
})

app.listen(process.env.PORT,
           x => console.log(`>> Server up at port ${process.env.PORT}`))