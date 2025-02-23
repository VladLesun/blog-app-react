export const getBlogTime = () => {
	let currentTime = new Date(),
		minutes = currentTime.getMinutes(),
		hours = currentTime.getHours(),
		days = currentTime.getDate(),
		month = currentTime.getMonth(),
		years = currentTime.getFullYear();

	if (minutes < 10) minutes = '0' + minutes;
	if (hours < 10) hours = '0' + hours;
	if (days < 10) days = '0' + days;
	if (month < 10) month = '0' + month;

	return `${days}.${month}.${years} ${hours}:${minutes}`;
};
