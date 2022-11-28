import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../style/PetitionDetail.module.css";
import axios from "axios";

const PetitionDetail = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const getPetition = async () => {
      const Petition = await axios({
        method: "GET",
        url: `http://localhost:8080/api/board/view/${params.id}`,
      });
      setPost(Petition.data[0]);

      const start = new Date(Petition.data[0].date);
      const date = new Date(
        new Date(Petition.data[0].date).setDate(
          new Date(Petition.data[0].date).getDate() + 30
        )
      );
      setStartDate(start.toLocaleDateString());
      setDueDate(date.toLocaleDateString());
    };
    getPetition();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.petitionTitle}>
          <h4>{post.title}</h4>
        </div>

        <div className={style.petitionContent}>

          <div className={style.contentHeader}>
            <div className={style.firstLine}>

              <div className={style.list}>
                <div className={style.listTitle}>청원 분야</div>
                <div className={style.listContent}>{post.type}</div>
              </div>

            </div>

            <div className={style.secondLine}>

              <div className={style.list}>
                <div className={style.listTitle}>동의 기간</div>
                <div className={style.listContent}>
                  {`${startDate} ~ ${dueDate}`}
                </div>
              </div>

              <div className={style.list}>
                <div className={style.listTitle}>동의 수</div>
                <div className={style.listContent}></div>
              </div>
            </div>

          </div>

          <div className={style.contentBody}>
                <div className={style.contentTitle}>
                    청원 내용</div>
                <div className={style.contentDetail}>
                    {post.content}
                </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PetitionDetail;
