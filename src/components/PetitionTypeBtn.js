import style from '../style/PetitionTypeBtn.module.css';

const PetitionTypeBtn = ({ type, setType }) => {
  const onSelectType = (event) => {
    const {
      target: { name },
    } = event;
    setType(name);
  };

  return (
    <div className={style.typeButtonBox}>
      <input
        className={`${style.typeButton} ${
          type === 'etc' ? style.selectedTypeButton : ''
        }`}
        type="button"
        name="etc"
        value="기타"
        onClick={onSelectType}
      />
      <input
        className={`${style.typeButton} ${
          type === 'education' ? style.selectedTypeButton : ''
        }`}
        type="button"
        name="education"
        value="교육"
        onClick={onSelectType}
      />
      <input
        className={`${style.typeButton} ${
          type === 'facilities' ? style.selectedTypeButton : ''
        }`}
        type="button"
        name="facilities"
        value="시설"
        onClick={onSelectType}
      />
    </div>
  );
};

export default PetitionTypeBtn;
