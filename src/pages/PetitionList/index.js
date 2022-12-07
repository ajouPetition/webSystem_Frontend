import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "qs";
import axios from "axios";
import style from "../../style/PetitionList.module.css";
import PetitionTypeBtn from "../../components/PetitionTypeBtn";
import PetitionCard from "../../components/PetitionCard";
import Tab from "../../components/Tab";
import Pagination from "../../components/Pagination";

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentType, setCurrentType] = useState("전체");
  const [currentOrderBy, setCurrentOrderBy] = useState("cnt");
  const [countPageLimit, setCountPageLimit] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const limitPost = 4;

  const tabList = [
    { tabName: "최다 동의 순", id: "cnt" },
    { tabName: "만료 임박 순", id: "asc" },
    { tabName: "최근 공개 순", id: "desc" },
  ];

  useEffect(() => {
    const { page, type, orderBy } = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    page && setCurrentPage(parseInt(page) - 1);
    type && setCurrentType(type);
    orderBy && setCurrentOrderBy(orderBy);

    const getPetitions = async () => {
      const Petitions = await axios({
        method: "GET",
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/board/list/filter?type=${currentType}&orderBy=${currentOrderBy}&startAt=${
          currentPage * limitPost
        }&limit=${limitPost}`,
      });
      setPosts(Petitions.data);
    };
    getPetitions();

    const getCountPageLimit = async () => {
      const count = await axios({
        method: "GET",
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/board/listAll?type=${currentType}`,
      });
      setCountPageLimit(Math.ceil(count.data[0]["COUNT(*)"] / limitPost));
    };
    getCountPageLimit();
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
                  (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
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
        </div>
      </div>
    </>
  );
};

export default PetitionList;
