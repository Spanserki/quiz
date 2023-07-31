
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, cellphone } = req.body;
    const getUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const idUser = getUser?.id
    if (!!getUser) {
        return res.status(400).json({ message: 'email already exists', id: idUser })
    }
    try {
        const response = await prisma.user.create({
            data: {
                name,
                email,
                cellphone,
                createdAt: new Date()
            }
        })
        const id = response.id
        return res.status(201).json({ id })
    } catch (error) {
        return res.status(405).json({ message: 'error' })
    }
}