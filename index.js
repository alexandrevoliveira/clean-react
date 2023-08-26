import fallback from 'express-history-api-fallback'
import express from 'express'
import { join } from 'path'
const app = express()
const root = join(__dirname, 'dist')
app.use(express.static(root))
app.use(fallback('index.html', { root }))
app.listen(process.env.PORT || 3000)
