import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { formatDate } from '../utils/formatDate';
import Theme from '../styles/Theme';
import blogs from '../data/blogData';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: ${Theme.spacing(10)} 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), 
              url(${props => props.$image});
  background-size: cover;
  background-position: center;
  
  @media (max-width: ${Theme.breakpoints.md}) {
    height: 50vh;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.7)
  );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 0 ${Theme.spacing(3)};
  text-align: center;
`;

const Category = styled.span`
  display: inline-block;
  background-color: ${Theme.colors.primary[500]};
  color: white;
  padding: ${Theme.spacing(0.5)} ${Theme.spacing(2)};
  border-radius: ${Theme.borderRadius.small};
  margin-bottom: ${Theme.spacing(3)};
  font-size: 0.9rem;
  font-weight: ${Theme.typography.fontWeight.medium};
  text-transform: uppercase;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: ${Theme.spacing(3)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${Theme.spacing(4)};
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${Theme.spacing(2)};
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: ${Theme.spacing(2)};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-weight: ${Theme.typography.fontWeight.medium};
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  
  &::before {
    content: "•";
    margin-right: ${Theme.spacing(1)};
    
    @media (max-width: ${Theme.breakpoints.sm}) {
      display: none;
    }
  }
`;

const ReadTime = styled.div`
  display: flex;
  align-items: center;
  
  &::before {
    content: "•";
    margin-right: ${Theme.spacing(1)};
    
    @media (max-width: ${Theme.breakpoints.sm}) {
      display: none;
    }
  }
`;

const ContentSection = styled.section`
  padding: ${Theme.spacing(8)} 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${Theme.colors.text.primary};
  
  p {
    margin-bottom: ${Theme.spacing(3)};
  }
  
  h2 {
    font-size: 2rem;
    margin: ${Theme.spacing(5)} 0 ${Theme.spacing(3)};
  }
  
  h3 {
    font-size: 1.5rem;
    margin: ${Theme.spacing(4)} 0 ${Theme.spacing(2)};
  }
  
  blockquote {
    border-left: 4px solid ${Theme.colors.primary[500]};
    padding-left: ${Theme.spacing(3)};
    font-style: italic;
    color: ${Theme.colors.text.secondary};
    margin: ${Theme.spacing(4)} 0;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${Theme.spacing(1)};
  margin: ${Theme.spacing(6)} 0;
`;

const Tag = styled.span`
  background-color: ${Theme.colors.neutral[100]};
  color: ${Theme.colors.text.secondary};
  padding: ${Theme.spacing(0.5)} ${Theme.spacing(2)};
  border-radius: ${Theme.borderRadius.small};
  font-size: 0.9rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${Theme.colors.neutral[200]};
  margin: ${Theme.spacing(6)} 0;
`;

const AuthorSection = styled.div`
  display: flex;
  gap: ${Theme.spacing(3)};
  padding: ${Theme.spacing(4)};
  background-color: ${Theme.colors.neutral[100]};
  border-radius: ${Theme.borderRadius.medium};
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LargeAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorTitle = styled.h3`
  margin-bottom: ${Theme.spacing(1)};
`;

const AuthorBio = styled.p`
  color: ${Theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const RelatedSection = styled.section`
  padding: ${Theme.spacing(8)} 0;
  background-color: ${Theme.colors.neutral[100]};
`;

const RelatedTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: ${Theme.spacing(6)};
  
  span {
    color: ${Theme.colors.primary[500]};
  }
`;

const RelatedGrid = styled.div`
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

const RelatedCard = styled(Link)`
  display: block;
  text-decoration: none;
  background-color: white;
  border-radius: ${Theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${Theme.shadows.small};
  transition: transform ${Theme.transitions.medium}, box-shadow ${Theme.transitions.medium};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${Theme.shadows.medium};
  }
`;

const RelatedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RelatedContent = styled.div`
  padding: ${Theme.spacing(3)};
`;

const RelatedCategory = styled.span`
  color: ${Theme.colors.primary[500]};
  font-size: 0.875rem;
  font-weight: ${Theme.typography.fontWeight.medium};
  margin-bottom: ${Theme.spacing(1)};
  display: inline-block;
`;

const RelatedCardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${Theme.spacing(2)};
  color: ${Theme.colors.text.primary};
  transition: color ${Theme.transitions.short};
  
  ${RelatedCard}:hover & {
    color: ${Theme.colors.primary[500]};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${Theme.spacing(6)} 0;
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${Theme.spacing(2)};
  }
`;

const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${Theme.colors.text.primary};
  padding: ${Theme.spacing(2)} ${Theme.spacing(3)};
  border: 1px solid ${Theme.colors.neutral[300]};
  border-radius: ${Theme.borderRadius.medium};
  transition: all ${Theme.transitions.short};
  max-width: 45%;
  
  &:hover {
    background-color: ${Theme.colors.primary[500]};
    color: white;
    border-color: ${Theme.colors.primary[500]};
  }
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const PrevButton = styled(NavButton)`
  &::before {
    content: "←";
    margin-right: ${Theme.spacing(1)};
  }
`;

const NextButton = styled(NavButton)`
  margin-left: auto;
  text-align: right;
  
  &::after {
    content: "→";
    margin-left: ${Theme.spacing(1)};
  }
`;

const ButtonText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [prevBlog, setPrevBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  
  useEffect(() => {
    // Find the current blog post
    const currentBlog = blogs.find(blog => blog.slug === slug);
    
    if (currentBlog) {
      setBlog(currentBlog);
      
      // Get current blog index
      const currentIndex = blogs.findIndex(blog => blog.slug === slug);
      
      // Get previous and next blogs
      setPrevBlog(currentIndex > 0 ? blogs[currentIndex - 1] : null);
      setNextBlog(currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null);
      
      // Find related blogs based on category or tags
      const related = blogs
        .filter(b => 
          b.id !== currentBlog.id && 
          (b.category === currentBlog.category || 
           b.tags.some(tag => currentBlog.tags.includes(tag)))
        )
        .slice(0, 3);
      
      setRelatedBlogs(related);
      
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }, [slug]);
  
  if (!blog) {
    return <div>Loading...</div>;
  }
  
  // Simulate blog content with paragraphs
  const paragraphs = [];
  for (let i = 0; i < 5; i++) {
    paragraphs.push(blog.content);
  }
  
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection $image={blog.coverImage}>
        <HeroOverlay />
        <HeroContent>
          <Category>{blog.category}</Category>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {blog.title}
          </Title>
          <MetaInfo>
            <Author>
              <Avatar src={blog.author.avatar} alt={blog.author.name} />
              <AuthorName>{blog.author.name}</AuthorName>
            </Author>
            <DateInfo>{formatDate(blog.date)}</DateInfo>
            <ReadTime>{blog.readTime} min read</ReadTime>
          </MetaInfo>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <Container>
          <Content>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            
            <h2>Key Insights</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
            </p>
            
            <blockquote>
              "The best way to predict the future is to invent it." - Alan Kay
            </blockquote>
            
            <h3>Looking Forward</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            
            <TagContainer>
              {blog.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagContainer>
            
            <Divider />
            
            <AuthorSection>
              <LargeAvatar src={blog.author.avatar} alt={blog.author.name} />
              <AuthorInfo>
                <AuthorTitle>About {blog.author.name}</AuthorTitle>
                <AuthorBio>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultricies, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                </AuthorBio>
              </AuthorInfo>
            </AuthorSection>
            
            <NavigationButtons>
              {prevBlog && (
                <PrevButton to={`/blog/${prevBlog.slug}`}>
                  <ButtonText>
                    {prevBlog.title}
                  </ButtonText>
                </PrevButton>
              )}
              
              {nextBlog && (
                <NextButton to={`/blog/${nextBlog.slug}`}>
                  <ButtonText>
                    {nextBlog.title}
                  </ButtonText>
                </NextButton>
              )}
            </NavigationButtons>
          </Content>
        </Container>
      </ContentSection>
      
      {relatedBlogs.length > 0 && (
        <RelatedSection>
          <Container>
            <RelatedTitle>
              Related <span>Articles</span>
            </RelatedTitle>
            <RelatedGrid>
              {relatedBlogs.map(relatedBlog => (
                <RelatedCard key={relatedBlog.id} to={`/blog/${relatedBlog.slug}`}>
                  <RelatedImage src={relatedBlog.coverImage} alt={relatedBlog.title} />
                  <RelatedContent>
                    <RelatedCategory>{relatedBlog.category}</RelatedCategory>
                    <RelatedCardTitle>{relatedBlog.title}</RelatedCardTitle>
                  </RelatedContent>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </Container>
        </RelatedSection>
      )}
    </PageContainer>
  );
};

export default BlogPost;