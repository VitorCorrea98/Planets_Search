import { APIType } from '../type';

const useAPIFetch = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    const data: APIType[] = results;
    data.forEach((planet) => delete planet.residents);
    return data;
  } catch (error) {
    return error;
  }
};

export default useAPIFetch;
