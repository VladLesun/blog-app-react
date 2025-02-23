const BlogItem = ({ blog, onDelete }) => {
	return (
		<li className='blog__item'>
			{blog.time && <p className='blog-item__time'>{blog.time}</p>}
			<p className='blog-item__title'>{blog.title}</p>
			<p className='blog-item__desc'>{blog.body}</p>
			<button className='blog-item__delete' onClick={onDelete}>
				удалить пост
			</button>
		</li>
	);
};

export default BlogItem;
