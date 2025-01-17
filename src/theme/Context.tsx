import type { ThemeContext, Theme, ThemeProviderProps } from "../types/theme";
import { createContext, useContext, useState } from "react";
import { LightTheme, DarkTheme } from "../theme/Themes";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { Mode } from "../types/theme";

import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
    setDefaultTheme,
    setThemeObject
} from "../store/reducer";

const initialValue = {
    changeMode: () => { },
    mode: Mode.Light
};

const AppThemeContext = createContext<ThemeContext>(initialValue);

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {


    const dispatch = useDispatch();


    const [mode, setMode] = useState<Mode>(Mode.Light);

    const theme = useSelector((state: RootState) => state.reducer.theme);
    const customTheme = useSelector(
        (state: RootState) => state.reducer.theme
    );

    const changeMode = (mode: Mode) => {

        switch (mode) {
            case Mode.Light:


                dispatch(setThemeObject(LightTheme));

                break;
            case Mode.Dark:


                dispatch(setThemeObject(DarkTheme));
                break;
            case Mode.Custom:


                dispatch(setThemeObject(DarkTheme));

                break;

        }
        dispatch(setDefaultTheme(mode));
    };

    return (
        <AppThemeContext.Provider value={{ mode, changeMode }}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(AppThemeContext);

export default AppThemeProvider;
