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

export type PlanetType = { [x: string]: string };

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
  }
};

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
