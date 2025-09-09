import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import z from "zod"

const router = Router()
const prisma = new PrismaClient({
    log: ["query"]
})

const maeValidacao = z.object({
    nome: z.string().min(10, "Nome deve ter no mínimo 10 caracteres"),
    endereco: z.string(),
    telefone:z.string().length(11, "Telefone deve ter 11 digitos com o DDD"),
    dataNasc:z.string().datetime("Data deve ser no formato aaaa-mm-ddT00:00:00Z")
})

router.get("/", async (req, res) => {
    try {
        
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post("/", async (req, res) => {
    const mae = maeValidacao.safeParse(req.body)
    if (!mae.success) {
        return res.status(400).json
    }

    try {
        const novaMae = await prisma.mae.create({
            data: {
                nome: mae.data.nome,
                endereco: mae.data.endereco,
                telefone: mae.data.telefone,
                dataNasc: mae.data.dataNasc
            }
        })
        res.status(200).json({ message: "Mae cadastrada com sucesso", novaMae })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.put("/:id", async (req, res) => {
    try {
        
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

export default router