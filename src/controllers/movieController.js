import * as movieService from '../services/movieService.js'

// Get all movies
export const getAllMovies = (req, res) => {
	try {
		const movies = movieService.getAllMovies()
		res.status(200).json(movies)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single movie by ID
export const getMovieById = (req, res) => {
	try {
		const { id } = req.params
		const movie = movieService.getMovieById(id)
		
		if (!movie) {
			return res.status(404).json({ message: "Movie not found" })
		}
		
		res.status(200).json(movie)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new movie
export const createMovie = (req, res) => {
	try {
		const { title, director, year, rating } = req.body
		
		// Validation
		if (!title) {
			return res.status(400).json({ message: "Title is required" })
		}
		
		if (!director) {
			return res.status(400).json({ message: "Director is required" })
		}
		
		const newMovie = movieService.createMovie({ title, director, year, rating })
		res.status(201).json(newMovie)
	} catch (error) {
		// Handle validation errors
		if (error.message.includes('Rating') || error.message.includes('Year')) {
			return res.status(400).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

// Update movie
export const updateMovie = (req, res) => {
	try {
		const { id } = req.params
		const { title, director, year, rating } = req.body
		
		const updatedMovie = movieService.updateMovie(id, { title, director, year, rating })
		
		if (!updatedMovie) {
			return res.status(404).json({ message: "Movie not found" })
		}
		
		res.status(200).json(updatedMovie)
	} catch (error) {
		// Handle validation errors
		if (error.message.includes('Rating') || error.message.includes('Year')) {
			return res.status(400).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

// Delete movie
export const deleteMovie = (req, res) => {
	try {
		const { id } = req.params
		const deleted = movieService.deleteMovie(id)
		
		if (!deleted) {
			return res.status(404).json({ message: "Movie not found" })
		}
		
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
