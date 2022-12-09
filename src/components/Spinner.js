import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%',
      }}
    >
      <ClipLoader color={'#132d5a'} loading={true} size={50} />
    </div>
  );
};

export default Spinner;
