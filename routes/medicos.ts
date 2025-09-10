import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import z from "zod"

const router = Router()
const prisma = new PrismaClient({
    log: ["query"]
})

import { Especialidade } from "@prisma/client"

const medicoValidacao = z.object({
    crm: z.string().length(8, "CRM deve ter 8 digitos"),
    nome: z.string().min(10, "Nome deve ter no mínimo 10 caracteres"),
    telefone: z.string().length(11, "Telefone deve ter 11 digitos com o DDD"),
    especialidade: z.nativeEnum(Especialidade)
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