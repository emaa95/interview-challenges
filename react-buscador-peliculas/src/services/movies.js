import axios from 'Axios'

export const searchMovies = async ({ search }) => {
    if (search == '') return null

    try {
        const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${search}`)
        
        const movies = response.data.description

        return movies?.map(movie => ({
            id: movie["#IMDB_ID"],
            title: movie["#TITLE"],
            year: movie["#YEAR"],
            poster: movie["#IMG_POSTER"] || '',
    }));

    } catch (e) {
        throw new Error('Error searching movies');
    }
}