import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const router = Router()
const prisma = new PrismaClient({
    log: ["query"]
})

import { Parto } from "@prisma/client"
import { Sexo } from "@prisma/client"

const rnValidatocao = z.object({
    nome: z.string().min(10, "Nome deve ter no mínimo 10 caracteres"),
    dataNasc: z.string().datetime("Data deve ser no formato aaaa-mm-ddT00:00:00Z"),
    peso: z.number().int().min(1000, "Peso deve ser no mínimo 1000g").max(10000, "Peso deve ser no máximo 10000g"),
    parto: z.nativeEnum(Parto),
    altura: z.number().int().min(10, "Altura deve ser no mínimo 10cm").max(100, "Altura deve ser no máximo 100cm"),
    sexo: z.nativeEnum(Sexo),
    maeID: z.number().int().positive(),
    medicoID: z.number().int().positive()
})

router.get("/", async (req, res) => {
    try {
        const recemNascidos = await prisma.recem_Nascido.findMany({
            orderBy: { id: 'desc' }
        })
        res.status(200).json({message: "Recem nascidos encontrados com sucesso", recemNascidos})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.post("/", async (req, res) => {
    const recemNascido = rnValidatocao.safeParse(req.body)
    if (!recemNascido.success) {
        return res.status(400).json(recemNascido.error.format())
    }

    try {
        const novoRecemNascido = await prisma.recem_Nascido.create({
            data: {
                nome: recemNascido.data.nome,
                dataNasc: recemNascido.data.dataNasc,
                peso: recemNascido.data.peso,
                parto: recemNascido.data.parto,
                altura: recemNascido.data.altura,
                sexo: recemNascido.data.sexo,
                maeID: recemNascido.data.maeID,
                medicoID: recemNascido.data.medicoID
            }
        })
        res.status(201).json({ message: "Recem nascido cadastrado com sucesso", novoRecemNascido })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    if (Number.isNaN(Number(id))) {
        return res.status(400).json({ error: "Código Inválido."})
    }

    const recemNascido = rnValidatocao.safeParse(req.body)
    if (!recemNascido.success) {
        return res.status(400).json(recemNascido.error.format())
    }

    try {
        const atualizaRecemNascido = await prisma.recem_Nascido.update({
            where: { id: Number(id)},
            data: {
                nome: recemNascido.data.nome,
                dataNasc: recemNascido.data.dataNasc,
                peso: recemNascido.data.peso,
                parto: recemNascido.data.parto,
                altura: recemNascido.data.altura,
                sexo: recemNascido.data.sexo,
                maeID: recemNascido.data.maeID,
                medicoID: recemNascido.data.medicoID
            }
        })
        res.status(200).json({message: "Recem nascido atualizado com sucesso", atualizaRecemNascido})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    if (Number.isNaN(Number(id))) {
        return res.status(400).json({ error: "Código Inválido."})
    }

    try {
        const deletaRecemNascido = await prisma.recem_Nascido.delete({
            where: { id: Number(id) }
        })
        res.status(200).json({message: "Recem nascido deletado com sucesso", deletaRecemNascido})
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

export default router