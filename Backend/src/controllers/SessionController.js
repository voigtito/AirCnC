// Index, Show, Store, Update, Destroy

const UserModel = require('../models/User');

module.exports = {
    // Função assíncrona, porque pode demorar um pouco para executar
    async store(req, res) {
        // { nome } = desestruturação , busca informação dentro de uma váriavel
        const { name } = req.body;
        const { email } = req.body;

        // Como o processo de gravar no banco demora o await aguarda uma informação ser executada. 
        let user = await UserModel.findOne( { email } );

        if (!user) {
            user = await UserModel.create( { name, email } );
        }
        
        // Só segue para a próxima linha quando a instrução anterior terminar
        return res.json(user)
    }
};

//REQ = requisição é informação enviada / RES =  devolve a resposta para a requisição.