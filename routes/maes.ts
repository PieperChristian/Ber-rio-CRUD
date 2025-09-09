import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import z from "zod"

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