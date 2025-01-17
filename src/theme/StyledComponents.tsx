import styled from 'styled-components';


export const Text = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-family:"Lato Light";
  font-size:1rem;
`

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  outline: ${({ theme }) => theme.colors.border};
`
export const LanguageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  outline: ${({ theme }) => theme.colors.languageContainerOutline};
`
export const ContainerHistory = styled.div`
  background-color: ${({ theme }) => theme.colors.containerHistoryBackground};
  color: ${({ theme }) => theme.colors.text};
  outline: ${({ theme }) => theme.colors.languageContainerOutline};
`

export const TabContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.tabBackground};
  color: ${({ theme }) => theme.colors.text};
  outline:${({ theme }) => theme.colors.border};
 
`

export const TabItem = styled.div`
  background-color: ${({ theme }) => theme.colors.tabBackground};
  color: ${({ theme }) => theme.colors.text};
  outline: ${({ theme }) => theme.colors.border};`

export const DarkLi = styled.li`
  color: ${({ theme }) => theme.colors.primary};
`

export const DropCapP = styled.p`
  color: ${({ theme }) => theme.colors.dropCapPColor};
`

export const DropCapPDecorater = styled.p`
  color: ${({ theme }) => theme.colors.dropCapPDecoraterColor};
`

export const CarouselBackground = styled.div`
  background: ${({ theme }) => theme.colors.carouselBackground};
  outline: ${({ theme }) => theme.colors.border};

`