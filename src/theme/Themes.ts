import type { Theme } from "../types/theme";

export const LightTheme: Theme = {
  colors: {
    background: "white",
    tabBackground:"#414f6b",
    containerHistoryBackground:'transparent',
    carouselBackground:"#414f6bd4",
    text: "black",
    primary: "#414f6b",
    bodyText:'black',
    border:'1px solid transparent',
    languageContainerOutline:'1px solid transparent',
    dropCapPColor:'rgba(65, 79, 107, 0.2901960784)',
    dropCapPDecoraterColor:'#414f6b'
  }
};

export const DarkTheme: Theme = {
  colors: {
    background: "black",
    tabBackground:"black",
    containerHistoryBackground:'black',
    carouselBackground:"black",
    text: "white",
    primary: "white",
    bodyText:'black',
    border:'1px solid white',
    languageContainerOutline:'1px solid white',
    dropCapPColor:'white',
    dropCapPDecoraterColor:'white'
  }
};

export const CustomTheme: Theme = {
    colors: {
      background: "red",
      tabBackground:"red",
      containerHistoryBackground:'red',
      carouselBackground:"red",
      text: "white",
      primary: "white",
      bodyText:'red',
      border:'1px solid white',
      languageContainerOutline:'1px solid white',
      dropCapPColor:'white',
      dropCapPDecoraterColor:'white'
    }
  };