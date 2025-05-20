import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import Newsletter from '../components/Newsletter';
import Theme from '../styles/Theme';
import blogs from '../data/blogData';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${Theme.colors.primary[600]}, ${Theme.colors.primary[800]});
  color: white;
  padding: ${Theme.spacing(15)} 0 ${Theme.spacing(10)};
  text-align: center;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: ${Theme.spacing(2)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  padding: ${Theme.spacing(8)} 0;
  background-color: ${Theme.colors.background.default};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${Theme.spacing(2)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ResultCount = styled.p`
  font-size: 1rem;
  color: ${Theme.colors.text.secondary};
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${Theme.spacing(1)};
`;

const SortLabel = styled.label`
  font-size: 0.9rem;
  color: ${Theme.colors.text.secondary};
`;

const SortSelect = styled.select`
  padding: ${Theme.spacing(1)} ${Theme.spacing(2)};
  border: 1px solid ${Theme.colors.neutral[300]};
  border-radius: ${Theme.borderRadius.small};
  background-color: white;
  font-size: 0.9rem;
`;

const BlogGrid = styled.div`
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

const NoResults = styled.div`
  text-align: center;
  padding: ${Theme.spacing(8)} 0;
`;

const NoResultsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${Theme.spacing(2)};
`;

const NoResultsText = styled.p`
  color: ${Theme.colors.text.secondary};
  margin-bottom: ${Theme.spacing(4)};
`;

const ResetButton = styled.button`
  background-color: ${Theme.colors.primary[500]};
  color: white;
  border: none;
  padding: ${Theme.spacing(1.5)} ${Theme.spacing(3)};
  border-radius: ${Theme.borderRadius.medium};
  cursor: pointer;
  transition: background-color ${Theme.transitions.short};
  
  &:hover {
    background-color: ${Theme.colors.primary[600]};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Theme.spacing(1)};
  margin-top: ${Theme.spacing(6)};
`;

const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.$isActive ? Theme.colors.primary[500] : Theme.colors.neutral[300]};
  background-color: ${props => props.$isActive ? Theme.colors.primary[500] : 'white'};
  color: ${props => props.$isActive ? 'white' : Theme.colors.text.primary};
  border-radius: ${Theme.borderRadius.small};
  cursor: pointer;
  transition: all ${Theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.$isActive ? Theme.colors.primary[600] : Theme.colors.neutral[100]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Blog = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing filters
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setActiveCategory(null);
    setSortBy('newest');
    setCurrentPage(1);
  };
  
  // Filter and sort blogs
  useEffect(() => {
    let filtered = [...blogs];
    
    // Apply category filter
    if (activeCategory) {
      filtered = filtered.filter(blog => blog.category === activeCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'title-az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'readTime':
        filtered.sort((a, b) => a.readTime - b.readTime);
        break;
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    setFilteredBlogs(filtered);
  }, [activeCategory, sortBy, blogs]);
  
  // Calculate pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroContainer>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Blog
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover articles, resources, and insights to help you improve your skills and stay current with industry trends.
          </HeroSubtitle>
        </HeroContainer>
      </HeroSection>
      
      <ContentSection>
        <Container>
          <CategoryList 
            blogs={blogs}
            onCategoryChange={handleCategoryChange}
          />
          
          <FilterContainer>
            <ResultCount>
              Showing {currentBlogs.length} of {filteredBlogs.length} articles
            </ResultCount>
            
            <SortContainer>
              <SortLabel htmlFor="sort-select">Sort by:</SortLabel>
              <SortSelect 
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-az">Title (A-Z)</option>
                <option value="title-za">Title (Z-A)</option>
                <option value="readTime">Reading Time</option>
              </SortSelect>
            </SortContainer>
          </FilterContainer>
          
          {currentBlogs.length > 0 ? (
            <>
              <BlogGrid>
                {currentBlogs.map((blog, index) => (
                  <BlogCard 
                    key={blog.id} 
                    blog={blog} 
                    index={index}
                    isFeatured={blog.isFeatured}
                  />
                ))}
              </BlogGrid>
              
              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </PaginationButton>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationButton
                      key={index + 1}
                      $isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationButton>
                  ))}
                  
                  <PaginationButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </PaginationButton>
                </PaginationContainer>
              )}
            </>
          ) : (
            <NoResults>
              <NoResultsTitle>No articles found</NoResultsTitle>
              <NoResultsText>
                We couldn't find any articles matching your current filters.
              </NoResultsText>
              <ResetButton onClick={resetFilters}>
                Reset Filters
              </ResetButton>
            </NoResults>
          )}
        </Container>
      </ContentSection>
      
      <Newsletter />
    </PageContainer>
  );
};

export default Blog;