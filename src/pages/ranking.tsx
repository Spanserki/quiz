import RankingSkeleton from "@/components/Skeletons/RankingSkeleton";
import { GetQuizis } from "@/hooks/quiz";
import TimeQuiz from "@/utils/formattimequiz";
import {
    Button,
    Flex,
    Heading,
    Icon,
    Link,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillStar, AiFillTrophy } from "react-icons/ai";

export default function Home() {
    const [isLoadingButton, setIsLoadingButton] = useState('button')
    const { data, isLoading, error } = GetQuizis()
    return (
        <Flex
            flexDir='column'
            w='100%'
            h='100%'
            align='center'
            gap={10}
            py={10}
            bgColor='gray.900'
            color='gray.100'
        >
            {isLoading ? (
                <RankingSkeleton />
            ) : error ? (
                <Flex w='100%' justify='center'>
                    <Text>Nenhuma quiz encontrada</Text>
                </Flex>
            ) : (
                <>
                    <Icon as={AiFillTrophy} fontSize='7xl' color='yellow.300' />
                    <Heading fontSize='5xl'>
                        Ranking da nossa quiz
                    </Heading>
                    <Stack
                        w='100%'
                        h='100%'
                        maxW='5xl'
                        maxH='200'
                        align='center'
                        justify='center'
                        spacing={4}
                        overflowY='auto'
                        
                    >
                        <Table
                            variant='striped'
                            size='sm'
                            borderWidth={1}
                            borderColor='gray.700'
                            colorScheme="blackAlpha"
                        >
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th>Tempo</Th>
                                    <Th isNumeric>Pontuação</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((item: any) => {
                                    return (
                                        <Tr>
                                            <Td>
                                                <Flex align='center' gap={2}>
                                                    <Icon
                                                        as={AiFillStar}
                                                        color={data[0] === item ? 'yellow.300' : data[1] === item ? 'gray.100' : data[2] === item ? '#92400e' : 'transparent'}
                                                    />
                                                    {item.user.name}
                                                </Flex>
                                            </Td>
                                            <Td>{TimeQuiz(item.startquiz, item.endquiz)}</Td>
                                            <Td isNumeric>{item.score}%</Td>
                                        </Tr>
                                    )
                                })}

                            </Tbody>
                        </Table>
                    </Stack>
                    <Stack w='100%' maxW='5xl' mt={10}>
                        <Button
                            onClick={() => setIsLoadingButton('comecar')}
                            as={Link}
                            href="/registro"
                            textTransform='uppercase'
                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                            color='gray.100'
                            fontWeight='bold'
                            py={6}
                            transition='0.7s'
                            _hover={{ bgGradient: 'linear(to-r, #7928CA, #FF0080)', textDecor: 'none' }}
                            isLoading={isLoadingButton === 'comecar' ? true : false}
                        >
                            Iniciar uma quiz
                        </Button>
                        <Button
                            as={Link}
                            href="/"
                            variant='outline'
                            colorScheme="pink"
                            _hover={{ textDecor: 'none', opacity: '0.7' }}
                        >
                            Voltar ao início
                        </Button>
                    </Stack>
                </>
            )}
        </Flex>
    )
}
