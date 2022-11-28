import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryString from 'qs';
import axios from 'axios';
import style from '../../style/PetitionList.module.css';
import PetitionTypeBtn from '../../components/PetitionTypeBtn';
import PetitionCard from '../../components/PetitionCard';
import Tab from '../../components/Tab';

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('전체');
  const [countPageLimit, setCountPageLimit] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { page } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const currentPage = page ? parseInt(page) - 1 : 0;
  const limitPost = 1;

  const tabList = [
    { tabName: '최다 동의 순', id: 'agree' },
    { tabName: '만료 임박 순', id: 'expire' },
    { tabName: '최근 공개 순', id: 'recent' },
  ];

  useEffect(() => {
    const getCountPageLimit = async () => {
      const count = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/board/listAll`,
      });
      setCountPageLimit(Math.ceil(count.data[0]['COUNT(*)'] / limitPost));
    };
    getCountPageLimit();

    const getPetitions = async () => {
      const Petitions = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/board/list?startAt=${
          currentPage * limitPost
        }&limit=${limitPost}`,
      });
      setPosts(Petitions.data);
    };
    getPetitions();
  }, [currentPage]);

  const onClickSetPage = (event) => {
    const {
      target: { id },
    } = event;
    navigate(`/petition?page=${id}`);
  };

  const createPagination = (pageNumber) => {
    return (
      <li
        onClick={onClickSetPage}
        id={pageNumber + 1}
        className={
          pageNumber === currentPage ? style.currentPage : style.pagination
        }
        key={pageNumber + 1}
      >
        {pageNumber + 1}
      </li>
    );
  };

  const pagination = () => {
    let temp = [];

    let left = 1;
    let right = 1;
    temp.push(createPagination(currentPage));
    for (let i = 0; i < (countPageLimit > 8 ? 8 : countPageLimit - 1); i++) {
      temp =
        i < 4
          ? currentPage - left >= 0
            ? [createPagination(currentPage - left++), ...temp]
            : [...temp, createPagination(currentPage + right++)]
          : currentPage + right < countPageLimit
          ? [...temp, createPagination(currentPage + right++)]
          : [createPagination(currentPage - left++), ...temp];
    }

    return temp;
  };

  const onClickPrevBtn = () => {
    navigate(`/petition?page=${currentPage - 8}`);
  };

  const onClickNextBtn = () => {
    navigate(`/petition?page=${currentPage + 10}`);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.typeBtnList}>
            <PetitionTypeBtn
              includeAll={true}
              selectedType={type}
              setSelectedType={setType}
            />
          </div>

          <div className={style.tabsDiv}>
            <ul className={style.tabList} role="tablist">
              {tabList &&
                tabList.map((tab) => {
                  return <Tab key={tab.id} item={tab} />;
                })}
            </ul>
          </div>

          <div className={style.petitionListDiv}>
            <ul className={style.lists}>
              {posts?.map((post) => {
                const today = new Date();
                const date = new Date(post.date);
                const dueDate = new Date(
                  new Date(post.date).setDate(
                    new Date(post.date).getDate() + 30
                  )
                );
                const dDay = Math.ceil(
                  (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <PetitionCard
                    key={post.userId}
                    type={post.type}
                    title={post.title}
                    date={date.toLocaleDateString()}
                    dueDate={dueDate.toLocaleDateString()}
                    dDay={dDay}
                  />
                );
              })}
            </ul>
          </div>

          <div className={style.pageDiv}>
            {currentPage - 9 >= 0 && (
              <input
                className={style.paginationPrevBtn}
                onClick={onClickPrevBtn}
                type="button"
                value="이전"
              />
            )}
            <ul>{pagination()}</ul>
            {currentPage + 9 < countPageLimit && (
              <input
                className={style.paginationNextBtn}
                onClick={onClickNextBtn}
                type="button"
                value="다음"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetitionList;
