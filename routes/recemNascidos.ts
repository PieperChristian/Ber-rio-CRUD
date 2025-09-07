import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const router = Router()
const prisma = new PrismaClient({
    log: ["query"]
})

import { Parto } from "@prisma/client"

const rnValidator = z.object({
    nome: z.string().min(10, "Nome deve ter no mínimo 10 caracteres"),
    dataNasc: z.string().datetime("Data deve ser no formato aaaa-mm-ddT00:00:00Z"),
    peso: z.number().min(1000, "Peso deve ser no mínimo 1000g").max(10000, "Peso deve ser no máximo 10000g"),
    parto: z.nativeEnum(Parto).optional(),
    altura: z.number().min(10, "Altura deve ser no mínimo 10cm").max(1000, "Altura deve ser no máximo 1000cm"),
    sexo: z.enum(["M", "F"], "Sexo deve ser 'M' ou 'F'")
})

router.get("/", async (req, res) => {
    try {
        
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post("/", async (req, res) => {
    try {
        
        res.status(200).json()
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