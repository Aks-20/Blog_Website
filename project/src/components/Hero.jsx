import styled from 'styled-components';
import { motion } from 'framer-motion';
import Theme from '../styles/Theme';

const HeroContainer = styled.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), 
              url('https://images.pexels.com/photos/3944054/pexels-photo-3944054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
  color: ${Theme.colors.text.white};

  @media (max-width: ${Theme.breakpoints.md}) {
    height: 70vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 76, 129, 0.85),
    rgba(0, 168, 150, 0.8)
  );
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
  width: 100%;
`;

const Headline = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: ${Theme.typography.fontWeight.bold};
  margin-bottom: ${Theme.spacing(3)};
  max-width: 700px;
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: ${Theme.spacing(5)};
  max-width: 600px;
  opacity: 0.9;
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: ${Theme.spacing(2)};
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const Button = styled(motion.a)`
  display: inline-block;
  padding: ${Theme.spacing(1.5)} ${Theme.spacing(3)};
  font-weight: ${Theme.typography.fontWeight.medium};
  border-radius: ${Theme.borderRadius.medium};
  text-align: center;
  cursor: pointer;
  transition: all ${Theme.transitions.medium};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${Theme.shadows.medium};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${Theme.colors.accent[500]};
  color: white;
  border: none;
  
  &:hover {
    background-color: ${Theme.colors.accent[600]};
    color: white;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: 2px solid white;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${Theme.spacing(5)};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.875rem;
  margin-bottom: ${Theme.spacing(1)};
  opacity: 0.8;
`;

const ScrollArrow = styled(motion.div)`
  width: 30px;
  height: 30px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
`;

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer>
      <Overlay />
      <Content>
        <Headline
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Insights and inspiration for the modern developer
        </Headline>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover thought-provoking articles, tutorials, and resources to enhance your skills and stay ahead in the ever-evolving world of technology.
        </Subtitle>
        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PrimaryButton 
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Articles
          </PrimaryButton>
          <SecondaryButton 
            href="/about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Us
          </SecondaryButton>
        </ButtonContainer>
      </Content>
      
      <ScrollIndicator
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ScrollText>Scroll Down</ScrollText>
        <ScrollArrow
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero;