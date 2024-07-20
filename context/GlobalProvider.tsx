// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ip_adress } from '@/constants/constants';

// interface Destination {
//   id: number;
// }

// interface DestinationContextType {
//   savedDestinations: Destination[];
//   addDestination: (destinationId: number) => Promise<void>;
//   removeDestination: (destinationId: number) => void;
//   isDestinationSaved: (destinationId: number) => boolean;
// }

// const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

// export const useDestinationContext = () => {
//   const context = useContext(DestinationContext);
//   if (!context) {
//     throw new Error('useDestinationContext must be used within a DestinationProvider');
//   }
//   return context;
// };

// export const DestinationProvider = ({ children }: any) => {
//   const [savedDestinations, setSavedDestinations] = useState<Destination[]>([]);

//   useEffect(() => {
//     const loadSavedDestinations = async () => {
//       try {
//         const storedDestinations = await AsyncStorage.getItem('savedDestinations');
//         if (storedDestinations) {
//           setSavedDestinations(JSON.parse(storedDestinations));
//         }
//       } catch (error) {
//         console.error('Error loading saved destinations:', error);
//       }
//     };

//     loadSavedDestinations();
//   }, []);

//   useEffect(() => {
//     AsyncStorage.setItem('savedDestinations', JSON.stringify(savedDestinations));
//   }, [savedDestinations]);

//   const addDestination = async (destinationId: number) => {
//     try {
//       const response = await fetch(`http://${ip_adress}:8080/api/destinations/${destinationId}`);
//       if (response.ok) {
//         const destinationData = await response.json();
//         setSavedDestinations((prevDestinations) => [...prevDestinations, destinationData]);
//       } else {
//         console.error('Error fetching destination data:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching destination data:', error);
//     }
//   };
//   const isDestinationSaved = (destinationId: number): boolean => {
//     return savedDestinations.some((dest) => dest.id === destinationId);
//   };

//   const removeDestination = (destinationId: number) => {
//     setSavedDestinations((prevDestinations) =>
//       prevDestinations.filter((dest) => dest.id !== destinationId)
//     );
//   };

//   return (
//     <DestinationContext.Provider value={{ savedDestinations, addDestination, removeDestination, isDestinationSaved }}>
//       {children}
//     </DestinationContext.Provider>
//   );
// };
// AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ip_adress } from '@/constants/constants';

interface FirstTimeContextProps {
  isFirstTime: boolean;
  setFirstTime: (value: boolean) => void;
}

interface Destination {
  id: number;
}

interface DestinationContextType {
  savedDestinations: Destination[];
  addDestination: (destinationId: number) => Promise<void>;
  removeDestination: (destinationId: number) => void;
  isDestinationSaved: (destinationId: number) => boolean;
}

// FirstTime Context
const FirstTimeContext = createContext<FirstTimeContextProps | undefined>(undefined);

export const useFirstTime = () => {
  const context = useContext(FirstTimeContext);
  if (context === undefined) {
    throw new Error('useFirstTime must be used within a FirstTimeProvider');
  }
  return context;
};

export const FirstTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const value = await AsyncStorage.getItem('@isFirstTime');
        if (value !== null) {
          setIsFirstTime(JSON.parse(value));
        } else {
          await AsyncStorage.setItem('@isFirstTime', JSON.stringify(true));
        }
      } catch (e) {
        console.error('Failed to load isFirstTime state.', e);
      }
    };

    checkFirstTime();
  }, []);

  const setFirstTime = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('@isFirstTime', JSON.stringify(value));
      setIsFirstTime(value);
    } catch (e) {
      console.error('Failed to set isFirstTime state.', e);
    }
  };

  return (
    <FirstTimeContext.Provider value={{ isFirstTime, setFirstTime }}>
      {children}
    </FirstTimeContext.Provider>
  );
};

// Destination Context
const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

export const useDestinationContext = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestinationContext must be used within a DestinationProvider');
  }
  return context;
};

export const DestinationProvider = ({ children }: any) => {
  const [savedDestinations, setSavedDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const loadSavedDestinations = async () => {
      try {
        const storedDestinations = await AsyncStorage.getItem('savedDestinations');
        if (storedDestinations) {
          setSavedDestinations(JSON.parse(storedDestinations));
        }
      } catch (error) {
        console.error('Error loading saved destinations:', error);
      }
    };

    loadSavedDestinations();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('savedDestinations', JSON.stringify(savedDestinations));
  }, [savedDestinations]);

  const addDestination = async (destinationId: number) => {
    try {
      const response = await fetch(`http://${ip_adress}:8080/api/destinations/${destinationId}`);
      if (response.ok) {
        const destinationData = await response.json();
        setSavedDestinations((prevDestinations) => [...prevDestinations, destinationData]);
      } else {
        console.error('Error fetching destination data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching destination data:', error);
    }
  };

  const removeDestination = (destinationId: number) => {
    setSavedDestinations((prevDestinations) =>
      prevDestinations.filter((dest) => dest.id !== destinationId)
    );
  };

  const isDestinationSaved = (destinationId: number): boolean => {
    return savedDestinations.some((dest) => dest.id === destinationId);
  };

  return (
    <DestinationContext.Provider value={{ savedDestinations, addDestination, removeDestination, isDestinationSaved }}>
      {children}
    </DestinationContext.Provider>
  );
};

// Combine Providers
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <FirstTimeProvider>
      <DestinationProvider>
        {children}
      </DestinationProvider>
    </FirstTimeProvider>
  );
};
