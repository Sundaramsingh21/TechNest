import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios"
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [LoaderF, setLoaderF] = useState(false)
    const [cartItems, setCartItems] = useState({});

    const url = "https://technest-backend-veij.onrender.com";
    
    const [Token, setToken] = useState("")
    const [food_list, setfood_list] = useState([])


    const AddToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((cartItems) => ({ ...cartItems, [itemId]: 1 }))
        }
        else {
            setCartItems((cartItems) => ({ ...cartItems, [itemId]: cartItems[itemId] + 1 }))
        }
        if (Token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { Token } })
        }
    }

    const RemoveFromCart = async (itemId) => {
        setCartItems((cartItems) => ({ ...cartItems, [itemId]: cartItems[itemId] - 1 }))
        if (Token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { Token } });

        }
    }

    const getTotalCartAmount = () => {
        if (food_list.length === 0) return 0;
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                if (iteminfo) {
                    totalAmount += iteminfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }


    const fetchComponentlist = async () => {
        setLoaderF(true)
        const response = await axios.get(url + "/api/component/list");
        setfood_list(response.data.data)
        setLoaderF(false)
    }
    const loadCartData = async (Token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { Token } })
        setCartItems(response.data.cartData)
    }
    useEffect(() => {
        async function loadData() {
            await fetchComponentlist()

            if (localStorage.getItem("Token")) {
                setToken(localStorage.getItem("Token"))
                await loadCartData(localStorage.getItem("Token"));
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        AddToCart,
        RemoveFromCart,
        getTotalCartAmount,
        url,
        Token,
        setToken,
        LoaderF
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
