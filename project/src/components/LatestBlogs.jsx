import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import BlogCard from './BlogCard';
import Theme from '../styles/Theme';

const Section = styled.section`
  padding: ${Theme.spacing(10)} 0;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing(6)};
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${Theme.spacing(2)};
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${Theme.colors.text.primary};
  
  span {
    color: ${Theme.colors.secondary[500]};
  }
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const ViewAllButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  color: ${Theme.colors.primary[500]};
  font-weight: ${Theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all ${Theme.transitions.short};
  
  &:hover {
    color: ${Theme.colors.primary[700]};
    transform: translateX(5px);
  }
  
  &::after {
    content: '→';
    margin-left: ${Theme.spacing(1)};
    transition: transform ${Theme.transitions.short};
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`;

const LatestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${Theme.spacing(4)};
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const LatestBlogs = ({ blogs }) => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    // Sort by date (newest first) and exclude featured ones
    const nonFeatured = blogs.filter(blog => !blog.isFeatured);
    const sorted = [...nonFeatured].sort((a, b) => new Date(b.date) - new Date(a.date));
    setLatestBlogs(sorted.slice(0, 6));
  }, [blogs]);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <Section>
      <Container>
        <SectionHeader ref={ref}>
          <Title
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
          >
            Latest <span>Articles</span>
          </Title>
          <ViewAllButton
            to="/blog"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            View All Articles
          </ViewAllButton>
        </SectionHeader>
        
        <LatestGrid>
          {latestBlogs.map((blog, index) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              index={index}
            />
          ))}
        </LatestGrid>
      </Container>
    </Section>
  );
};

export default LatestBlogs;