import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import {  vi} from "vitest";
import { mockTest } from "./mockTest";

describe('Testa a aplicação', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockReturnValueOnce({
      json: async () => ({
        results:  mockTest
      }) as Response
    }) 
    render(<App />);
  });

  test('Teste se os botões começam com o valor correto', async () => { 
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


  it('should update form data on input change', async () => {
    const nameInput = screen.getByTestId('name-filter');

    screen.debug();
    fireEvent.change(nameInput, { target: { value: 'aa' } });
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

});

