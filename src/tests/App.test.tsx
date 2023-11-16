import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import {  vi} from "vitest";

vi.mock('./services/filterColumn');
vi.mock('./services/sortFilter');

describe('Testa a aplicação', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Teste se os botões começam com o valor correto', () => { 
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toHaveLength(5)
    expect(columnFilter).toHaveValue('population')
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toHaveLength(3)
    expect(comparisonFilter).toHaveValue('maior que')
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toHaveValue(0)
    expect(valueFilter).toBeInTheDocument();

    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toHaveTextContent('Enviar')
    expect(buttonFilter).toBeInTheDocument();
    fireEvent.click(buttonFilter);
    expect(columnFilter).toHaveLength(4)

    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toHaveLength(5)
    expect(columnSort).toHaveValue('population')
    expect(columnSort).toBeInTheDocument();

    const columnSortASC = screen.getByTestId('column-sort-input-asc');
    expect(columnSortASC).not.toBeChecked();
    expect(columnSortASC).toBeInTheDocument();
    fireEvent.click(columnSortASC)

    const columnSortDESC = screen.getByTestId('column-sort-input-desc');
    expect(columnSortDESC).not.toBeChecked();
    expect(columnSortDESC).toBeInTheDocument();
    fireEvent.click(columnSortDESC)


    const columnSortButton = screen.getByTestId('column-sort-button');
    expect(columnSortButton).toHaveTextContent('Ordenar')
    expect(columnSortButton).toBeInTheDocument();
    fireEvent.click(columnSortButton)
   })

  test('Se o filtro de ordem funciona', () => { 
    const columnSort = screen.getByTestId('column-sort');
    const columnASC = screen.getByTestId('column-sort-input-asc')
    const columnSortButton = screen.getByTestId('column-sort-button')

    fireEvent.change(columnSort, {target: {value: 'diameter'}})
    fireEvent.click(columnASC);
    fireEvent.click(columnSortButton);
  })


  it('should update form data on input change', () => {
    const nameInput = screen.getByTestId('name-filter');

    fireEvent.change(nameInput, { target: { value: 'aa' } });
    expect(screen.getByText('Name')).toBeInTheDocument();

  });

  // it('should apply name filter', async () => {
  //   const nameInput = await screen.findByTestId('name-filter');
  //   fireEvent.change(nameInput, { target: { value: 'Tatooine' } });

  //   expect( await screen.findAllByTestId('planet-name')).toHaveLength(1);
  // });

  // it('should apply column selection', () => {
  //   const selectColumn = screen.getByLabelText('Filter Column');
  //   fireEvent.change(selectColumn, { target: { value: 'climate' } });

  //   expect(screen.getAllByRole('cell', { name: 'Climate' })).toBeTruthy();
  // });

  // it('should apply form filter', () => {
  //   const selectColumn = screen.getByTestId('column-filter');
  //   const selectCriteria = screen.getByTestId('comparison-filter');

  //   fireEvent.change(selectColumn, { target: { value: 'surface_water' } });
  //   fireEvent.change(selectCriteria, { target: { value: 'menor que' } });

  //   screen.getByRole('button', { name: 'Enviar' }).click();

  //   expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Tatooine	')
  // });


  it('should clear all filters', () => {
    const clearFilterButton = screen.getByRole('button', { name: 'Delete all filters' });
    clearFilterButton.click();

    expect(screen.queryByText('Filter by terrain: desert')).toBeFalsy(); // Verify filter is cleared
    expect(screen.queryByText('Filter by climate: temperate')).toBeFalsy(); // Verify other filters 
  });
});

