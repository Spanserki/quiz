import { api } from "@/lib/api";
import { useQuery } from "react-query";

export function GetQuizis() {
    return (
        useQuery(
            ['getQuizis'],
            async () => {
                const response = await api.get(`/quiz`, {});
                return response.data;
            },
        )
    )
}

export function GetQuiz(id: string) {
    return (
        useQuery(
            ['quiz', id],
            async () => {
                const response = await api.get(`/quiz/${id}`);
                return response.data;
            },
            {
                staleTime: 1000 * 60 * 1, //1 minuto
            }
        )
    )
}
