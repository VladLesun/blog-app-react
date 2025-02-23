const BlogForm = ({ blogForm, onChangeInput, onAddBlog, onError }) => {
	console.log('onError: ', onError);
	return (
		<form className='blog__form form'>
			<input
				type='text'
				className={onError ? 'form__input form__input_error' : 'form__input'}
				name='title'
				value={blogForm.title}
				placeholder='Заголовок'
				onChange={onChangeInput}
			/>
			<textarea
				type='text'
				className={
					onError
						? 'form__input form__input_desc form__input_error'
						: 'form__input form__input_desc'
				}
				name='body'
				value={blogForm.body}
				placeholder='Напиши пост'
				onChange={onChangeInput}
			/>
			<button
				className='form__add'
				type='button'
				onClick={onAddBlog}
				disabled={onError}
			>
				Опубликовать
			</button>
		</form>
	);
};

export default BlogForm;
