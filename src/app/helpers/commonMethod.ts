export const isWhitespaces = (str: string): boolean => {
    return /^\s*$/.test(str);
}

export const isNullOrEmpty = (str: string | null): boolean => {
    if (str == null) {
        return true
    }
    else {
        return isWhitespaces(str);
    }
}

