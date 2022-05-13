import React, { useState } from "react";
import { Link } from 'react-router-dom';
import API from "../../api/API";
import Select from "../../components/Select"
import FormControl from '@mui/material/FormControl';
import { Chip } from "@mui/material"
import Card from "../../components/Card"
import Slide1 from "../../assets/Slide1.png"
import Slide2 from "../../assets/Slide2.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./style.scss"

const HomePage = () => {
  
  const [searchResult, setSearchResult] = useState('');
  const [dropResult, setDropResult] = useState('');
  const [techSearchResult, setTechSearchResult] = useState('');
  const [option, setOption] = useState('제목');

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 550,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };  

  const handleOption = (e) => {
    setOption(e.target.value);
  }

  const titleEnterSearch = async (e, value) => {
    const response = await API.get(`/api/project//search?keyword=${value}`);
    setSearchResult(response.data.projectList);
    setDropResult('');
    e.target.value = "";
  }

  const titleAutoSearch = async (value) => {
    const response = await API.get(`/api/project/search/title?keyword=${value}`);
    setDropResult(response.data.searchList);
  }

  const techProjectAutoSearch = async (value) => {
    const response = await API.get(`/api/tech-stack/search/title?keyword=${value}`);
    setDropResult(response.data.searchList);
  }

  const techStackAutoSearch = async (value) => {
    const response = await API.get(`/api/tech-stack/search/specific?keyword=${value}`);
    setTechSearchResult(response.data.searchList);
  }

  const techProjectEnterSearch = async (e, value) => {
    const response = await API.get(`/api/tech-stack/search/project?keyword=${value}`);
    setSearchResult(response.data.projectList);
    setDropResult('');
    setTechSearchResult('');
    e.target.value = "";
  }

  const techStackClickSearch = async (e) => {
    const value = e.target.innerText;
    const response = await API.get(`/api/tech-stack//search/specific/project?keyword=${value}`);
    setSearchResult(response.data.projectList);
    setDropResult('');
    setTechSearchResult('');
  }

  const search = async(e) => {
    const value = e.target.value;
    try {
      if (option === "제목") {
        setTechSearchResult('');
        if (e.key === "Enter") {
          titleEnterSearch(e, value);
          return;
        }
        titleAutoSearch(value);
        return;
      }

      if (option === "기술스택") {
        if (e.key === "Enter") {
          techProjectEnterSearch(e, value);
          return;
        }
        techProjectAutoSearch(value);
        techStackAutoSearch(value);
        return;
      }
    } catch (e) {
      throw e;
    }
  }

  return (
    <>

      <Slider {...settings}>
        <img className="slide-image" src={Slide1} alt="slide1" />
        <img className="slide-image" src={Slide2} alt="slide2" />
      </Slider>

      <div className="home-body">     
        <Link to="/project/post" >
          <button className="post-project-btn">
            지금 등록하기
          </button>
        </Link>

        <div className="home-search">
          <FormControl sx={{ width: 140 }}>
            <Select onChange={handleOption} option={option} />
          </FormControl>
          <input className="home-search-input" placeholder="🔍 검색" type="text" onChange={e => search(e)} onKeyPress={(e) => search(e)} />
        </div>

        <div className="home-search-main">
          {dropResult && dropResult.map((search, idx) => (
            <div key={idx}>
              {search.title}
            </div>
          ))}
        </div>
        
        <div className="home-search-main">
          {techSearchResult && techSearchResult.map((tech, idx) => (
            <span key={idx}>
              <Chip
                onClick={techStackClickSearch}
                style={{ height : "24px", marginRight : "3px", backgroundColor : "#3396F4", color:'white', fontWeight:'bold'}}
                label={tech} 
              />
            </span>
          ))}
        </div>        

        <div className="home-body-title">
          우리 모두의 프로젝트
        </div>

        <div className="home-body-content">
          다른 개발자들의 프로젝트를 한번 볼까요?
        </div>
        
        <div className="home-card-option">
          <div className="home-card-sort">
            <div>최신순</div>
            <div>인기순</div>
          </div>
          <Select />
        </div>

        <div className="cards-grid">
          {searchResult && searchResult.map((search, idx) => (
            <div key={idx}>
              <Card
                title={search.title} 
                content={search.introduce}
                category={search.category}
                likeCnt={search.likeCnt}
                viewCnt={search.hits}
                commentCnt={search.commentCnt}
                techStack={search.techStack}
                thumbnail={search.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage;