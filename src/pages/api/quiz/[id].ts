import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const { id } = req.query;
    try {
        const response = await prisma.quiz.findMany({
            where: {
                id: String(id)
            },
            include: {
                user: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json([])
    }
});

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});