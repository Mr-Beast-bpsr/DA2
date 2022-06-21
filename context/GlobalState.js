// src/context/state.js
import React,{ createContext, useContext,useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
 let [active,setActive] = useState(false);

  return (
    <AppContext.Provider value={{active,setActive}}>
      {children}
    </AppContext.Provider>
  );
}



const BalanceContext = createContext();
export function BalanceWrapper({ children }) {
  const [avaxBalance,setAvaxBalance] = useState();
  return (
    <BalanceContext.Provider value={{avaxBalance,setAvaxBalance}}>
      {children}
    </BalanceContext.Provider>
  )
}

const FilterContext = createContext();
export function FilterWrapper({ children }) {
  const [filterArray,setFilterArray] = useState({list:[0,0,0,0,0,0,0,0,0]});
  return (
    <FilterContext.Provider value={{filterArray,setFilterArray}}>
      {children}
    </FilterContext.Provider>
  )
}
export function useFilterContext() {
  return useContext(FilterContext);
}
export function useBalanceContext() {

  return useContext(BalanceContext);
}
export function useAppContext() {
    return useContext(AppContext);
  }

// const LogContext = createContext()
// export function LogStatus({children}){
//     let [isConnected,setIsConnected] = useState(false);

//     return (
//         <LogContext.Provider value={{isConnected,setIsConnected}}>
//             {children}
//         </LogContext.Provider>
//     )
// }
// export function useConnectionContext(){
//     return useContext(LogContext)
// }

