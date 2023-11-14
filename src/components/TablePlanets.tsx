import { useContext } from 'react';
import RootContext from '../context/myContext';

function TablePlanets() {
  const { planets: { planetsList } } = useContext(RootContext);
  const tableHeaderNames = ['Name', 'Rotation Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHeaderNames.map((header) => (
              <th key={ header }>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetsList.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td className="films">
                {planet.films.map((film) => (
                  <p key={ film }>{film}</p>
                ))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePlanets;
