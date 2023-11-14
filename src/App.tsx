import React, { useEffect, useState } from 'react';
import './App.css';
import { APIType, FilterFormInitialValue, FilterFormType } from './type';
import TablePlanets from './components/TablePlanets';
import PlanetContext from './context/myContext';
import FormFilter from './components/FormFilter';

function App() {
  const [planetsList, setPlanetsList] = useState<APIType[]>([]);
  const [backUpList, setBackUpList] = useState<APIType[]>([]);
  const [formData, setFormData] = useState<FilterFormType>(FilterFormInitialValue);

  const APIFetch = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      const data: APIType[] = results;
      data.forEach((planet) => delete planet.residents);
      setPlanetsList(data);
      setBackUpList(data);
    } catch (error) {
      return error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, id } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (formData.name) {
      const newList = backUpList
        .filter((element) => element.name.includes(formData.name));
      setPlanetsList(newList);
    } else {
      setPlanetsList(backUpList);
    }
  }, [formData.name]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(FilterFormInitialValue);
  };

  useEffect(() => {
    APIFetch();
  }, []);

  return (
    <PlanetContext.Provider
      value={ { planets: { planetsList },
        filters: { filter: formData, handleChange } } }
    >
      <FormFilter handleSubmit={ handleSubmit } />
      <TablePlanets />
    </PlanetContext.Provider>
  );
}

export default App;
