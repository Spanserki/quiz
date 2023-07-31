import ResultSkeletonQuiz from "@/components/Skeletons/ResultQuizSkeleton";
import { GetQuiz } from "@/hooks/quiz";
import TimeQuiz from "@/utils/formattimequiz";
import { Badge, Button, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useState } from "react";
import { AiFillStar, AiOutlineReload } from 'react-icons/ai';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const { data, isLoading, error } = GetQuiz(`${id}`)
    console.log(data)
    async function SignOut() {
        destroyCookie(undefined, 'token_user_quiz',);
        destroyCookie(undefined, 'time_user_quiz',);
        router.push('/')
    }
    async function Restart() {
        setIsLoadingButton(true)
        destroyCookie(undefined, 'start_time_quiz',);
        setCookie(undefined, 'start_time_quiz', `${new Date()}`, {
            maxAge: 60 * 60 * 30,
            path: '/'
        })
        router.push('/perguntas')
    }
    return (
        <Flex
            flexDir='column'
            w='100%'
            h='100%'
            align='center'
            justify='center'
            gap={10}
            py={10}
            bgColor='gray.900'
            color='gray.100'
        >
            {isLoading ? (
                <ResultSkeletonQuiz />
            ) : error ? (
                <Flex w='100%' justify='center'>
                    <Text>Nenhuma quiz encontrada</Text>
                </Flex>
            ) : (
                <>
                    {data.map((item: any) => {
                        return (
                            <>
                                <Icon as={AiFillStar} fontSize={90} color='yellow.300' />
                                <Heading>Obrigado por parcitipar da nossa Quiz</Heading>
                                <Text fontSize='2xl' fontWeight='bold'>{item.user.name}</Text>
                                <Stack
                                    w='100%'
                                    maxW='2xl'
                                    justify='center'
                                    align='center'
                                    textAlign='center'
                                    bgColor='gray.800'
                                    p={4}
                                    gap={4}
                                    rounded='md'
                                    fontSize='lg'
                                >
                                    <Stack>
                                        <Text>Sua pontuação</Text>
                                        <Badge fontSize='lg' colorScheme={item.score > 60 ? 'twitter' : 'red'}>{item.score}%</Badge>
                                    </Stack>
                                    <Stack>
                                        <Text>Acertos</Text>
                                        <Badge fontSize='lg' colorScheme="green">{item.hits}</Badge>
                                    </Stack>
                                    <Stack>
                                        <Text>Erros</Text>
                                        <Badge fontSize='lg' colorScheme="red">{item.mistakes}</Badge>
                                    </Stack>
                                    <Stack>
                                        <Text>Tempo da quiz</Text>
                                        <Badge fontSize='lg' colorScheme="gray">{TimeQuiz(item.startquiz, item.endquiz)}</Badge>
                                    </Stack>
                                </Stack>
                                <Stack
                                    w='100%'
                                    maxW='2xl'
                                    justify='space-between'
                                >
                                    <Button
                                        onClick={Restart}
                                        colorScheme="pink"
                                        rightIcon={<Icon as={AiOutlineReload} />}
                                        isLoading={isLoadingButton}
                                    >
                                        Tentar de novo
                                    </Button>
                                    <Button
                                        variant='outline'
                                        onClick={SignOut}
                                        colorScheme="red"
                                        _hover={{opacity: '0.7'}}
                                    >
                                        Sair
                                    </Button>
                                </Stack>
                            </>
                        )
                    })}

                </>
            )}

        </Flex>
    )
}
