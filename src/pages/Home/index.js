import React, { useState, useEffect } from "react";
import axios from "axios";
import cookies from "react-cookies";

import style from "../../style/Home.module.css";
import PetitionCard from "../../components/PetitionCard";



const Home = () => {
  const [posts, setPosts] = useState([]);
  console.log(cookies.load("userid"));
  useEffect(() => {
    const getPetitions = async () => {
      const Petitions = await axios({
        method: "GET",
        url: `http://ec2-13-112-188-15.ap-northeast-1.compute.amazonaws.com:8080/api/board/listTop`,
        // url: `http://localhost:8080/api/board/listTop`
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
                  key={post.postID}
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
      </div>
    </div>
  )
};

export default Home;
