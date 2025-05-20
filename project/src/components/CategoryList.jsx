import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Theme from '../styles/Theme';

const Container = styled.div`
  margin-bottom: ${Theme.spacing(5)};
  overflow-x: auto;
  
  /* Hide scrollbar but allow scrolling */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  gap: ${Theme.spacing(1)};
  padding-bottom: ${Theme.spacing(1)};
  min-width: max-content;
`;

const CategoryItem = styled(motion.li)``;

const CategoryButton = styled.button`
  background-color: ${props => props.$isActive ? Theme.colors.primary[500] : Theme.colors.neutral[100]};
  color: ${props => props.$isActive ? 'white' : Theme.colors.text.primary};
  border: none;
  padding: ${Theme.spacing(1)} ${Theme.spacing(2)};
  border-radius: ${Theme.borderRadius.medium};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${Theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.$isActive ? Theme.colors.primary[600] : Theme.colors.neutral[200]};
  }
`;

const CategoryList = ({ blogs, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = ['All', ...new Set(blogs.map(blog => blog.category))];
    setCategories(uniqueCategories);
  }, [blogs]);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category === 'All' ? null : category);
  };
  
  return (
    <Container>
      <List>
        {categories.map((category) => (
          <CategoryItem 
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CategoryButton
              $isActive={activeCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryButton>
          </CategoryItem>
        ))}
      </List>
    </Container>
  );
};

export default CategoryList;