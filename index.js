const OMDBAPI_KEY = config.OMDBAPI;
const autoCompleteConfig = {
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
			<img src="${imgSrc}" />
			${movie.Title} (${movie.Year})
		`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: OMDBAPI_KEY,
				s: searchTerm,
			},
		});

		if (response.data.Error) {
			return [];
		}

		return response.data.Search;
	},
};

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector('#left-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	},
});

createAutoComplete({
	...autoCompleteConfig,
	root: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	},
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: OMDBAPI_KEY,
			i: movie.imdbID,
		},
	});

	side === 'left'
		? leftMovie = response.data
		: rightMovie = response.data;

	if (leftMovie && rightMovie) {
		runComparison();
	}

	summaryElement.innerHTML = movieTemplate(response.data);
};

const runComparison = () => {
	console.log('Time for comparison');
	
}

const movieTemplate = movieDetail => {
	const {
		Poster,
		Title,
		Genre,
		Plot,
		Awards,
		BoxOffice,
		Metascore,
		imdbRating,
		imdbVotes,
	} = movieDetail;

	return `
		<article class="media">
			<figure class="media-left">
				<p class="image">
				<img src="${Poster}" />
				</p>
			</figure>
			<div class="media-content">
				<div class="content">
				<h1>${Title}</h1>
				<h4>${Genre}</h4>
				<p>${Plot}</p>
				</div>
			</div>
		</article>
		<article class="notification is-primary">
			<p class="title">${Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
};
