import { createContext } from 'react';
import { ContextType } from '../type';

const PlanetContext = createContext<ContextType>({
  planets: [],
});

export default PlanetContext;
