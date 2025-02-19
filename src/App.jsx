import { useEffect, useState } from 'react';
import './App.css';

//! API 'https://jsonplaceholder.typicode.com/posts'

const App = () => {
	const [blogIds, setBlogIds] = useState(null);
	const [blogById, setBlogById] = useState({});
	const [blogTitle, setBlogTitle] = useState('');
	const [blogDesc, setBlogDesc] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {}, []);

	return <></>;
};

export default App;
