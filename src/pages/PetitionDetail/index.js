import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from '../../style/PetitionDetail.module.css';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import QueryString from 'qs';
import Spinner from '../../components/Spinner';

const PetitionDetail = ({ user }) => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [cntAgree, setCntAgree] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [countComments, setCountComments] = useState(0);
  const [isLoadingPetition, setIsLoadingPetition] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [countCommentPageLimit, setCountCommentPageLimit] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { commentPage } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [curUserID, setCurUserID] = useState();

  const currentCommentPage = commentPage ? parseInt(commentPage) - 1 : 0;

  const limitComment = 3;

  const getAgreeCount = async () => {
    const data = await axios({
      method: 'GET',
      url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/agree/post/${params.id}`,
    });
    setCntAgree(data.data);
  };

  useEffect(() => {
    setIsLoadingPetition(true);
    setIsLoadingComments(true);

    const getUserID = async () => {
      if (!user) return;
      const data = await axios({
        method: 'GET',
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/users/${user}`,
      });
      setCurUserID(data.data[0].userID);
    };
    getUserID();

    const getPetition = async () => {
      const Petition = await axios({
        method: 'GET',
        // url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/board/view/${params.id}`,
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/board/view/${params.id}`,
      });
      setPost(Petition.data[0]);

      const start = new Date(Petition.data[0].date);
      const date = new Date(
        new Date(Petition.data[0].date).setDate(
          new Date(Petition.data[0].date).getDate() + 60
        )
      );
      const data = await axios({
        method: 'GET',
        // url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/agree/post/${params.id}`,
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/agree/post/${params.id}`,
      });
      setStartDate(start.toLocaleDateString());
      setDueDate(date.toLocaleDateString());
      setCntAgree(data.data);
      setIsLoadingPetition(false);
    };
    getPetition();

    const getComments = async () => {
      const data = await axios({
        method: 'GET',
        // url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/comments/view/${params.id}?startAt=${
        //   currentCommentPage * limitComment
        // }&limit=${limitComment}`,
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/comments/view/${
          params.id
        }?startAt=${currentCommentPage * limitComment}&limit=${limitComment}`,
      });
      const count = await axios({
        method: 'GET',
        // url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/comments/countComments/${params.id}`,
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/comments/countComments/${params.id}`,
      });
      setComments(data.data);
      setCountComments(count.data[0]['COUNT(*)']);
      setCountCommentPageLimit(
        Math.ceil(count.data[0]['COUNT(*)'] / limitComment)
      );
      setIsLoadingComments(false);
    };
    getComments();
  }, [currentCommentPage, params, cntAgree, user]);

  const onClickAgreeBtn = (event) => {
    if (!user) {
      alert('???????????? ???????????????.');
      return navigate('/login');
    }
    if (window.confirm('?????? ???????????????????')) {
      axios
        // .post(
        // "http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/agree/agree",
        // {
        .post(
          'http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/agree/agree',
          {
            postID: params.id,
            userID: curUserID,
          }
        )
        .then((res) => {
          getAgreeCount();
        })
        .catch((err) => {
          if (err.response.status === 400) alert('?????? ????????? ???????????????.');
        });
    }
  };

  const onClickDeleteBtn = (event) => {
    if (window.confirm('????????? ?????? ???????????????????')) {
      axios
        .delete(
          `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/board/delete/${params.id}`
        )
        .then((res) => {
          navigate('/petition');
        })
        .catch((err) => {
          alert('????????? ???????????????.');
        });
    }
  };

  const onChangeComment = (event) => {
    const {
      target: { value },
    } = event;
    setCommentInput(value);
  };

  const onSubmitComment = async (event) => {
    event.preventDefault();
    if (!user) {
      alert('???????????? ???????????????.');
      return navigate('/login');
    }
    await axios({
      method: 'POST',
      // url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/comments/upload`,
      url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/comments/upload`,
      data: {
        postID: params.id,
        userID: curUserID,
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
        {isLoadingPetition ? (
          <Spinner />
        ) : (
          <>
            <div className={style.petitionTitle}>
              <h4>{post.title}</h4>
            </div>

            <div className={style.petitionContent}>
              <div className={style.contentHeader}>
                <div className={style.firstLine}>
                  <div className={style.list}>
                    <div className={style.listTitle}>?????? ??????</div>
                    <div className={style.listContent}>{post.type}</div>
                  </div>
                </div>

                <div className={style.secondLine}>
                  <div className={style.list}>
                    <div className={style.listTitle}>?????? ??????</div>
                    <div className={style.listContent}>
                      {`${startDate} ~ ${dueDate}`}
                    </div>
                  </div>

                  <div className={style.list}>
                    <div className={style.listTitle}>?????? ???</div>
                    <div
                      className={style.listContent}
                    >{` ${cntAgree} ??? (${cntAgree*10}%)`}</div>
                  </div>
                </div>
              </div>
              <div className={style.contentBody}>
                <div className={style.contentTitle}>?????? ??????</div>
                <pre className={style.contentDetail}>{post.content}</pre>
              </div>
            </div>

            <div className={style.btnContainer}>
              <button
                onClick={() => {
                  navigate('/petition');
                }}
              >
                ????????????
              </button>
              {curUserID === post.userID ? (
                <button
                  onClick={onClickDeleteBtn}
                  style={{
                    color: 'white',
                    backgroundColor: '#132d5a',
                    border: 'none',
                  }}
                >
                  ????????????
                </button>
              ) : (
                <button
                  onClick={onClickAgreeBtn}
                  style={{
                    color: 'white',
                    backgroundColor: '#132d5a',
                    border: 'none',
                  }}
                >
                  ????????????
                </button>
              )}
            </div>
          </>
        )}

        <div className={style.commentBox}>
          <div>
            <span>?????? ??????</span>
          </div>
          <div>
            <form onSubmit={onSubmitComment}>
              <textarea
                className={style.textInput}
                onChange={onChangeComment}
                value={commentInput}
              />
              <input className={style.submitBtn} type="submit" value="??????" />
            </form>
          </div>
        </div>

        {isLoadingComments ? (
          <Spinner />
        ) : (
          <>
            <div className={style.commentListBox}>
              {comments?.map((comment, index) => (
                <div key={index} className={style.commentList}>
                  <span>***</span>
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
          </>
        )}
      </div>
    </div>
  );
};

export default PetitionDetail;
