const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
    thumb: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

SpotSchema.virtual('thumb_url').get(function(){
    return `http://192.168.15.2:3333/files/${this.thumb}`
})

module.exports = mongoose.model('Spot', SpotSchema)
