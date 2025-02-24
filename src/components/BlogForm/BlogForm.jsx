const BlogForm = ({ blogForm, onChangeInput, onAddBlog }) => {
	return (
		<form className='blog__form form'>
			<label className='form__label'>
				<input
					type='text'
					className='form__input'
					name='title'
					placeholder='Заголовок'
					value={blogForm.title}
					onChange={onChangeInput}
				/>
			</label>
			<label className='form__label'>
				<textarea
					type='text'
					className='form__input form__input_desc'
					name='body'
					placeholder='Напиши пост'
					value={blogForm.body}
					onChange={onChangeInput}
				/>
			</label>

			<button className='form__add' type='button' onClick={onAddBlog}>
				Опубликовать
			</button>
		</form>
	);
};

export default BlogForm;
