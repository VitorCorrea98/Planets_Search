import { createContext } from 'react';
import { ContextType } from '../type';

const RootContext = createContext<ContextType>({
  planets: {
    planetsList: [],
  },
  filters: {
    handleChange: () => {},
    filter: [],
    columnList: [],
    handleDelete: () => {},
    deleteAllFilter: () => {},
  },
});

export default RootContext;
