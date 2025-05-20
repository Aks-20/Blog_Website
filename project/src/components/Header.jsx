import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Theme from '../styles/Theme';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: ${Theme.spacing(2)} 0;
  z-index: 1000;
  transition: background-color ${Theme.transitions.medium}, box-shadow ${Theme.transitions.medium};
  background-color: ${props => props.$isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.$isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.$isScrolled ? Theme.shadows.small : 'none'};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${Theme.spacing(2)};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: ${Theme.typography.fontWeight.bold};
  color: ${Theme.colors.primary[500]};
  display: flex;
  align-items: center;
  text-decoration: none;
  
  span {
    background: linear-gradient(135deg, ${Theme.colors.primary[500]}, ${Theme.colors.secondary[500]});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Nav = styled.nav`
  @media (max-width: ${Theme.breakpoints.md}) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: ${Theme.spacing(4)};
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${props => props.$isActive 
    ? Theme.colors.primary[600] 
    : props.$isScrolled 
      ? Theme.colors.text.primary 
      : Theme.colors.text.white};
  text-decoration: none;
  font-weight: ${Theme.typography.fontWeight.medium};
  transition: color ${Theme.transitions.short};
  
  &:hover {
    color: ${Theme.colors.primary[500]};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: ${Theme.colors.primary[500]};
    transition: width ${Theme.transitions.medium};
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${Theme.spacing(1)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 20px;
    width: 30px;
  }
`;

const MenuBar = styled(motion.span)`
  display: block;
  height: 2px;
  width: 100%;
  background-color: ${props => 
    props.$isOpen ? Theme.colors.primary[500] : 
    props.$isScrolled ? Theme.colors.text.primary : Theme.colors.text.white};
  border-radius: 2px;
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Theme.colors.background.paper};
  z-index: 999;
  padding: ${Theme.spacing(8)} ${Theme.spacing(3)};
  
  @media (max-width: ${Theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${Theme.spacing(4)};
`;

const MobileNavItem = styled(motion.li)`
  padding: ${Theme.spacing(2)} 0;
  border-bottom: 1px solid ${Theme.colors.neutral[200]};
`;

const MobileNavLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: ${Theme.typography.fontWeight.medium};
  color: ${Theme.colors.text.primary};
  text-decoration: none;
  display: block;
  
  &:hover {
    color: ${Theme.colors.primary[500]};
  }
`;

const AddBlogButton = styled(Link)`
  background-color: ${Theme.colors.accent[500]};
  color: white;
  padding: ${Theme.spacing(1)} ${Theme.spacing(2)};
  border-radius: ${Theme.borderRadius.medium};
  font-weight: ${Theme.typography.fontWeight.medium};
  transition: background-color ${Theme.transitions.short};
  margin-left: ${Theme.spacing(4)};
  
  &:hover {
    background-color: ${Theme.colors.accent[600]};
    color: white;
  }
  
  @media (max-width: ${Theme.breakpoints.md}) {
    margin-left: 0;
    margin-top: ${Theme.spacing(4)};
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Disable body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <>
      <HeaderContainer $isScrolled={isScrolled}>
        <HeaderContent>
          <Logo to="/">
            <span>Insight</span>Blog
          </Logo>
          
          <Nav>
            <NavList>
              {navItems.map((item) => (
                <NavItem key={item.path}>
                  <NavLink 
                    to={item.path} 
                    $isActive={location.pathname === item.path}
                    $isScrolled={isScrolled}
                  >
                    {item.label}
                  </NavLink>
                </NavItem>
              ))}
              <NavItem>
                <AddBlogButton to="/add-blog">
                  Add Blog
                </AddBlogButton>
              </NavItem>
            </NavList>
          </Nav>
          
          <MobileMenuButton 
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuBar 
              $isOpen={isMenuOpen} 
              $isScrolled={isScrolled}
              animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            />
            <MenuBar 
              $isOpen={isMenuOpen} 
              $isScrolled={isScrolled}
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <MenuBar 
              $isOpen={isMenuOpen} 
              $isScrolled={isScrolled}
              animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            />
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>
      
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <MobileNavList>
              {navItems.map((item) => (
                <MobileNavItem 
                  key={item.path}
                  variants={mobileNavItemVariants}
                >
                  <MobileNavLink 
                    to={item.path} 
                    onClick={closeMenu}
                  >
                    {item.label}
                  </MobileNavLink>
                </MobileNavItem>
              ))}
              <MobileNavItem variants={mobileNavItemVariants}>
                <AddBlogButton to="/add-blog" onClick={closeMenu}>
                  Add Blog
                </AddBlogButton>
              </MobileNavItem>
            </MobileNavList>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;