import { Box, Container, Heading} from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';

const About = () =>{
  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 }
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
      <Container>
        <Box>
          <Heading>How it works</Heading>
        </Box>
        <Box marginTop="30">
          <Heading variant='section-title'>Machine Learning</Heading>
          <p> These rankings are based off of a machine learning model that was trained by extensive web scraping of the past 20 years of football.
            In order to predict fantasy points for the upcoming season, players were given labels of their total PPR points in the following season. Through this
            labeling, a 60% accuracy was achieved based on the Root Mean Square Error and the
            average value of each label. A model was created for each position and for each scoring method due to 
            certain statistics varying in importance.
            </p>
        </Box>
        <Box marginTop="21">
          <p>
            Linear regression was used as the primary model to predict future PPR score. This was implemented through sci-kit learn by filtering
            the raw data, processing it, and feeding it into a built in linear regression library. Linear regression works by finding 
            the most optimal combination of weights associated with given feature values; This is done by minimizing a loss function.
            For these models, the function to benchmark error and accuracy was the root mean squared error. In order to maximize the best fit with the data, an iterative process was used to select inputs for data 
            that would most efficiently minimze the root mean squared error.
          </p>
        </Box>
        <Box marginTop="21">
          <Heading variant='section-title'>Limitations</Heading>
          <Box marginTop="21">
          <p>
            Although the model is relatively accurate at predicting future PPR score, there are a few limitations.
            The model was trained by gathering only the top 250 players for any given year. If a player did not make
            the top 250 in the following year they would be taken out of the dataset. That being said, these rankings
            make the assumption that all the players in the list will make the top 250 players again. Injuries are also
            another factor that are hard to predict. This model does not take injuries into account when computing future ppr score.
            If a player was injured the year prior to the rankings they will not be ranked.
          </p>
        </Box>
        </Box>
      </Container>
    </motion.div>
  );
}
export default About;