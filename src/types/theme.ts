export enum Mode {
    Light = "light",
    Dark = "dark",
    Custom  = "custom"
  }
  
  export interface ThemeProviderProps {
    children: React.ReactNode;
  }
  
  export interface ThemeContext {
    changeMode: (mode: Mode) => void;
    mode: Mode;
  }
  
  export interface Theme {
    colors: {
      background: string;
      tabBackground:string;
      containerHistoryBackground:string;
      carouselBackground:string;
      text: string;
      primary:string;
      bodyText:string;
      border:string;
      languageContainerOutline:string;
      dropCapPColor:string;
      dropCapPDecoraterColor:string;
    };
  }
  