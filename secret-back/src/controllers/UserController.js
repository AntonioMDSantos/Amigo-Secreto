const ModelUser = require('../models/user')

module.exports = 
{
    async List(req, res) {
        try {
            const users = await ModelUser.findAll()
            return res.json(users)

        } catch (err) {
            return console.log(err)
        }
    },

    async Create(req, res) {
        try {
            const users = await ModelUser.create(
                {
                 id: req.body.id,
                 nome: req.body.nome,
                 email: req.body.email
                }
            )
           return res.json(users)

        } catch (err) {
            return console.log(err)
        }
    },

    async Update(req, res) {
        try {

            const { id } = req.params
            const { nome, email} = req.body

            const user = await ModelUser.findOne({where:{id}})

            if(!user) {
                res.status(401).json({message: "Nenhum usuario encontrado"})
            } else {
                const user = await ModelUser.update({nome, email}, {where: {id}})
                res.status(200).json({user})
            }
        } catch (err) {
            return console.log(err)
        }
    },

    async Delete(req, res) {
        const { id } = req.params

        const user = await ModelUser.findOne({where: {id}})
        if(!user) {
            res.status(401).json({message: 'usuario nao encontrado'})
        } else {
            await ModelUser.destroy({where: {id}})
            res.status(200).json({ok: true})
        }
    },

    async Search(req, res) {
        try {
          const { term } = req.query;
      
          const users = await ModelUser.findAll({
            where: {
              [Op.or]: [
                {
                  id: {
                    [Op.like]: `%${term}%`,
                  },
                },
                {
                  nome: {
                    [Op.like]: `%${term}%`,
                  },
                },
                {
                  email: {
                    [Op.like]: `%${term}%`,
                  },
                },
              ],
            },
          });
      
          return res.json(users);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: 'Ocorreu um erro interno' });
        }
      },
      
}