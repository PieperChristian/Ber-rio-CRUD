import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient({
    log: ["query"]
})

router.get("/", async (req, res) => {
    try {
        
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Retorna todos os recém-nascidos cujas mães contenham a parte do nome informada (case-insensitive)
router.get("/maes/:parteNome", async (req, res) => {
    const { parteNome } = req.params
    if (!parteNome || parteNome.trim().length === 0) {
        return res.status(400).json({ error: "Informe um trecho do nome da mãe na rota." })
    }

    try {
        const data = await prisma.recem_Nascido.findMany({
            where: {
                mae: {
                    is: {
                        nome: { contains: parteNome },
                    },
                },
            },
            include: {
                mae: true 
            },
            orderBy: {
                id: 'desc' 
            },
        })

        return res.status(200).json({ total: data.length, data })
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message })
    }
})

export default router