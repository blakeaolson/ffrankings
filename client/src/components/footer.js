import {
  Box,
  Container,
  Stack,
  Text
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import { GrMail } from 'grommet-icons';

export default function Footer() {
  return (
    <Box
      marginTop={50}>
      <Container
        as={Stack}
        maxW={'3xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2023 ffrankings. Work of Blake Olson</Text>
        <Stack direction={'row'} spacing={6}>
        <a href="https://www.linkedin.com/in/blakeandrewolson/">
          <FaLinkedin/>
        </a>
        <a href="https://github.com/blakeaolson">
          <FaGithub/>
        </a>
        <a href = "mailto: blakeaolson1@gmail.com">
          {/* <GrMail/> */}
        </a>
        </Stack>
      </Container>
    </Box>
  );
}