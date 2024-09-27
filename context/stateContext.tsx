"use client";
import { CartItemCart } from "@/components/Cart";
import { ProductType } from "@/components/ProductDetailComponent";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

// Interface for each Cart Item
interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    [key: string]: string | number | boolean | undefined; // Allow additional properties if needed
}

// Interface for Product
interface CartItem extends ProductType {
    quantity: number; // Ensure quantity is present when used in the cart
}

// Interface for Context Value
interface StateContextType {
    showCart: boolean;
    cartItems: CartItem[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    imageIndex: number;
    incQty: () => void;
    decQty: () => void;
    onAdd: (product: ProductType, quantity: number) => void;
    onRemove: (product: CartItemCart) => void;
    toggleCartItemQuantity: (id: string, value: "inc" | "dec") => void;
    setShowCart: (value: boolean) => void;
    setCartItems: (items: CartItem[]) => void;
    setTotalPrice: (price: number) => void;
    setTotalQuantities: (quantity: number) => void;
    setImageIndex: (index: number) => void;
}

const context = createContext<StateContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);

    let foundProduct: CartItem | undefined;

    // Add/Remove quantity
    const incQty = () => setQty((prevQty) => prevQty + 1);
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    // Add product
    const onAdd = (product: ProductType, quantity: number) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id)
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
                return cartProduct;
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product } as CartItem]);
        }

        toast.success(`${qty} ${product.name} added to cart.`);
    };

    // Remove product
    const onRemove = (product: CartItemCart) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItem = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct?.price || 0) * (foundProduct?.quantity || 0));
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - (foundProduct?.quantity || 0));

        setCartItems(newCartItem);
    };

    // Add/Remove quantity inside cart
    const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
        const updatedCartItems = cartItems.map((item) => {
            if (item._id === id) {
                if (value === "inc") {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                } else if (value === "dec" && item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
            }
            return item;
        });

        setCartItems(updatedCartItems);

        const foundProduct = cartItems.find((item) => item._id === id);
        if (value === "inc") {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + (foundProduct?.price || 0));
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === "dec" && (foundProduct && foundProduct?.quantity > 1)) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct?.price || 0));
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        }
    };

    return (
        <context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                setShowCart,
                onRemove,
                imageIndex,
                setImageIndex,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </context.Provider>
    );
};

export const useStateContext = () => {
    const ctx = useContext(context);
    if (!ctx) throw new Error("useStateContext must be used within a StateContext provider");
    return ctx;
};
