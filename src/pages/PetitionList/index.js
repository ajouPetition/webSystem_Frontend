import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QueryString from 'qs';
import axios from 'axios';
import style from '../../style/PetitionList.module.css';
import PetitionTypeBtn from '../../components/PetitionTypeBtn';
import PetitionCard from '../../components/PetitionCard';
import Tab from '../../components/Tab';
import Pagination from '../../components/Pagination';

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('전체');
  const [orderType, setOrderType] = useState('agree');
  const [countPageLimit, setCountPageLimit] = useState(0);
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

    const getCountPageLimit = async () => {
      const count = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/board/listAll`,
      });
      setCountPageLimit(Math.ceil(count.data[0]['COUNT(*)'] / limitPost));
    };
    getCountPageLimit();
  }, [currentPage]);

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
                  return (
                    <Tab
                      orderType={orderType}
                      setOrderType={setOrderType}
                      key={tab.id}
                      item={tab}
                    />
                  );
                })}
            </ul>
          </div>

          <div className={style.petitionListDiv}>
            <ul className={style.lists}>
              {posts?.map((post, index) => {
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
                console.log(post)
                return (
                  <PetitionCard
                    key={index}
                    type={post.type}
                    title={post.title}
                    date={date.toLocaleDateString()}
                    dueDate={dueDate.toLocaleDateString()}
                    dDay={dDay}
                    postID={post.postID}
                    cnt = {post.cnt}
                  />
                );
              })}
            </ul>
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              countPageLimit={countPageLimit}
              goToUrl={`/petition?page=`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PetitionList;
