import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const toggleCompareItem = (product) => {
    setCompareItems((prev) => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 2) {
          // Replace the second item if already 2
          return [prev[0], product];
        }
        return [...prev, product];
      }
    });
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider value={{ compareItems, toggleCompareItem, isCompareOpen, setIsCompareOpen, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
