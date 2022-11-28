import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../style/PetitionDetail.module.css";
import axios from "axios";

const PetitionDetail = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [startDate, setStartDate] = useState("")
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const getPetition = async () => {
      const Petition = await axios({
        method: "GET",
        url: `http://localhost:8080/api/board/view/${params.id}`,
      });
      setPost(Petition.data[0]);
    };
    getPetition();

    const getDate = () => {
      const startDate = new Date(post.date);
      const date = new Date(
        new Date(post.date).setDate(new Date(post.date).getDate() + 30)
      ).toLocaleDateString();
      console.log(typeof(startDate));
      setStartDate(startDate.toLocaleDateString())
      setDueDate(date);
    };

    getDate();
  }, []);

  console.log(startDate)

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.titleDiv}>
          <h4>{post.title}</h4>
        </div>

        <div className={style.contentDiv}>
          <div className={style.contentHead}>
            <div className={style.headTop}>{post.type}</div>
            <div className={style.headBottom}>
              <div className={style.petitionDue}>
                {`${startDate} ~ ${dueDate}`}
              </div>
              <div className={style.petitionAgreeCount}></div>
            </div>
          </div>

          <div className={style.contentBody}>{post.content}</div>
        </div>
      </div>
    </div>
  );
};

export default PetitionDetail;
