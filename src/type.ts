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

export type ContextType = {
  planets: {
    planetsList: APIType[]
  },
  filters: {
    filter: {
      name: string,
      column: string,
      comparison: string
      inputValue: string
    },
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  }
};

export type FilterFormType = {
  name: string,
  column: string,
  comparison: string,
  inputValue: string
};

export const FilterFormInitialValue = {
  name: '',
  column: 'population',
  comparison: 'maiorQue',
  inputValue: '',
};
