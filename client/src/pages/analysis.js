import { Container, Heading, Box, Input, Stack, Progress} from '@chakra-ui/react';
import { motion } from 'framer-motion';
export default function Analysis(){
  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <Container height={1000}>
        <Box>
          <Heading>Team Analyzer</Heading>
          <p1>Advanced anaylsis using our rankings</p1>
        </Box>
        <Box marginTop={25}>
          <Heading size='md' marginBottom={15}>Input Team</Heading>
          <Stack>
            <Input width='auto' placeholder='QB'></Input>
            <Input width='auto' placeholder='RB'></Input>
            <Input width='auto' placeholder='RB'></Input>
            <Input width='auto' placeholder='WR'></Input>
            <Input width='auto' placeholder='WR'></Input>
            <Input width='auto' placeholder='TE'></Input>
          </Stack>
        </Box>

        <Box marginTop={70}>
          <Heading size='sm' marginTop={2} marginBottom={1}>QB</Heading>
          <Progress value={20} size='xs' colorScheme='pink' isAnimated='true' />
          <Heading size='sm' marginTop={2} marginBottom={1}>RB</Heading>
          <Progress value={80} size='xs' colorScheme='pink' isAnimated='true' />
          <Heading size='sm' marginTop={2} marginBottom={1}>WR</Heading>
          <Progress value={50} size='xs' colorScheme='pink' isAnimated='true' />
          <Heading size='sm' marginTop={2} marginBottom={1}>TE</Heading>
          <Progress value={30} size='xs' colorScheme='pink' isAnimated='true' />
        </Box>

      </Container>
    </motion.div>
  )
}