import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      .post('//localhost:8080/api/board/upload', {
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

  return (
    <>
      <div>
        <div>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <span>청원분야</span>
                <input
                  type="button"
                  name="etc"
                  value="기타"
                  onClick={onSelectType}
                />
                <input
                  type="button"
                  name="education"
                  value="교육"
                  onClick={onSelectType}
                />
                <input
                  type="button"
                  name="facilities"
                  value="시설"
                  onClick={onSelectType}
                />
              </div>
              <div>
                <span>청원작성</span>
              </div>
              <div>
                <span>제목</span>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={onTitleChange}
                  required
                />
              </div>
              <div>
                <span>내용</span>
                <input
                  type="text"
                  name="content"
                  value={content}
                  onChange={onContentChange}
                  required
                />
              </div>
              <div>
                <input type="submit" value="등록" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default PetitionWrite;
