import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../../style/PetitionList.module.css";
import PetitionTypeBtn from "../../components/PetitionTypeBtn";
import PetitionCard from "../../components/PetitionCard";
import Tab from "../../components/Tab";

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("전체");

  const tabList = [
    { tabName: "최다 동의 순", id: "agree"},
    { tabName: "만료 임박 순", id: "expire"},
    { tabName: "최근 공개 순", id: "recent"},
  ];

  useEffect(() => {
    const getPetitions = async () => {
      const Petitions = await axios({
        method: "GET",
        url: `http://ajoupetition.herokuapp.com/api/board/list`,
      });
      setPosts(Petitions.data);
    };
    getPetitions();
  }, []);

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <div>
            <PetitionTypeBtn
              includeAll={true}
              selectedType={type}
              setSelectedType={setType}
            />
          </div>

          <div className={style.petitionListWrap}>
            <div className={style.tabsDiv}>
              <ul className={style.tabList} role="tablist">
                {tabList &&
                  tabList.map((tab) => {
                    return <Tab key={tab.id} item={tab}/>;
                  })}
              </ul>
            </div>

            <div className={style.petitionListDiv}>
              <ul className={style.lists}>
                {posts?.map((post) => {
                  // const date = new Date(post.date);
                  return (
                    <PetitionCard key={post.userId} type={post.type} title={post.title} />
                  );
                })}
              </ul>
            </div>

            <div className={style.pageDiv}>페이지네이션</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetitionList;
