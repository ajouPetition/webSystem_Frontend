
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../../style/PetitionWrite.module.css';
import PetitionTypeBtn from '../../components/PetitionTypeBtn';
import Spinner from '../../components/Spinner';

const PetitionWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('기타');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    setIsLoading(true);
    axios
      .post("http://localhost:8080/api/board/upload", {

        title,
        type,
        content,
        userID: 1,
      })
      .then((response) => {
        console.log(response);

        setIsLoading(false);
        navigate('/petition');
      })
      .catch((error) => {
        console.log(error);
        navigate("/petition");
      });
  };
  const onCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={style.content}>
              <form onSubmit={onSubmit}>
                <div className={style.type}>
                  <label>청원분야</label>
                  <PetitionTypeBtn
                    includeAll={false}
                    currentType={type}
                    setSelectedType={setType}
                  />
                </div>
                <div className={style.title}>
                  <label>제목</label>
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
                  <label>내용</label>
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
          )}
        </div>
      </div>
    </>
  );
};
export default PetitionWrite;
