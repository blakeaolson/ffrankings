import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Button,
  Divider,
  Box,
  Heading,
  Select,
  HStack
} from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';


const Rankings = () =>{
  const [tableData, setTableData] = useState([]);
  const [tableDataQB, setTableDataQB] = useState([]);
  const [tableDataRB, setTableDataRB] = useState([]);
  const [tableDataWR, setTableDataWR] = useState([]);
  const [tableDataTE, setTableDataTE] = useState([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() =>{
    const fetchData = async () => {
      const result = await fetch('http://localhost:3001/rb_data/');
      const jsonResult = await result.json();
      
      jsonResult.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
      setTableData(jsonResult);
      setLoading(false);

      const qbResult = await fetch('http://localhost:3001/qb_data/');
      const jsonQBResult = await qbResult.json();
      jsonQBResult.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
      setTableDataQB(jsonQBResult);

      const wrResult = await fetch('http://localhost:3001/wr_data/');
      const jsonWRResult = await wrResult.json();
      jsonWRResult.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
      setTableDataWR(jsonWRResult);

      const rbResult = await fetch('http://localhost:3001/rb_data/');
      const jsonRBResult = await rbResult.json();
      jsonRBResult.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
      setTableDataRB(jsonRBResult);

      const teResult = await fetch('http://localhost:3001/te_data/');
      const jsonTEResult = await teResult.json();
      jsonTEResult.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
      setTableDataTE(jsonTEResult);
    }
    fetchData();
  }, [])
  
  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 }
  }
  if (isLoading){
    return(
      <Box height={1000}></Box>
    )
  }

  return(
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <Container maxW='2xl'>
        <Box flexGrow={1}>
          <Heading as='h2' size='lg' variant='page-title'>
            Fantasy Football built with AI
          </Heading>
          <p> Rankings based on Machine Learning (2023) </p>
        </Box>
      </Container>
      <Container maxW='2xl' marginTop={30}>
        <Divider marginBottom={1}/>
        <HStack>
          <Select variant='outline' defaultValue={"PPR"} maxWidth={110} size='sm'>
            <option value={"PPR"}>PPR</option>
            <option value={"Standard"}>Standard</option>
            <option value={"1/2"}>1/2 PPR</option>
          </Select>
          <Button size='sm' variant='ghost'> Overall</Button>
          <Button size='sm' variant='ghost' onClick={() => setTableData(tableDataQB)}>QB</Button>
          <Button size='sm' variant='ghost' onClick={() => setTableData(tableDataRB)}>RB</Button>
          <Button size='sm' variant='ghost' onClick={() => setTableData(tableDataWR)}>WR</Button>
          <Button size='sm' variant='ghost' onClick={() => setTableData(tableDataTE)}>TE</Button>
        </HStack>
        <Divider marginTop={1}/>
      </Container>
      <Container maxW='2xl'>
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Player</Th>
                <Th>Pos</Th>
                <Th>Team</Th>
                <Th isNumeric>Projected</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((obj) => {
                return(
                  <Tr key = {obj._id}>
                    <Td>{obj.rank}</Td>
                    <Td>{obj.name}</Td>
                    <Td>{obj.position}</Td>
                    <Td>{obj.team}</Td>
                    <Td isNumeric>{obj.PPR}</Td>
                  </Tr>
                ) 
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </motion.div>
    
  );
}
export default Rankings;