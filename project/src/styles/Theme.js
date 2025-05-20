const Theme = {
  colors: {
    // Primary color with shades
    primary: {
      50: '#E6EFF5',
      100: '#C0D7E8',
      200: '#93B9D8',
      300: '#689BC8',
      400: '#3D7DB8',
      500: '#0F4C81', // Main primary color
      600: '#0C4373',
      700: '#093866',
      800: '#062E58',
      900: '#03234B'
    },
    // Secondary color with shades
    secondary: {
      50: '#E0F7F6',
      100: '#B3ECE8',
      200: '#80E0D9',
      300: '#4DD3C9',
      400: '#26C7BD',
      500: '#00A896', // Main secondary color
      600: '#00967B',
      700: '#008060',
      800: '#006A46',
      900: '#00542C'
    },
    // Accent color with shades
    accent: {
      50: '#FFEEEE',
      100: '#FFD4D4',
      200: '#FFB7B7',
      300: '#FF9A9A',
      400: '#FF8282',
      500: '#FF6B6B', // Main accent color
      600: '#E66161',
      700: '#CC5757',
      800: '#B34D4D',
      900: '#994343'
    },
    // Success color with shades
    success: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50', // Main success color
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20'
    },
    // Warning color with shades
    warning: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107', // Main warning color
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00'
    },
    // Error color with shades
    error: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#F44336', // Main error color
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C'
    },
    // Neutral colors for dark theme
    neutral: {
      50: '#1A1A1A',
      100: '#242424',
      200: '#2D2D2D',
      300: '#363636',
      400: '#404040',
      500: '#595959',
      600: '#737373',
      700: '#8C8C8C',
      800: '#A6A6A6',
      900: '#BFBFBF'
    },
    // Text colors for dark theme
    text: {
      primary: '#FFFFFF',
      secondary: '#A6A6A6',
      disabled: '#737373',
      hint: '#595959',
      white: '#FFFFFF'
    },
    // Background colors for dark theme
    background: {
      paper: '#242424',
      default: '#1A1A1A',
      dark: '#121212'
    }
  },
  // Spacing based on 8px grid system
  spacing: (multiplier = 1) => `${8 * multiplier}px`,
  
  // Typography settings
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    lineHeight: {
      body: 1.5,
      heading: 1.2
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700
    }
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px'
  },
  
  // Border radius
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%'
  },
  
  // Shadows for dark theme
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.4)',
    large: '0 8px 24px rgba(0, 0, 0, 0.5)'
  },
  
  // Transitions
  transitions: {
    short: '0.2s ease-in-out',
    medium: '0.3s ease-in-out',
    long: '0.5s ease-in-out'
  },
  
  // Z-index
  zIndex: {
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
};

export default Theme;