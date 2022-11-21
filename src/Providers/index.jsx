import { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [days, setDays] = useState([]);
  const [returnedData, setReturndData] = useState([]);

  const addDay = (data) => {
    const verificacao = days.find((e) => e === data.day);
    if (!verificacao) {
      const newArr = [...days, data.day].sort();
      setDays(newArr);
    }
  };

  return (
    <DataContext.Provider
      value={{ days, setDays, require, addDay, returnedData, setReturndData }}
    >
      {children}
    </DataContext.Provider>
  );
};
