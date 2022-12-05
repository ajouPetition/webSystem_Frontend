import style from '../style/PetitionTypeBtn.module.css';

const PetitionTypeBtn = ({
  navigate,
  includeAll,
  setSelectedType,
  currentType,
  currentOrderBy,
}) => {
  const types = includeAll
    ? ['전체', '기타', '교육', '시설']
    : ['기타', '교육', '시설'];

  const onSelectType = (event) => {
    const {
      target: { value },
    } = event;
    navigate
      ? navigate(`?page=1&type=${value}&orderBy=${currentOrderBy}`)
      : setSelectedType(value);
  };

  return (
    <div className={style.typeButtonBox}>
      {types?.map((type) => (
        <input
          className={`${style.typeButton} ${
            currentType === type ? style.selectedTypeButton : ''
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
