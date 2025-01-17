import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import USA from '../assets/icons/USA.svg';
import { User } from '../hooks/useAuth';
import { LightTheme } from '../theme';

type ChosenLangageType = {
    "en-US": string,
    "sr-RS": string,
}

interface Theme {
    colors: {
        background: string;
        tabBackground: string;
        containerHistoryBackground: string;
        carouselBackground: string;
        text: string;
        primary: string;
        bodyText: string;
        border: string;
        languageContainerOutline: string;
        dropCapPColor: string;
        dropCapPDecoraterColor: string;
    };
}

export interface initialStateType {
    user: User,
    defaultLanguage: string;
    defaultLanguageImage: string;
    chosenLanguage: ChosenLangageType;
    defaultTeme: string;
    theme: Theme;
}

const initialState: initialStateType = {
    user: {
        token: '',
        isAuth: false,
        user: {
            username: '',
            email: '',
            role: 0,
            twofactorauth: false
        }
    },
    defaultLanguage: 'en-US',
    defaultLanguageImage: USA,
    chosenLanguage: {
        "en-US": 'dn',
        "sr-RS": '',
    },
    defaultTeme: 'light',
    theme: LightTheme

}

export const reducer = createSlice({
    name: 'reducer',
    initialState,
    reducers: {
        setDefaultLanguage: (state, action: PayloadAction<string>) => {
            state.defaultLanguage = action.payload;
        },
        setDefaultLanguageImage: (state, action: PayloadAction<string>) => {
            state.defaultLanguageImage = action.payload;
        },
        setChosenLanguage: (state, action: PayloadAction<ChosenLangageType>) => {
            state.chosenLanguage = action.payload;
        },
        updateCustomTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setDefaultTheme: (state, action: PayloadAction<string>) => {
            state.defaultTeme = action.payload;
        },
        setThemeObject: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
    },
})

export const {
    setDefaultLanguage,
    setDefaultLanguageImage,
    setChosenLanguage,
    updateCustomTheme,
    setUser,
    setDefaultTheme,
    setThemeObject
} = reducer.actions

export default reducer.reducer