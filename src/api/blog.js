const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getBlog = () => {
	return fetch(`${BASE_URL}/posts`).then(response => {
		if (!response.ok) {
			throw new Error('Произошла ошибка сервера...');
		}

		return response.json();
	});
};

export const addBlog = blog => {
	return fetch(`${BASE_URL}/posts`, {
		method: 'POST',
		body: JSON.stringify(blog),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
};

export const deleteBlog = id => {
	fetch(`${BASE_URL}/posts/${id}`, {
		method: 'DELETE',
	});
};
