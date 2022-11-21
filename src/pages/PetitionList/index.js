import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../../style/PetitionList.module.css";

const PetitionList = () => {
  const [posts, setPosts] = useState([]);

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
        <div className={style.contentsBody}>
          <div className={style.categoryName}>
            <h5>청원분야</h5>
            <span>확장</span>
          </div>

          <div className={style.petitionListWrap}>
            <ul className={style.tabsUI}>
              <li className={style.tab}>최다 동의 순</li>
              <li className={style.tab}>만료 임박 순</li>
              <li className={style.tab}>최근 공개 순</li>
            </ul>

            <div className={style.petitionListDiv}>
              <ul className={style.lists}>
                {posts?.map((post) => {
                  const date = new Date(post.date);
                  return (
                    <li className={style.list} key={post.postID}>
                      <dl>
                        <dt>{post.type}</dt>
                        <dd>{post.title}</dd>
                      </dl>
                      <span>
                        {date.getMonth()}월{date.getDay()}일
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={style.page}>페이지네이션</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetitionList;
