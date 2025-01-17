// src/hooks/useLocalStorage.jsx

import { useState } from "react";
import { User } from "../useAuth";

export const useLocalStorage = (keyName: string, defaultValue: User) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            console.log(err);

            return defaultValue;
        }
    });
    const setValue = (newValue: UserActivation) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {
            console.log(err);
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};