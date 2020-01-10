const { Schema, model } = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');


const userSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// userSchema.plugin(mongoosePaginate);

const User = model('user', userSchema);

module.exports = User;
