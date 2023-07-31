import { Skeleton, Stack, HStack } from "@chakra-ui/react"

export default function ResultSkeletonQuiz() {
    return (
        <Stack spacing={6} w='100%' align='center'>
            <Skeleton w={20} h={10} />
            <Skeleton w={500} h={10} />
            <Skeleton w={300} h={10} />
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
                <Stack align='center'>
                    <Skeleton w={200} h={8} />
                    <Skeleton w={170} h={8} />
                </Stack>
                <Stack align='center'>
                    <Skeleton w={100} h={8} />
                    <Skeleton w={70} h={8} />
                </Stack>
                <Stack align='center'>
                    <Skeleton w={100} h={8} />
                    <Skeleton w={70} h={8} />
                </Stack>
                <Stack align='center'>
                    <Skeleton w={200} h={8} />
                    <Skeleton w={100} h={8} />
                </Stack>
            </Stack>
            <Stack
                w='100%'
                maxW='2xl'
                justify='space-between'
            >
                <Skeleton w='100%' h={8}/>
                <Skeleton w='100%' h={8}/>
            </Stack>
        </Stack>
    )
}