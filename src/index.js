import express from 'express'
const app = express()
const PORT = 3000

const users = [
	{ id: 1, name: "Alice" },
	{ id: 2, name: "Bob" },
	{ id: 3, name: "Charlie" },
	{ id: 4, name: "Dave" },
]

app.use(express.json())

// middleware to log request body
app.use((req, res, next) => {
	const date = new Date().toISOString()
	console.log(`[${date}] ${req.method} ${req.url}`)
	next()
})

// NEW: middleware to fetch external data
app.use(async (req, res, next) => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
	const data = await response.json()
	req.data = data
	console.log("Fetched external user:", data.name)
	next()
})

app.get("/", (req, res) => {
	const data = req.data
	res.json({ users, data })
})

app.post("/", (req, res) => {
	console.log("POST request received")
	console.log("Body:", req.body)
	res.json({ message: "Got your data!", data: req.body })
})

// ERROR HANDLING
app.use((err, req, res, next) => {
	console.error("ERROR:", err.stack)
	res.status(500).json({ error: "Something broke!" })
})

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`)
	console.log("Try: curl http://localhost:3000/")
})

// Keep process alive
process.on('uncaughtException', (err) => {
	console.error('Uncaught Exception:', err)
})