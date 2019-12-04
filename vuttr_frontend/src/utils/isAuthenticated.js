import * as jwtDecode  from 'jwt-decode';

export const isAuthenticated = (authToken) => {
    if (authToken) {
        var decoded = jwtDecode(authToken);
        var d = new Date();
        if (d.getTime() < decoded.exp) {
            return false;
        }
        return true;
    }
    return false;
}

