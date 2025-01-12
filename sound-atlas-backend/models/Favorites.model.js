import mongoose from 'mongoose';

const FavoriteAlbumSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		title: { type: String, required: true },
		role: { type: String, required: true },
		year: { type: Number, required: true },
		resource_url: { type: String, required: true },
		thumb: { type: String, required: true },
	},
	{ _id: false },
);

const FavoriteSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		favoriteAlbum: { type: FavoriteAlbumSchema, required: true },
	},
	{
		timestamps: true,
	},
);

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;
