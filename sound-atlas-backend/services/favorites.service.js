import Favorite from '../models/Favorites.model.js';

/**
 * Save a favorite album for a user.
 * @param {string} userId - The ID of the user.
 * @param {object} favoriteAlbum - The album details to save.
 * @returns {object} - The saved favorite or an existing favorite message.
 */
export const saveFavoriteAlbum = async (userId, favoriteAlbum) => {
	const existingFavorite = await Favorite.findOne({
		userId,
		'favoriteAlbum.id': favoriteAlbum.id,
	});

	if (existingFavorite) {
		return { message: 'Already in favorites.', existingFavorite };
	}

	const newFavorite = new Favorite({ userId, favoriteAlbum });
	await newFavorite.save();
	return { message: 'Favorite added successfully.', favorite: newFavorite };
};

/**
 * Check if an album is favorited by a user.
 * @param {string} userId - The ID of the user.
 * @param {string} albumId - The ID of the album.
 * @returns {boolean} - True if favorited, false otherwise.
 */
export const isAlbumFavorited = async (userId, albumId) => {
	const favorite = await Favorite.findOne({ userId, 'favoriteAlbum.id': albumId });
	return !!favorite;
};

/**
 * Check favorite status for multiple albums.
 * @param {string} userId - The ID of the user.
 * @param {Array<string>} albumIds - The IDs of the albums to check.
 * @returns {object} - An object with album IDs as keys and their favorited status as values.
 */
export const checkBatchFavoriteStatus = async (userId, albumIds) => {
	const favorites = await Favorite.find({
		userId,
		'favoriteAlbum.id': { $in: albumIds },
	});

	return albumIds.reduce((status, albumId) => {
		status[albumId] = favorites.some((fav) => fav.favoriteAlbum.id === albumId);
		return status;
	}, {});
};

/**
 * List all favorites for a user with optional pagination.
 * @param {string} userId - The ID of the user.
 * @param {number} page - The page number.
 * @param {number} limit - The number of items per page.
 * @returns {Array} - The list of favorites.
 */
export const getFavorites = async (userId, page = 1, limit = 10) => {
	return Favorite.find({ userId })
		.skip((page - 1) * limit)
		.limit(limit);
};

/**
 * Remove a favorite album for a user.
 * @param {string} userId - The ID of the user.
 * @param {string} albumId - The ID of the album.
 * @returns {object} - A success message.
 */
export const removeFavoriteAlbum = async (userId, albumId) => {
	await Favorite.deleteOne({ userId, 'favoriteAlbum.id': albumId });
	return { message: 'Favorite removed successfully.' };
};
