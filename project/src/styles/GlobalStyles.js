import { createGlobalStyle } from 'styled-components';
import Theme from './Theme';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${Theme.typography.fontFamily};
    line-height: ${Theme.typography.lineHeight.body};
    color: ${Theme.colors.text.primary};
    background-color: ${Theme.colors.background.default};
    transition: background-color ${Theme.transitions.medium};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${Theme.typography.fontWeight.bold};
    line-height: ${Theme.typography.lineHeight.heading};
    margin-bottom: ${Theme.spacing(2)};
    color: ${Theme.colors.text.primary};
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: ${Theme.spacing(2)};
    color: ${Theme.colors.text.primary};
  }

  a {
    color: ${Theme.colors.primary[400]};
    text-decoration: none;
    transition: color ${Theme.transitions.short};
    
    &:hover {
      color: ${Theme.colors.primary[300]};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: ${Theme.typography.fontFamily};
    background-color: ${Theme.colors.background.paper};
    color: ${Theme.colors.text.primary};
    border: 1px solid ${Theme.colors.neutral[300]};
    
    &:hover {
      background-color: ${Theme.colors.neutral[200]};
    }
  }

  ul, ol {
    margin-left: ${Theme.spacing(3)};
    margin-bottom: ${Theme.spacing(2)};
    color: ${Theme.colors.text.primary};
  }

  /* Utility classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${Theme.spacing(2)};
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Selection color */
  ::selection {
    background-color: ${Theme.colors.primary[500]};
    color: ${Theme.colors.text.white};
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${Theme.colors.background.default};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Theme.colors.neutral[400]};
    border-radius: ${Theme.borderRadius.small};
    
    &:hover {
      background: ${Theme.colors.neutral[500]};
    }
  }

  /* Media Queries */
  @media (max-width: ${Theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    h4 {
      font-size: 1.25rem;
    }
    
    h5 {
      font-size: 1.1rem;
    }
  }
`;

export default GlobalStyles;