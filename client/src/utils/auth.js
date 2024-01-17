// use this to decode a token and get the user's information out of it
import {jwtDecode} from 'jwt-decode';



// create a new class to instantiate for a user
class AuthService {
    // get user data
    getProfile() {
        return jwtDecode(this.getToken());
    }

    // check if user's logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // handwaiving here
    }

    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }
    storeUserId(idToken) {
        const decoded = jwtDecode(idToken);
        const userId = decoded._id;
        localStorage.setItem('user_id', userId);
    }

    login(idToken) {
        // Ensure idToken is not undefined before storing
        console.log('Received idToken:', idToken);
        if (idToken) {
            // Saves user token to localStorage
            localStorage.setItem('id_token', idToken);

            // Decode and store _id in localStorage
            this.storeUserId(idToken);

            window.location.assign('/');
        } else {
            console.error("Received undefined idToken during login.");
        }
    }


    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_id')
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();
