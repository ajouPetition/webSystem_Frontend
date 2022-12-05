import { useNavigate } from 'react-router-dom';
import style from '../style/Pagination.module.css';

const Pagination = ({
  currentPage,
  currentType,
  currentOrderBy,
  countPageLimit,
  goToUrl,
}) => {
  const navigate = useNavigate();

  const onClickSetPage = (event) => {
    const {
      target: { id },
    } = event;
    let url = goToUrl + id;
    if (currentType !== undefined) {
      url = url + `&type=${currentType}&orderBy=${currentOrderBy}`;
    }
    navigate(url);
  };

  const createPagination = (pageNumber) => {
    return (
      <li
        onClick={onClickSetPage}
        id={pageNumber + 1}
        className={
          pageNumber === currentPage ? style.currentPage : style.pagination
        }
        key={pageNumber + 1}
      >
        {pageNumber + 1}
      </li>
    );
  };

  const pagination = () => {
    let temp = [];

    let left = 1;
    let right = 1;
    temp.push(createPagination(currentPage));
    for (let i = 0; i < (countPageLimit > 8 ? 8 : countPageLimit - 1); i++) {
      temp =
        i < 4
          ? currentPage - left >= 0
            ? [createPagination(currentPage - left++), ...temp]
            : [...temp, createPagination(currentPage + right++)]
          : currentPage + right < countPageLimit
          ? [...temp, createPagination(currentPage + right++)]
          : [createPagination(currentPage - left++), ...temp];
    }

    return temp;
  };

  const onClickPrevBtn = () => {
    let url = goToUrl + (currentPage - 8);
    if (currentType !== undefined) {
      url = url + `&type=${currentType}&orderBy=${currentOrderBy}`;
    }
    navigate(url);
  };

  const onClickNextBtn = () => {
    let url = goToUrl + (currentPage + 10);
    if (currentType !== undefined) {
      url = url + `&type=${currentType}&orderBy=${currentOrderBy}`;
    }

    navigate(url);
  };

  return (
    <div className={style.pageDiv}>
      {currentPage - 9 >= 0 && (
        <input
          className={style.paginationPrevBtn}
          onClick={onClickPrevBtn}
          type="button"
          value="이전"
        />
      )}
      <ul>{pagination()}</ul>
      {currentPage + 9 < countPageLimit && (
        <input
          className={style.paginationNextBtn}
          onClick={onClickNextBtn}
          type="button"
          value="다음"
        />
      )}
    </div>
  );
};

export default Pagination;
