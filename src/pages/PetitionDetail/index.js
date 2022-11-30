import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from '../../style/PetitionDetail.module.css';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import QueryString from 'qs';

const PetitionDetail = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [countComments, setCountComments] = useState(0);

  const [countCommentPageLimit, setCountCommentPageLimit] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { commentPage } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const currentCommentPage = commentPage ? parseInt(commentPage) - 1 : 0;

  const limitComment = 3;

  useEffect(() => {
    const getPetition = async () => {
      const Petition = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/board/view/${params.id}`,
      });
      setPost(Petition.data[0]);

      const start = new Date(Petition.data[0].date);
      const date = new Date(
        new Date(Petition.data[0].date).setDate(
          new Date(Petition.data[0].date).getDate() + 30
        )
      );
      setStartDate(start.toLocaleDateString());
      setDueDate(date.toLocaleDateString());
    };
    getPetition();

    const getComments = async () => {
      const data = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/comments/view/${params.id}?startAt=${
          currentCommentPage * limitComment
        }&limit=${limitComment}`,
      });
      setComments(data.data);
    };
    getComments();

    const getCountCommentPageLimit = async () => {
      const count = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/comments/countComments/${params.id}`,
      });
      setCountComments(count.data[0]['COUNT(*)']);
      setCountCommentPageLimit(
        Math.ceil(count.data[0]['COUNT(*)'] / limitComment)
      );
    };
    getCountCommentPageLimit();
  }, [currentCommentPage, params]);

  const onChangeComment = (event) => {
    const {
      target: { value },
    } = event;
    setCommentInput(value);
  };

  const onSubmitComment = async (event) => {
    event.preventDefault();
    await axios({
      method: 'POST',
      url: `http://localhost:8080/api/comments/upload`,
      data: {
        postID: params.id,
        userID: 1,
        content: commentInput,
      },
    });
    navigate(
      `/petition/detail/${params.id}?commentPage=${
        countComments % limitComment === 0
          ? countCommentPageLimit + 1
          : countCommentPageLimit
      }`
    );
    setCommentInput('');
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.petitionTitle}>
          <h4>{post.title}</h4>
        </div>

        <div className={style.petitionContent}>
          <div className={style.contentHeader}>
            <div className={style.firstLine}>
              <div className={style.list}>
                <div className={style.listTitle}>청원 분야</div>
                <div className={style.listContent}>{post.type}</div>
              </div>
            </div>

            <div className={style.secondLine}>
              <div className={style.list}>
                <div className={style.listTitle}>동의 기간</div>
                <div className={style.listContent}>
                  {`${startDate} ~ ${dueDate}`}
                </div>
              </div>

              <div className={style.list}>
                <div className={style.listTitle}>동의 수</div>
                <div className={style.listContent}></div>
              </div>
            </div>
          </div>
          <div className={style.contentBody}>
            <div className={style.contentTitle}>청원 내용</div>
            <div className={style.contentDetail}>{post.content}</div>
          </div>
        </div>

        <div className={style.commentBox}>
          <div>
            <span>댓글 쓰기</span>
          </div>
          <div>
            <form onSubmit={onSubmitComment}>
              <textarea
                className={style.textInput}
                onChange={onChangeComment}
                value={commentInput}
              />
              <input className={style.submitBtn} type="submit" value="등록" />
            </form>
          </div>
        </div>
        <div className={style.commentListBox}>
          {comments?.map((comment, index) => (
            <div key={index} className={style.commentList}>
              <span>김준서</span>
              <li>{comment.content}</li>
            </div>
          ))}
        </div>
        <div>
          <Pagination
            currentPage={currentCommentPage}
            countPageLimit={countCommentPageLimit}
            goToUrl={`/petition/detail/${params.id}?commentPage=`}
          />
        </div>
      </div>
    </div>
  );
};

export default PetitionDetail;