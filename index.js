const mykey = config.OMDBAPI;
const input = document.querySelector('input');

const fetchData = async searchTerm => {
	const response = await axios.get(`http://www.omdbapi.com/`, {
		params: {
			apikey: mykey,
			s: searchTerm,
		},
    });

    return response.data.Search;
};

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);
    console.log(movies);
};

input.addEventListener('input', debounce(onInput, 500));
