import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Theme from '../styles/Theme';
import { formatDate } from '../utils/formatDate';

const Card = styled(motion.article)`
  background-color: ${Theme.colors.background.paper};
  border-radius: ${Theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${Theme.shadows.small};
  transition: transform ${Theme.transitions.medium}, box-shadow ${Theme.transitions.medium};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${Theme.shadows.medium};
  }
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: ${Theme.spacing(2)};
  right: ${Theme.spacing(2)};
  background-color: ${Theme.colors.accent[500]};
  color: white;
  padding: ${Theme.spacing(0.5)} ${Theme.spacing(1)};
  border-radius: ${Theme.borderRadius.small};
  font-size: 0.75rem;
  font-weight: ${Theme.typography.fontWeight.bold};
  z-index: 5;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${Theme.transitions.medium};
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: ${Theme.spacing(3)};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Category = styled.span`
  color: ${Theme.colors.primary[500]};
  font-size: 0.875rem;
  font-weight: ${Theme.typography.fontWeight.medium};
  margin-bottom: ${Theme.spacing(1)};
  display: inline-block;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${Theme.spacing(2)};
  color: ${Theme.colors.text.primary};
  
  a {
    text-decoration: none;
    color: inherit;
    transition: color ${Theme.transitions.short};
    
    &:hover {
      color: ${Theme.colors.primary[500]};
    }
  }
`;

const Excerpt = styled.p`
  color: ${Theme.colors.text.secondary};
  margin-bottom: ${Theme.spacing(3)};
  flex-grow: 1;
`;

const MetaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: ${Theme.colors.text.secondary};
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: ${Theme.spacing(1)};
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-weight: ${Theme.typography.fontWeight.medium};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: ${Theme.spacing(2)};
`;

const ReadTime = styled.span`
  display: flex;
  align-items: center;
  
  &::before {
    content: "•";
    margin-right: ${Theme.spacing(1)};
  }
`;

const CardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5
    }
  }
};

const BlogCard = ({ 
  blog, 
  index, 
  isFeatured = false,
  withAnimation = true
}) => {
  const { 
    id, 
    title, 
    slug, 
    excerpt, 
    category, 
    author, 
    date,
    readTime,
    coverImage 
  } = blog;
  
  return (
    <Card
      variants={withAnimation ? CardVariants : {}}
      initial={withAnimation ? "hidden" : false}
      animate={withAnimation ? "visible" : false}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {isFeatured && <FeaturedBadge>Featured</FeaturedBadge>}
      <ImageWrapper>
        <Image src={coverImage} alt={title} />
      </ImageWrapper>
      <CardContent>
        <Category>{category}</Category>
        <Title>
          <Link to={`/blog/${slug}`}>{title}</Link>
        </Title>
        <Excerpt>{excerpt}</Excerpt>
        <MetaWrapper>
          <AuthorWrapper>
            <Avatar src={author.avatar} alt={author.name} />
            <AuthorName>{author.name}</AuthorName>
          </AuthorWrapper>
          <MetaInfo>
            <span>{formatDate(date)}</span>
            <ReadTime>{readTime} min read</ReadTime>
          </MetaInfo>
        </MetaWrapper>
      </CardContent>
    </Card>
  );
};

export default BlogCard;