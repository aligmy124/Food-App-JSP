import { createContext, useState } from "react";

export const MenuContext = createContext("");

export default function MenuContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </MenuContext.Provider>
    );
}
