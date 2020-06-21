const mongoose = require('mongoose');
const { Schema } = mongoose;

const writerSchema = new Schema({
    username: {
        type: String,
        minlength: 8,
        maxlength: 16,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 16,
        required: true
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 5,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

writerSchema.statics.create = function (payload) {
    const user = new this(payload);

    return user.save();
};

writerSchema.statics.findAll = function () {
    return this.find({});
};

writerSchema.statics.findOneByUsername = function (username) {
    return this.findOne({ username });
};

writerSchema.statics.updateByusername = function (username, payload) {
    return this.findOneAndUpdate({ username }, payload, { new: true });
};

writerSchema.statics.deleteByUsername = function (username) {
    return this.remove({ username });
}

module.exports = mongoose.model('Writer', writerSchema);