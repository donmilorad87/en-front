import cookie from 'js-cookie'
import { User } from '../hooks/useAuth'

// set in cookie

export const setCookie = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

// remove from cookie

export const removeCookie = (key: string): void => {

    cookie.remove(key, {
        expires: 1
    })

}

// get from cookie such as stored token
// will be useful when we need to make request to server with token

export const getCookie = (key: string): string | boolean => {

    return cookie.get(key) || false

}

// set in localstorage

export const setLocalStorage = (key: string, value: object): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// remove from localstorage

export const removeLocalStorage = (key: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

// authenticate user by passing data to cookie and localstorage during signin

/* export const authenticate = (response:User, next:void) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response)
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
} */

// access user info from localstorage

export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user') || '[]')
            } else {
                return false
            }
        }
    }
}

// logout

export const signout = (next: () => void): void => {
    removeCookie('token')
    if (getCookie('G_AUTHUSER_H')) {
        removeCookie('G_AUTHUSER_H')
    }
    if (getCookie('G_ENABLED_IDPS')) {
        removeCookie('G_ENABLED_IDPS')
    }
    removeLocalStorage('user')
    next()
}

/* export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORADGE helpers', response)
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
} */

export const usernameChecker = (x: string) => {
    let array = []


    if (/[^a-zA-Z0-9.\-_@]/.test(x)) {
        array.push('Username must not contain any special characters. (. and - and _ and @ are allowed)');
    }
    if (countSpecialCharacters(x)) {
        array.push('There is maximum 4 special caracters allowed')
    }
    if (x.length < 8) {
        array.push('Username must be at least 8 characters long')
    }

    if (x.replace(/[^0-9]/g, "").length > 6) {
        array.push('There is maximum 6 numbers in username allowed')
    }


    return array;

}

const countSpecialCharacters = (s: string) => {
    if (typeof s !== 'string') return false; // Handle non-string or undefined inputs early

    // Regex to match special characters
    const specialChars = /[^\w\s.@-]/g;  // This matches any character that is NOT a word character (a-zA-Z0-9_), a space, dot, @, or hyphen

    const matches = s.match(specialChars); // Find all matches

    // If there are more than 4 special characters, return true
    return matches && matches.length > 4;
};

export const passwordChecker = (password: string): string[] => {
    let array = []

    if (password.length < 8) {
        array.push('Pasword must be at least 8 characters long is required')
    }
    if (!/\d/.test(password)) {
        array.push('Password must have at least 1 number')
    }
    if (!password.match(/[a-z]/)) {
        array.push('Password must have at least 1 lower case character')
    }
    if (!password.match(/[A-Z]/)) {
        array.push('Password must have at least 1 upper case character')
    }
    if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~_\:]/.test(password)) {
        array.push('Password must have at least 1 special character');
    }

    return array;

}

export const emailChecker = (email: string) => {
    const regex = /^(?=[a-zA-Z0-9@._%+-]{1,256}$)(?=\S)(?=\S{1,256}@)(?=\S+\.[a-zA-Z]{2,})(?!.*[^\x00-\x7F]+$)(?!.*[^a-zA-Z0-9@._%+-]).*$/;

    let array: string[] = []

    if (email.length < 1) {
        array.push('Email must be provided.');
    }
    if (!regex.test(String(email).toLowerCase())) {
        array.push('Email must be in e-mail format.');
    }

    return array;
}

export const confirmPasswordChecker = (x: string, y: string) => {
    let array = []

    if (x !== y) {
        array.push('Password does not match.')
    }
    if (x === '') {
        array.push('Confirm password is required.')
    }

    return array

}


export const iAgreeChecker = (x: string[]): string[] => {

    let array = []

    if (!x) {
        array.push('You must agree Therms and Conditions')
    }

    return array

}