import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Item = {
  id: string;
  image: string;
  name: string;
  description: string;
  size: string;
  price: string | number;
};

type ItemsContextType = {
  items: Item[];
  addItem: (item: Item) => void;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems((prev) => [item, ...prev]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used inside ItemsProvider');
  }
  return context;
};