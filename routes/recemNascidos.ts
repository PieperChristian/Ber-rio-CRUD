import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const router = Router()
const prisma = new PrismaClient({
    log: ["query"]
})

import { Parto } from "@prisma/client"
import { Sexo } from "@prisma/client"

const rnValidator = z.object({
    nome_: z.string().min(10, "Nome deve ter no mínimo 10 caracteres"),
    dataNasc_: z.string().datetime("Data deve ser no formato aaaa-mm-ddT00:00:00Z"),
    peso_: z.number().min(1000, "Peso deve ser no mínimo 1000g").max(10000, "Peso deve ser no máximo 10000g"),
    parto_: z.nativeEnum(Parto),
    altura_: z.number().min(10, "Altura deve ser no mínimo 10cm").max(1000, "Altura deve ser no máximo 1000cm"),
    sexo_: z.nativeEnum(Sexo)
})

router.get("/", async (req, res) => {
    try {
        const recemNascidos = await prisma.recem_Nascido.findMany({
            orderBy: { id: 'desc' }
        })
        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post("/", async (req, res) => {
    const recemNascido = rnValidator.safeParse(req.body)

    if (!recemNascido.success) {
        return res.status(400).json(recemNascido.error.format())
    }
    try {
        const novoRecemNascido = await prisma.recem_Nascido.create({
            // const { nome, dataNasc, peso, parto, altura, sexo, mae, medico } = recemNascido.data
            data: {
                nome: recemNascido.data.nome_,
                dataNasc: recemNascido.data.dataNasc_,
                peso: recemNascido.data.peso_,
                parto: recemNascido.data.parto_,
                altura: recemNascido.data.altura_,
                sexo: recemNascido.data.sexo_,
                mae: req.body.mae,
                medico: req.body.medico
            }
        })
        res.status(200).json(novoRecemNascido)
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