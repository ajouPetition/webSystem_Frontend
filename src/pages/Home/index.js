import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../../style/Home.module.css";
import PetitionCard from "../../components/PetitionCard";


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPetitions = async () => {
      const Petitions = await axios({
        method: "GET",
        url: `http://ajoupetition.herokuapp.com/api/board/listTop`,
        // url: `http://127.0.0.1:3080/api/board/listTop`
      });
      setPosts(Petitions.data);
    };
    getPetitions();
    console.log(posts)
  }, []);


  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <span>관심을 가장 많이 받은 게시물 TOP 3</span>
        </div>
        <div className={style.petitionListDiv}>
          <ul className={style.lists}>
            {posts?.map((post) => {
              return (
                <PetitionCard key={post.postID} type={post.type} title={post.title} />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Home;
