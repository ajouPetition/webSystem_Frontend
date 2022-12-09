import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryString from 'qs';
import axios from 'axios';
import style from '../../style/PetitionList.module.css';
import PetitionTypeBtn from '../../components/PetitionTypeBtn';
import PetitionCard from '../../components/PetitionCard';
import Tab from '../../components/Tab';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [countPageLimit, setCountPageLimit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const limitPost = 4;

  const tabList = [
    { tabName: '최다 동의 순', id: 'cnt' },
    { tabName: '만료 임박 순', id: 'asc' },
    { tabName: '최근 공개 순', id: 'desc' },
  ];

  const { page, type, orderBy } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const currentPage = page ? parseInt(page) - 1 : 0;
  const currentType = type ? type : '전체';
  const currentOrderBy = orderBy ? orderBy : 'cnt';

  useEffect(() => {
    setIsLoading(true);

    const getPetitions = async () => {
      const Petitions = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/board/list/filter?type=${currentType}&orderBy=${currentOrderBy}&startAt=${
          currentPage * limitPost
        }&limit=${limitPost}`,
        // url: `http://localhost:8080/api/board/list/filter?type=${currentType}&orderBy=${currentOrderBy}&startAt=${
        //   currentPage * limitPost
        // }&limit=${limitPost}`,
      });
      const count = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/board/listAll?type=${currentType}`,
        // url: `http://localhost:8080/api/board/listAll?type=${currentType}`,
      });
      setCountPageLimit(Math.ceil(count.data[0]['COUNT(*)'] / limitPost));
      setPosts(Petitions.data);
      setIsLoading(false);
    };
    getPetitions();
  }, [currentPage, currentType, currentOrderBy, location.search]);

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.typeBtnList}>
            <PetitionTypeBtn
              navigate={navigate}
              includeAll={true}
              currentType={currentType}
              currentOrderBy={currentOrderBy}
            />
          </div>

          <div className={style.tabsDiv}>
            <ul className={style.tabList} role="tablist">
              {tabList &&
                tabList.map((tab) => {
                  return (
                    <Tab
                      navigate={navigate}
                      currentType={currentType}
                      currentOrderBy={currentOrderBy}
                      key={tab.id}
                      item={tab}
                    />
                  );
                })}
            </ul>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className={style.petitionListDiv}>
                <ul className={style.lists}>
                  {posts?.map((post, index) => {
                    const today = new Date();
                    const date = new Date(post.date);
                    const dueDate = new Date(
                      new Date(post.date).setDate(
                        new Date(post.date).getDate() + 60
                      )
                    );
                    const dDay = Math.ceil(
                      (dueDate.getTime() - today.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                    return (
                      <PetitionCard
                        key={index}
                        type={post.type}
                        title={post.title}
                        date={date.toLocaleDateString()}
                        dueDate={dueDate.toLocaleDateString()}
                        dDay={dDay}
                        postID={post.postID}
                        cnt={post.cnt}
                      />
                    );
                  })}
                </ul>
              </div>
              <div>
                <Pagination
                  currentPage={currentPage}
                  currentType={currentType}
                  currentOrderBy={currentOrderBy}
                  countPageLimit={countPageLimit}
                  goToUrl={`/petition?page=`}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PetitionList;
