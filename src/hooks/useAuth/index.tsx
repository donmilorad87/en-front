import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Your types for user data
interface UserData {
    username: string;
    email: string;
    role: number;
    twofactorauth: boolean;
}

export interface User {
    token: string;
    isAuth: boolean;
    user: UserData;
}

interface AuthContextType {
    user: User;
    is2FAVerified: boolean;
    login: (data: User) => Promise<void>;
    logout: () => void;
    verify2FACode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
    userData?: User; // Add userData as an optional prop
}
import { useDispatch, useSelector } from "react-redux";
import {
    setUser
} from "../../store/reducer";
import { RootState } from "../../store/store";

export const AuthProvider = ({ children, userData }: AuthProviderProps) => {
    const dispatch = useDispatch();

    const user: User = useSelector(
        (state: RootState) => state.reducer.user
    );
    const [is2FAVerified, setIs2FAVerified] = useState(false);
    const navigate = useNavigate();

    const login = async (data: User): Promise<void> => {
        data.isAuth = true;
        dispatch(setUser(data));

        if (data.user.twofactorauth) {
            navigate("/verify-2fa");
        } else {
            navigate("/profile");
        }
    };

    const logout = (): void => {
        dispatch(setUser({
            token: '',
            isAuth: false,
            user: {
                username: '',
                email: '',
                role: 0,
                twofactorauth: false
            }
        }));
        setIs2FAVerified(false);
        navigate("/", { replace: true });
    };

    const verify2FACode = async (code: string): Promise<boolean> => {
        if (code === "0000") {
            setIs2FAVerified(true);
            navigate("/secret");
            return true;
        }
        return false;
    };

    const value: AuthContextType = {
        user,
        is2FAVerified,
        login,
        logout,
        verify2FACode,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to access auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};