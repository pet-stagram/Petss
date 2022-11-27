import React, { useState } from 'react';
import style from "../../css/search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    const [searchWord, setSearchWord] = useState('');

    const onChangeWord = (e) => {
        e.preventDefault();
        setSearchWord(e.target.value);
    }

    const handleAddWord = () => {
        console.log(searchWord);
        const newSearchWord = document.querySelector(".newSearchWord");
        newSearchWord.innerHTML=searchWord;
    }
    
  return (
    <form>
        <div className={style.search}>
            <input type="text" name="searchInput" className={style.searchInput} autoComplete="off" placeholder="검색어를 입력하세요" onChange={onChangeWord}/>
            <input type="button" name="searchBtn" className={style.searchBtn} value="검색"  onClick={handleAddWord}/>
        </div>
        <ul className={style.searchHistory}>
            <li><p>크리스마스</p><p><FontAwesomeIcon icon={faXmark}/></p></li>
            <li><p>말티즈</p><p><FontAwesomeIcon icon={faXmark}/></p></li>
            <li><p>산책명소</p><p><FontAwesomeIcon icon={faXmark}/></p></li>
            <li><p className='newSearchWord'></p><p><FontAwesomeIcon icon={faXmark}/></p></li>
        </ul>
    </form>
  )
}

export default Search;