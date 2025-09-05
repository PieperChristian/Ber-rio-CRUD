import express from 'express'
const app = express()
const port = 3000

import bercarioRoutes from './routes/bercario.js'

app.use(express.json()) // serve para identificar que os dados estao no formato JSON
app.use("/bercario", bercarioRoutes)

app.get('/', (req, res) => {
    res.send('API de Cadastros de Nascimentos')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
