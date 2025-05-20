import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Theme from '../styles/Theme';

const FooterContainer = styled.footer`
  background-color: ${Theme.colors.neutral[900]};
  color: ${Theme.colors.neutral[300]};
  padding: ${Theme.spacing(10)} 0 ${Theme.spacing(5)};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(3)};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${Theme.spacing(5)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const BrandColumn = styled.div`
  grid-column: span 3;
  
  @media (max-width: ${Theme.breakpoints.md}) {
    grid-column: span 2;
  }
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: ${Theme.typography.fontWeight.bold};
  color: white;
  display: inline-block;
  margin-bottom: ${Theme.spacing(2)};
  text-decoration: none;
  
  span {
    background: linear-gradient(135deg, ${Theme.colors.primary[400]}, ${Theme.colors.secondary[400]});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const BrandDescription = styled.p`
  margin-bottom: ${Theme.spacing(3)};
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${Theme.spacing(2)};
`;

const SocialLink = styled.a`
  color: ${Theme.colors.neutral[400]};
  transition: color ${Theme.transitions.short};
  
  &:hover {
    color: white;
  }
`;

const LinksColumn = styled.div`
  grid-column: span 2;
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const ColumnTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: ${Theme.spacing(3)};
  font-weight: ${Theme.typography.fontWeight.medium};
  
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background-color: ${Theme.colors.primary[500]};
    margin-top: ${Theme.spacing(1)};
  }
`;

const LinksList = styled.ul`
  list-style: none;
`;

const LinkItem = styled.li`
  margin-bottom: ${Theme.spacing(1.5)};
`;

const FooterLink = styled(Link)`
  color: ${Theme.colors.neutral[400]};
  text-decoration: none;
  transition: color ${Theme.transitions.short}, transform ${Theme.transitions.short};
  display: inline-block;
  
  &:hover {
    color: white;
    transform: translateX(3px);
  }
`;

const ContactColumn = styled.div`
  grid-column: span 3;
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const ContactItem = styled.div`
  margin-bottom: ${Theme.spacing(2)};
  display: flex;
  align-items: flex-start;
`;

const ContactIcon = styled.span`
  margin-right: ${Theme.spacing(1.5)};
  color: ${Theme.colors.primary[400]};
`;

const FooterDivider = styled.hr`
  border: none;
  border-top: 1px solid ${Theme.colors.neutral[800]};
  margin: ${Theme.spacing(5)} 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${Theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${Theme.spacing(2)};
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: ${Theme.spacing(3)};
`;

const BottomLink = styled(Link)`
  color: ${Theme.colors.neutral[400]};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color ${Theme.transitions.short};
  
  &:hover {
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <BrandColumn>
            <Logo to="/">
              <span>Insight</span>Blog
            </Logo>
            <BrandDescription>
              Providing valuable insights and knowledge for developers and tech enthusiasts. Stay updated with the latest trends and best practices.
            </BrandDescription>
            <SocialLinks>
              <SocialLink href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </SocialLink>
            </SocialLinks>
          </BrandColumn>
          
          <LinksColumn>
            <ColumnTitle>Quick Links</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink to="/">Home</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/blog">Blog</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/about">About Us</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/contact">Contact</FooterLink></LinkItem>
            </LinksList>
          </LinksColumn>
          
          <LinksColumn>
            <ColumnTitle>Categories</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink to="/blog/category/technology">Technology</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/blog/category/design">Design</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/blog/category/react">React</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/blog/category/ux">UX</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/blog/category/backend">Backend</FooterLink></LinkItem>
            </LinksList>
          </LinksColumn>
          
          <LinksColumn>
            <ColumnTitle>Resources</ColumnTitle>
            <LinksList>
              <LinkItem><FooterLink to="/resources">Learning Resources</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/webinars">Webinars</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/newsletters">Newsletters</FooterLink></LinkItem>
              <LinkItem><FooterLink to="/ebooks">E-Books</FooterLink></LinkItem>
            </LinksList>
          </LinksColumn>
          
          <ContactColumn>
            <ColumnTitle>Contact Us</ColumnTitle>
            <LinksList>
              <ContactItem>
                <ContactIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </ContactIcon>
                <span>1234 Tech Street, San Francisco, CA 94107</span>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </ContactIcon>
                <span>+1 (555) 123-4567</span>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </ContactIcon>
                <span>info@insightblog.com</span>
              </ContactItem>
            </LinksList>
          </ContactColumn>
        </FooterContent>
        
        <FooterDivider />
        
        <FooterBottom>
          <Copyright>
            &copy; {new Date().getFullYear()} InsightBlog. All rights reserved.
          </Copyright>
          
          <BottomLinks>
            <BottomLink to="/privacy">Privacy Policy</BottomLink>
            <BottomLink to="/terms">Terms of Use</BottomLink>
            <BottomLink to="/sitemap">Sitemap</BottomLink>
          </BottomLinks>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;