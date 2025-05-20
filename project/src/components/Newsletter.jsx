import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import Theme from '../styles/Theme';

const Section = styled.section`
  padding: ${Theme.spacing(12)} 0;
  background: linear-gradient(135deg, ${Theme.colors.primary[500]}, ${Theme.colors.secondary[500]});
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
  text-align: center;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: ${Theme.spacing(2)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto ${Theme.spacing(5)} auto;
  opacity: 0.9;
`;

const FormContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${Theme.spacing(2)};
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${Theme.spacing(2)};
  font-size: 1rem;
  border: none;
  border-radius: ${Theme.borderRadius.medium} 0 0 ${Theme.borderRadius.medium};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${Theme.colors.accent[500]};
  }
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    border-radius: ${Theme.borderRadius.medium};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${Theme.colors.accent[500]};
  color: white;
  border: none;
  padding: ${Theme.spacing(2)} ${Theme.spacing(4)};
  font-weight: ${Theme.typography.fontWeight.medium};
  border-radius: 0 ${Theme.borderRadius.medium} ${Theme.borderRadius.medium} 0;
  cursor: pointer;
  transition: background-color ${Theme.transitions.short};
  
  &:hover {
    background-color: ${Theme.colors.accent[600]};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${Theme.colors.accent[300]};
  }
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    border-radius: ${Theme.borderRadius.medium};
  }
`;

const Message = styled(motion.p)`
  margin-top: ${Theme.spacing(2)};
  font-size: 0.9rem;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }
    
    // This would connect to an API in a real implementation
    setStatus({ type: 'success', message: 'Thank you for subscribing!' });
    setEmail('');
  };
  
  useState(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <Section>
      <Container ref={ref}>
        <Title
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          Stay Updated
        </Title>
        <Subtitle
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
          }}
        >
          Subscribe to our newsletter to receive the latest articles, tips, and resources delivered directly to your inbox.
        </Subtitle>
        
        <FormContainer
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
          }}
        >
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </SubmitButton>
            </InputGroup>
            
            {status && (
              <Message
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: status.type === 'error' ? Theme.colors.error[300] : Theme.colors.success[300] }}
              >
                {status.message}
              </Message>
            )}
          </form>
        </FormContainer>
      </Container>
    </Section>
  );
};

export default Newsletter;