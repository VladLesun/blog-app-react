import { useEffect, useState } from 'react';
import { addBlog, deleteBlog, getBlog } from './api/blog';
import BlogForm from './components/BlogForm/BlogForm';
import BlogItem from './components/BlogItem/BlogItem';
import { getBlogTime } from './utils/get-blog-time';
import { getNormalizeBlog } from './utils/get-normalize-blog';
import { validation } from './utils/validation';

//! API 'https://jsonplaceholder.typicode.com/posts'

const App = () => {
	const [blogsIds, setBlogsIds] = useState(null);
	const [blogsById, setBlogsById] = useState({});
	const [blogForm, setBlogForm] = useState({
		title: '',
		body: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isInputError, setIsInputError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);

		getBlog()
			.then(blogs => {
				const [ids, byIds] = getNormalizeBlog(blogs);

				setIsLoading(false);
				setBlogsIds(ids);
				setBlogsById(byIds);
			})
			.catch(error => {
				console.warn(error);
				setIsError(true);
				setIsLoading(false);
			});
	}, []);

	const handleChangeInput = e => {
		const { name, value } = e.target;

		setBlogForm({
			...blogForm,
			[name]: value,
		});

		setIsInputError(validation(name, value));
	};

	const handleAddBlog = () => {
		const id = Date.now();
		const time = getBlogTime();
		const newBlog = { ...blogForm, id, time };

		setBlogsById({
			...blogsById,
			[newBlog.id]: newBlog,
		});
		setBlogsIds([newBlog.id, ...blogsIds]);

		addBlog(newBlog);

		setBlogForm({
			title: '',
			body: '',
		});
	};

	const handleDeleteBlog = id => {
		if (confirm('Вы действительно хотите удалить пост ?')) {
			setBlogsIds(blogsIds.filter(blogId => blogId !== id));
			deleteBlog(id);

			console.log(`Запись с ID: ${id} успешно удалена`);
		}
	};

	return (
		<main className='blog'>
			<div className='container blog__container'>
				<div className='blog__left'>
					<p className='blog__form-title default-title'>Новый пост</p>
					<BlogForm
						blogForm={blogForm}
						onChangeInput={e => handleChangeInput(e)}
						onAddBlog={() => handleAddBlog()}
						onError={isInputError}
					/>
				</div>

				<div className='blog__right'>
					<p className='blog__form-title default-title'>Лента</p>
					<ul className='blog__list'>
						{isLoading && 'Идет загрузка ленты...'}

						{isError && 'Произошла ошибка сервера, попробуйте позже...'}

						{blogsIds
							? blogsIds.map(id => (
									<BlogItem
										key={id}
										blog={blogsById[id]}
										onDelete={() => handleDeleteBlog(id)}
									/>
							  ))
							: 'Тут пока пусто...'}
					</ul>
				</div>
			</div>
		</main>
	);
};

export default App;
