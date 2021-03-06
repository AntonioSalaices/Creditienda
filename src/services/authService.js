import env from "react-dotenv";

class AuthService {
    login = async (userData) => { 
        try {
            const response = await fetch(env.API_URL + env.AUTH_ENDPOINT, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': env.COOKIE
                }
            });
            
            return (await response.json());
        } catch (error) {
            console.error("error", error)
        }
    }
}

export default AuthService;