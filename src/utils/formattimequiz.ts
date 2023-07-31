import { formatDistance, formatDistanceStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function TimeQuiz(startquiz: string, endquiz: string) {
    const time = formatDistanceStrict(new Date(startquiz), new Date(endquiz), {
        locale: ptBR,
    })
    return time;
}