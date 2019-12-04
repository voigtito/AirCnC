const SpotModel = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    
    
    async index(req, res) {

        // Filtro
        const { tech } = req.query;

        const spots = await SpotModel.find( { techs: tech } )

        return res.json( spots );

    },

    async store( req, res ) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id)

        if (!user) {
            return res.status(400).json( { error: 'Usuário não existe' } );
        }

        const spot = await SpotModel.create({
            user: user_id,
            thumb: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim())
        })

        return res.json( spot )
    },
}