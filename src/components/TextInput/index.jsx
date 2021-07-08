import './style.css';
export const TextInput = ({ searchValue, hendleChange }) => {
  return (
    <input
      className='text-input'
      value={searchValue}
      type='search'
      onChange={hendleChange}
      placeholder='Type your search'
    />
  );
};
