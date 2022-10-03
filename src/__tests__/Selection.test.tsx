import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react'
import { Selection } from '../components/Selection/Selection';

const MockData = [
  {
    name: 'Glenna Reichert',
    id: 9,
  },
  {
    name: 'Kurtis Weissnat',
    id: 7,
  },
  {
    name: 'Mrs. Dennis Schulist',
    id: 6,
  },
  {
    name: 'Chelsey Dietrich',
    id: 5,
  },
];

describe('<Selection />', () => {
  let label = 'test';
  let validation = jest
    .fn()
    .mockImplementation(() => 'error message');
  let handleCallback = jest.fn();
  let selectionData = MockData;
  let fetchError = 'error';

  const component = renderer.create(
    <Selection
      label={label}
      validation={validation}
      handleCallback={handleCallback}
      selectionData={selectionData}
      fetchError={fetchError}
    />
  );

  it('Should render correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have the correct number of options", async () => {
    render(
      <Selection
        label={label}
        validation={validation}
        handleCallback={handleCallback}
        selectionData={selectionData}
        fetchError={fetchError}
      />
    );
    const options = screen.getAllByRole('button', {});
    expect(options).toHaveLength(4);
  });

  it('should have the correct label text', () => {
    render(
      <Selection
        label={label}
        validation={validation}
        handleCallback={handleCallback}
        selectionData={selectionData}
        fetchError={fetchError}
      />
    );
    const labelChecked = screen.getByLabelText(label, {});
    expect(labelChecked).toBeTruthy();
  })

  it('should call the callback funtion on click', () => {
    render(
      <Selection
        label={label}
        validation={validation}
        handleCallback={handleCallback}
        selectionData={selectionData}
        fetchError={fetchError}
      />
    );

    const data = MockData[0].name;
    const id = MockData[0].id;
    const option = screen.getByText(data);

    fireEvent.click(option);

    expect(handleCallback).toHaveBeenCalledWith(id);
  })
});
