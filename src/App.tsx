import { useContext, useEffect, useState } from 'react';
import './App.css';
import { APIType } from './type';
import TablePlanets from './components/TablePlanets';
import PlanetContext from './context/myContext';

function App() {
  const [planets, setPlanets] = useState<APIType[]>([]);

  const APIFetch = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const data: APIType[] = results;
      data.forEach((planet) => delete planet.residents);
      setPlanets(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    APIFetch();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets } }>
      <TablePlanets />
    </PlanetContext.Provider>
  );
}

export default App;
