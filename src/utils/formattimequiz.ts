import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function TimeQuiz(startquiz: string, endquiz: string) {
    const time = formatDistance(new Date(startquiz), new Date(endquiz), {
        locale: ptBR,
    })
    return time;
}