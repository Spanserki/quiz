
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    try {
        const response = await prisma.quiz.findMany({
            orderBy: {
                score: 'desc'
            },
            include: {user: true}
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json([])
    }
});

router.post(async (req, res) => {
    const { id, values, startTimeQuiz } = req.body;
    const newDate = new Date(startTimeQuiz)
    const startquiz = newDate.toISOString()
    console.log(startquiz)
    try {
        const filteredResponses = values.response.filter((item: any) => item != null);
        let hits = 0
        let mistakes = 0
        filteredResponses.forEach((item: any) => {
            item.answer === '10' ? hits++ : ''
            item.answer != '10' ? mistakes++ : ''
        });
        const score = Math.round(hits * 33.3)
        const response = await prisma.quiz.create({
            data: {
                score,
                hits,
                mistakes,
                endquiz: new Date(),
                startquiz,
                user: { connect: { id } }
            }
        })
        const idQuiz = response.id;
        return res.status(201).json({ message: 'sucess', id: idQuiz })
    } catch (error) {
        return res.status(405).json({ message: 'error' })
    }
})

export default router.handler({
    onError: (err: any, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});