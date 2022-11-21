import style from '../style/PetitionTypeBtn.module.css';

const PetitionTypeBtn = ({ includeAll, selectedType, setSelectedType }) => {
  const types = includeAll
    ? ['전체', '기타', '교육', '시설']
    : ['기타', '교육', '시설'];

  const onSelectType = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedType(value);
  };

  return (
    <div className={style.typeButtonBox}>
      {types?.map((type) => (
        <input
          className={`${style.typeButton} ${
            selectedType === type ? style.selectedTypeButton : ''
          }`}
          key={type}
          type="button"
          value={type}
          onClick={onSelectType}
        />
      ))}
    </div>
  );
};

export default PetitionTypeBtn;
