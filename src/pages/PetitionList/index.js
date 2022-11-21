import React, { useState, useEffect } from 'react';
import axios from 'axios';

import style from '../../style/PetitionList.module.css';
import PetitionTypeBtn from '../../components/PetitionTypeBtn';

const PetitionList = () => {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('전체');

  useEffect(() => {
    const getPetitions = async () => {
      const Petitions = await axios({
        method: 'GET',
        url: `//localhost:8080/api/board/list`,
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
          <div>
            <ul>
              <li>최다 동의 순</li>
              <li>만료 임박 순</li>
              <li>최근 공개 순</li>
            </ul>
          </div>
          <div>
            <ul>
              {posts?.map((post) => {
                const date = new Date(post.date);
                return (
                  <li key={post.postID}>
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
          <div>페이지네이션</div>
        </div>
      </div>
    </>
  );
};

export default PetitionList;
