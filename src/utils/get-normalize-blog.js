export const getNormalizeBlog = blogsList => {
	const ids = [],
		byIds = {};

	blogsList.map(blog => {
		ids.push(blog.id);
		byIds[blog.id] = blog;
	});

	return [ids, byIds];
};
