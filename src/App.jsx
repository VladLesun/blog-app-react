import { useEffect, useState } from 'react';
import { addBlog, deleteBlog, getBlog } from './api/blog';
import BlogItem from './components/BlogItem/BlogItem';
import { getBlogTime } from './utils/get-blog-time';
import { getNormalizeBlog } from './utils/get-normalize-blog';

//! API 'https://jsonplaceholder.typicode.com/posts'

const App = () => {
	//! app
	const [blogsIds, setBlogsIds] = useState(null);
	const [blogsById, setBlogsById] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	//! validation
	const [blogForm, setBlogForm] = useState({
		title: '',
		body: '',
	});
	const [blogFormValid, setBlogFormValid] = useState(false);
	const [blogTitleDirty, setBlogTitleDirty] = useState(false);
	const [blogBodyDirty, setBlogBodyDirty] = useState(false);
	const [blogInputError, setBlogInputError] = useState({
		title: 'Заголовок должен быть заполнен',
		body: 'Пост должен быть заполнен',
	});

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

	useEffect(() => {
		if (blogInputError.title || blogInputError.body) {
			setBlogFormValid(false);
		} else {
			setBlogFormValid(true);
		}
	}, [blogInputError.title, blogInputError.body]);

	const handleChangeInput = e => {
		const { name, value } = e.target;

		setBlogForm({
			...blogForm,
			[name]: value,
		});

		if (name === 'title') {
			if (value.length < 1 || value.length > 100) {
				setBlogInputError({
					...blogInputError,
					[name]: 'Заголовок больше 100 символов',
				});
				if (!value.trim()) {
					setBlogInputError({
						...blogInputError,
						[name]: 'Заголовок должен быть заполнен',
					});
				}
			} else {
				setBlogInputError({
					...blogInputError,
					[name]: '',
				});
			}
		}

		if (name === 'body') {
			if (value.length < 1 || value.length > 200) {
				setBlogInputError({
					...blogInputError,
					[name]: 'Пост больше 200 символов',
				});
				if (!value.trim()) {
					setBlogInputError({
						...blogInputError,
						[name]: 'Пост должен быть заполнен',
					});
				}
			} else {
				setBlogInputError({
					...blogInputError,
					[name]: '',
				});
			}
		}
	};

	const handleBlurInput = e => {
		switch (e.target.name) {
			case 'title':
				setBlogTitleDirty(true);
				break;
			case 'body':
				setBlogBodyDirty(true);
				break;
		}
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
					<form className='blog__form form'>
						<label className='form__label'>
							<input
								type='text'
								className='form__input'
								name='title'
								placeholder='Заголовок'
								onBlur={e => handleBlurInput(e)}
								value={blogForm.title}
								onChange={e => handleChangeInput(e)}
							/>
							{blogTitleDirty && blogInputError.title && (
								<div className='form__error'>{blogInputError.title}</div>
							)}
						</label>
						<label className='form__label'>
							<textarea
								type='text'
								className='form__input form__input_desc'
								name='body'
								placeholder='Напиши пост'
								onBlur={e => handleBlurInput(e)}
								value={blogForm.body}
								onChange={e => handleChangeInput(e)}
							/>
							{blogBodyDirty && blogInputError.body && (
								<div className='form__error'>{blogInputError.body}</div>
							)}
						</label>

						<button
							className='form__add'
							type='button'
							onClick={() => handleAddBlog()}
							disabled={!blogFormValid}
						>
							Опубликовать
						</button>
					</form>
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
