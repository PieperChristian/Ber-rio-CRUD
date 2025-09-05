import express from 'express'
const app = express()
const port = 3000

import bercarioRoutes from './routes/bercario.js'
import maesRoutes from './routes/maes.js'
import medicosRoutes from './routes/medicos.js'
import recemNascidosRoutes from './routes/recemNascidos'

app.use(express.json()) // serve para identificar que os dados estao no formato JSON

app.use("/bercario", bercarioRoutes)
app.use("/maes", maesRoutes)
app.use("/medicos", medicosRoutes)
app.use("/recemNascidos", recemNascidosRoutes)

app.get('/', (req, res) => {
    res.send('API de Cadastros de Nascimentos')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
