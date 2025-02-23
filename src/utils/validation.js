export const validation = (name, value) => {
	if (name === 'title') {
		if (value.length < 10) {
			console.log('Заголовок должен быть больше 10 символов');
			return true;
		}
	}
	return false;
};
