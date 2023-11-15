export type APIType = {
  climate: string,
  created: string,
  diameter: string,
  edited: string,
  films: string[],
  gravity: string,
  name: string,
  orbital_period: string,
  population: string,
  rotation_period: string,
  surface_water: string,
  terrain: string,
  url: string,
  residents?: any
};

export type OrderFilterType = 'ASC' | 'DSC';

export type OrderType = {
  column: string,
  sort: string
};

export type ContextType = {
  planets: {
    planetsList: APIType[]
  },
  filters: {
    filter: {
      column: string,
      comparison: string
      inputValue: number
    }[],
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    columnList: string[],
    handleDelete: (form: FilterFormType) => void,
    deleteAllFilter: () => void,
    handleOrder: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  },
  order: {
    column: string,
    sort: string
  }
};

export const ColumnListInitial = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export type FilterFormType = {
  column: string,
  comparison: string,
  inputValue: number
};

export const FilterFormInitialValue = {
  column: 'population',
  comparison: 'maior que',
  inputValue: 0,
};
