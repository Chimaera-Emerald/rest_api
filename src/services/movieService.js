import Movie from '../models/Movie.js'

// Get all movies
export const getAllMovies = () => {
	return Movie.findAll()
}

// Get movie by ID
export const getMovieById = (id) => {
	return Movie.findById(id)
}

// Get movies by director
export const getMoviesByDirector = (director) => {
	return Movie.findByDirector(director)
}

// Get movies by year
export const getMoviesByYear = (year) => {
	return Movie.findByYear(year)
}

// Create new movie
export const createMovie = (movieData) => {
	const { title, director, year, rating } = movieData
	
	// Business logic: Validate rating range
	if (rating !== undefined && (rating < 0 || rating > 10)) {
		throw new Error('Rating must be between 0 and 10')
	}
	
	// Business logic: Validate year
	const currentYear = new Date().getFullYear()
	if (year !== undefined && (year < 1888 || year > currentYear + 5)) {
		throw new Error(`Year must be between 1888 and ${currentYear + 5}`)
	}
	
	return Movie.create({ title, director, year, rating })
}

// Update movie
export const updateMovie = (id, movieData) => {
	const { title, director, year, rating } = movieData
	
	// Check if movie exists
	const existingMovie = Movie.findById(id)
	if (!existingMovie) {
		return null
	}
	
	// Business logic: Validate rating range
	if (rating !== undefined && (rating < 0 || rating > 10)) {
		throw new Error('Rating must be between 0 and 10')
	}
	
	// Business logic: Validate year
	const currentYear = new Date().getFullYear()
	if (year !== undefined && (year < 1888 || year > currentYear + 5)) {
		throw new Error(`Year must be between 1888 and ${currentYear + 5}`)
	}
	
	return Movie.update(id, { title, director, year, rating })
}

// Delete movie
export const deleteMovie = (id) => {
	return Movie.delete(id)
}

// Get movie count
export const getMovieCount = () => {
	return Movie.count()
}
