import { Skeleton, Stack, HStack } from "@chakra-ui/react"

export default function RankingSkeleton() {
    return (
        <Stack spacing={6} w='100%' align='center'>
            <Skeleton w={20} h={10} />
            <Skeleton w={500} h={10} />
            <Stack
                w='100%'
                maxW='5xl'
                justify='center'
                align='center'
                textAlign='center'
                bgColor='gray.800'
                p={4}
                gap={4}
                rounded='md'
                fontSize='lg'
            >
                <Skeleton w='100%' h={300} />
            </Stack>
            <Stack
                w='100%'
                maxW='5xl'
                justify='space-between'
            >
                <Skeleton w='100%' h={8} />
                <Skeleton w='100%' h={8} />
            </Stack>
        </Stack>
    )
}