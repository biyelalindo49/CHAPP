import React, { createContext, useContext, useMemo, useState } from "react";

export type MenuItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
};

type MenuContextValue = {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
};

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Garden Salad",
    category: "Starter",
    description: "Fresh seasonal vegetables with a light dressing.",
    price: "R95",
  },
  {
    id: 2,
    name: "Grilled Beef Fillet",
    category: "Main Course",
    description: "Tender beef fillet with seasonal vegetables.",
    price: "R285",
  },
  {
    id: 3,
    name: "Seafood Platter",
    category: "Seafood",
    description: "A selection of fresh seafood prepared by the chef.",
    price: "R320",
  },
  {
    id: 4,
    name: "Chocolate Dessert",
    category: "Dessert",
    description: "Rich chocolate dessert with a delicate garnish.",
    price: "R120",
  },
];

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: React.PropsWithChildren) {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const value = useMemo<MenuContextValue>(
    () => ({
      menuItems,
      addMenuItem: (item) => {
        setMenuItems((current) => {
          const nextId = current.reduce(
            (highestId, menuItem) => Math.max(highestId, menuItem.id),
            0,
          ) + 1;
          return [...current, { ...item, id: nextId }];
        });
      },
      updateMenuItem: (updatedItem) => {
        setMenuItems((current) =>
          current.map((item) =>
            item.id === updatedItem.id ? updatedItem : item,
          ),
        );
      },
      deleteMenuItem: (id) => {
        setMenuItems((current) => current.filter((item) => item.id !== id));
      },
    }),
    [menuItems],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
