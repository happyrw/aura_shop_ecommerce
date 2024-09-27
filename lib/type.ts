// Create interface for each in here ("use client";
//     import { createContext, useContext, useState } from "react";
//     import toast from "react-hot-toast";
    
//     const context = createContext();
    
//     export const StateContext = ({ children }: { children: React.ReactNode }) => {
//         const [showCart, setShowCart] = useState(false);
//         const [cartItems, setCartItems] = useState([]);
//         const [totalPrice, setTotalPrice] = useState(0);
//         const [totalQuantities, setTotalQuantities] = useState(0);
//         const [qty, setQty] = useState(1);
//         const [imageIndex, setImageIndex] = useState(0);
    
//         let foundProduct;
//         let index;
    
//         // Add/Remove quantity
//         const incQty = () => setQty((prevQty) => prevQty + 1);
//         const decQty = () => {
//             setQty((prevQty) => {
//                 if (prevQty - 1 < 1) return 1;
//                 return prevQty - 1
//             })
//         };
    
//         // Add product
//         const onAdd = (product, quantity) => {
//             const checkProductInCart = cartItems.find((item) => item._id === product._id);
//             setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
//             setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    
//             if (checkProductInCart) {
//                 const updatedCartItems = cartItems.map((cartProduct) => {
//                     if (cartProduct._id === product._id) return {
//                         ...cartProduct,
//                         quantity: cartProduct.quantity + quantity
//                     }
//                 });
//                 setCartItems(updatedCartItems);
//             } else {
//                 product.quantity = quantity;
//                 setCartItems([...cartItems, { ...product }]);
//             };
    
//             toast.success(${qty} ${product.name} added to cart.);
//         };
    
//         // Remove product
//         const onRemove = (product) => {
//             foundProduct = cartItems.find((item) => item._id === product._id);
//             const newCartItem = cartItems.filter((item) => item._id !== product._id);
//             setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
//             setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
    
//             setCartItems(newCartItem);
//         };
    
//         // Add/Remove quantity inside cart
//         const toggleCartItemQuantity = (id, value) => {
//             const updatedCartItems = cartItems.map((item) => {
//                 if (item._id === id) {
//                     if (value === 'inc') {
//                         return {
//                             ...item,
//                             quantity: item.quantity + 1
//                         };
//                     } else if (value === 'dec' && item.quantity > 1) {
//                         return {
//                             ...item,
//                             quantity: item.quantity - 1
//                         };
//                     }
//                 }
//                 return item;
//             });
    
//             setCartItems(updatedCartItems);
    
//             const foundProduct = cartItems.find((item) => item._id === id);
//             if (value === 'inc') {
//                 setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
//                 setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
//             } else if (value === 'dec' && foundProduct.quantity > 1) {
//                 setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
//                 setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
//             }
//         };
    
    
//         return (
//             <context.Provider
//                 value={{
//                     showCart,
//                     cartItems,
//                     totalPrice,
//                     totalQuantities,
//                     qty,
//                     incQty,
//                     decQty,
//                     onAdd,
//                     toggleCartItemQuantity,
//                     setShowCart,
//                     onRemove,
//                     imageIndex,
//                     setImageIndex,
//                     setCartItems,
//                     setTotalPrice,
//                     setTotalQuantities,
//                 }}
//             >
//                 {children}
//             </context.Provider>
//         )
//     };
    
//     export const useStateContext = () => useContext(context);)

