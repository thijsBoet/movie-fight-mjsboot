var mykey = config.OMDBAPI;

const fetchData = async () => {
	const response = await axios.get(`http://www.omdbapi.com/`, {
		params: {
			apikey: mykey,
			s: 'avengers',
		},
	});
	console.log(response.data);
	const data = await response.json();
	return data;
};

fetchData();
