const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



const blogPostSchema = new Schema({
	_id: { type: Schema.Types.ObjectId, required: true },
	user_id: { type: Schema.Types.ObjectId, required: true },
	post_title: { type: String, required: true },
	post_slug: { type: String, required: true },
	post_body: { type: String, required: true },
}, { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

blogPostSchema.plugin(mongoosePaginate);



const BlogPost = model('blog_post', blogPostSchema);

module.exports = BlogPost;
