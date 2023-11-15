import { createContext } from 'react';
import { ContextType } from '../type';

const RootContext = createContext<ContextType>({
  planets: {
    planetsList: [],
  },
  filters: {
    handleChange: () => { },
    filter: [],
    columnList: [],
    handleDelete: () => { },
    deleteAllFilter: () => { },
    handleOrder: () => { },
  },
  order: {
    column: 'population',
    sort: '',
  },
});

export default RootContext;
