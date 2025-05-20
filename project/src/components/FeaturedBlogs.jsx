import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import BlogCard from './BlogCard';
import Theme from '../styles/Theme';

const Section = styled.section`
  padding: ${Theme.spacing(10)} 0;
  background-color: ${Theme.colors.background.default};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${Theme.spacing(6)};
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${Theme.colors.text.primary};
  margin-bottom: ${Theme.spacing(2)};
  
  span {
    color: ${Theme.colors.primary[500]};
  }
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${Theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${Theme.spacing(4)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedBlogs = ({ blogs }) => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    // Get featured blogs or most recent if none are marked as featured
    const featured = blogs.filter(blog => blog.isFeatured);
    
    if (featured.length >= 3) {
      setFeaturedBlogs(featured.slice(0, 3));
    } else {
      // Sort by date (newest first) and get top 3
      const sorted = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
      setFeaturedBlogs(sorted.slice(0, 3));
    }
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
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            Featured <span>Articles</span>
          </Title>
          <Subtitle
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
          >
            Discover our most popular and insightful articles curated just for you
          </Subtitle>
        </SectionHeader>
        
        <FeaturedGrid>
          {featuredBlogs.map((blog, index) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              index={index} 
              isFeatured={blog.isFeatured}
            />
          ))}
        </FeaturedGrid>
      </Container>
    </Section>
  );
};

export default FeaturedBlogs;