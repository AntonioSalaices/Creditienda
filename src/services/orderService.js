import env from "react-dotenv";
import { SESSION_KEY } from '../utils/constants';

class OrderService {
    saveOrder = async (orderData) => {
        try {
            const token = sessionStorage.getItem(SESSION_KEY);
            const bearerToken = `Bearer ${token}`;
            const response = await fetch(env.API_URL + env.ORDER_ENDPOINT, {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            });
            return (await response.text());
        } catch (error) {
            console.error("error", error)
        }
    }
}

export default OrderService;