import { Button } from 'react-bootstrap';

const ClearButton = (props) => {
  const handleClick = () => {
    props.onSearch('');
    props.clearAllFilter();
  };
  return (
    <Button
      variant='secondary'
      onClick={handleClick}
      style={{
        fontSize: '16px',
        padding: '5px',
        margin: '10px',
        height: '40px',
      }}
    >
      Clear
    </Button>
  );
};

export default ClearButton
