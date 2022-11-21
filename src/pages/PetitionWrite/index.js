import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../../style/PetitionWrite.module.css';

const PetitionWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('etc');

  const navigate = useNavigate();

  const onSelectType = (event) => {
    const {
      target: { name },
    } = event;
    setType(name);
  };

  const onTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };

  const onContentChange = (event) => {
    const {
      target: { value },
    } = event;
    setContent(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(title, type, content);
    axios
      .post('http://ajoupetition.herokuapp.com/api/board/upload', {
        title,
        type,
        content,
        userID: 1,
      })
      .then((response) => {
        console.log(response);
        navigate('/petition');
      })
      .catch((error) => {
        console.log(error);
        navigate('/petition');
      });
  };
  const onCancel = () => {
    navigate('/');
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.content}>
            <form onSubmit={onSubmit}>
              <div className={style.type}>
                <span>청원분야</span>
                <div className={style.typeButtons}>
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
              </div>
              <div className={style.title}>
                <span>제목</span>
                <div>
                  <input
                    className={style.inputTitle}
                    type="text"
                    name="title"
                    value={title}
                    onChange={onTitleChange}
                    required
                  />
                </div>
              </div>
              <div className={style.content}>
                <span>내용</span>
                <div>
                  <textarea
                    className={style.inputContent}
                    name="content"
                    value={content}
                    onChange={onContentChange}
                    required
                  />
                </div>
              </div>
              <div className={style.selectButtonBox}>
                <input
                  className={style.uploadButton}
                  type="submit"
                  value="청원등록"
                />
                <input
                  className={style.cancelButton}
                  type="button"
                  onClick={onCancel}
                  value="청원취소"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default PetitionWrite;
