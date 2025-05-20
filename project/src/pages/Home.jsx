import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Hero from '../components/Hero';
import FeaturedBlogs from '../components/FeaturedBlogs';
import LatestBlogs from '../components/LatestBlogs';
import Newsletter from '../components/Newsletter';
import Theme from '../styles/Theme';
import blogs from '../data/blogData';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
`;

const CategoriesSection = styled.section`
  padding: ${Theme.spacing(10)} 0;
  background-color: ${Theme.colors.neutral[100]};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${Theme.colors.text.primary};
  margin-bottom: ${Theme.spacing(5)};
  text-align: center;
  
  span {
    color: ${Theme.colors.primary[500]};
  }
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${Theme.spacing(3)};
`;

const CategoryCard = styled(motion.div)`
  background-color: white;
  border-radius: ${Theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${Theme.shadows.small};
  transition: transform ${Theme.transitions.medium}, box-shadow ${Theme.transitions.medium};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${Theme.shadows.medium};
  }
`;

const CategoryImage = styled.div`
  height: 150px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
`;

const CategoryContent = styled.div`
  padding: ${Theme.spacing(2)};
  text-align: center;
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${Theme.spacing(1)};
`;

const CategoryCount = styled.span`
  font-size: 0.9rem;
  color: ${Theme.colors.text.secondary};
`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Generate categories with counts
    const categoryMap = blogs.reduce((acc, blog) => {
      if (!acc[blog.category]) {
        acc[blog.category] = {
          name: blog.category,
          count: 0,
          image: blog.coverImage // Use the first blog's image in each category
        };
      }
      acc[blog.category].count += 1;
      return acc;
    }, {});
    
    setCategories(Object.values(categoryMap));
  }, []);
  
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedBlogs blogs={blogs} />
      <CategoriesSection>
        <Container>
          <SectionTitle>
            Explore by <span>Categories</span>
          </SectionTitle>
          <CategoryGrid>
            {categories.map((category, index) => (
              <CategoryCard
                key={category.name}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryImage $image={category.image} />
                <CategoryContent>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryCount>{category.count} articles</CategoryCount>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </Container>
      </CategoriesSection>
      <LatestBlogs blogs={blogs} />
      <Newsletter />
    </PageContainer>
  );
};

export default Home;