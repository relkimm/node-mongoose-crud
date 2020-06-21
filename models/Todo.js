const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    todoid: {
        type: Number,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'Writer'
    }
}, { timestamps: true });

todoSchema.statics.create = function (payload) {
    const todo = new this(payload);

    return todo.save();
}

todoSchema.statics.findAll = function () {
    return this.find({});
}

todoSchema.statics.findOneById = function (todoid) {
    return this.findOne({ todoid });
}

todoSchema.statics.updateById = function (todoid, payload) {
    return this.findOneAndUpdate({ todoid }, payload, { new: true });
}

todoSchema.statics.deleteById = function (todoid) {
    return this.remove({ todoid });
}

module.exports = mongoose.model('Todo', todoSchema);
