import React,{ useState, useEffect } from "react";
<<<<<<< HEAD
import { Link } from 'react-router-dom'
=======
import { useLocation } from "react-router-dom";
>>>>>>> c639d962ab5b56912bb481eb2dab8fa9a8455a50
import "./style.scss"
import API from "../../api/API";
import store from "../../utils/store"
import Card from "../../components/Card";
import heart from "../../assets/heart.png"
<<<<<<< HEAD
import defaultProfile from '../../assets/default.png'
=======
import Default from "../../assets/default.png"
import cuteDog from "../../assets/cuteDog.png"

>>>>>>> c639d962ab5b56912bb481eb2dab8fa9a8455a50


const ProfilePage = () => {
  const locations = useLocation().state;

  const [i,setI] = useState(2)
  const [bmi, setBmi] = useState(2)
  const [user, setUser] = useState('');
  const [myproject, setMyproject] = useState([])
  const [mybmProject, setMybmProject] = useState([])
  const [myProMore, setMyProMore] = useState(false)
  const [myBProMore, setMyBProMore] = useState(false)

  const power = () => {
    setMyproject(user["projects"].slice(0,3*i))
    console.log(user["projects"].length)
    if (user["projects"].length <= 3*i) {
      setMyProMore(false)
    }else{
      setI(i+1)
    }
  }

  const bmpower = () => {
    setMybmProject(user["bookmarkList"].slice(0,3*bmi))
    console.log(user["bookmarkList"])
    if (user["bookmarkList"].length <= 3*i) {
      setMyBProMore(false)
    }else{
      setBmi(bmi+1)
    }
  }
  
  useEffect(() => {
    async function peekuser(username) {
      const response = await API.get(`/api/user/profile?username=${username}`)
      console.log(response)
      setUser(response.data.user);
      setMyproject(response.data.user["projects"].slice(0,3))
      if (response.data.user["projects"].length > 3) {
        setMyProMore(true)
      }
      
      setMybmProject(response.data.user["bookmarkList"].slice(0,3))
      if (response.data.user["bookmarkList"].length > 3) {
        setMyBProMore(true)
      }
    }
    const { username } = locations;
    if (username) {
      peekuser(username.split('@')[0])

    }else{
      store.getToken()
      API.get("api/user")
        .then((response) => {
          setUser(response.data.user);
          setMyproject(response.data.user["projects"].slice(0,3))
          setMybmProject(response.data.user["bookmarkList"].slice(0,3))
        })
    }
  }, [])

  return (
    <div>
      <div className="profile-div">
        <div className="profile-box">
          <div className="img-div">
            <div className="heart-box">
              <img className="likes-heart" src={heart} alt="heart" />
              <p className="likes-count">{user.userLiked}개</p>
            </div>
            <img className="profile-pic" src={user.image ? user.image : defaultProfile} alt="profilePic" />
          </div>
          <div className="introduce-div">
            <p className="profile-p">이름 : {user.nickname}</p>
            <p className="profile-p">이메일 : {user.email}</p>
            <p className="profile-p">github : {user.github}</p>
            <p className="profile-p">자기소개 : {user.greeting}</p>
          </div>
        </div>
      </div>
      <div className="my-project-div">
        <h2 className="my-post-h">내가 참여한 프로젝트</h2>
        <div className="card-div">
          {myproject.map((item, idx) => (
            <div key={idx}>
              <Link to={`/project/${item.projectId}`}>
                <Card
                  title={item.title}
                  content={item.content}
                  category={item.category}
                  likeCnt={item.likeCnt}
                  viewCnt={item.viewCnt}
                  commentCnt={item.commentCnt}
                  techStack={item.techStack}
                  thumbnail={item.thumbnail}
                />
              </Link>
            </div>
          ))}
        </div>
        { (myProMore) ?
          <button className="more-button" onClick={power}>더보기</button>
          :
          (myproject.length === 0) ?
            <div className="dog-div">
              <img className="cute-dog" src={cuteDog} />
              <p>😢 아직 북마크한 프로젝트가 없습니다.</p>
            </div>
            :
            null
        }
      </div>

      <div className="my-project-div">
        <h2 className= "my-post-h">내가 북마크한 프로젝트</h2>
        <div className="card-div">
          {mybmProject.map((item, idx) => (
            <div key={idx}>
              <Link to={`/project/${item.projectId}`}>
                <Card
                  title={item.title}
                  content={item.content}
                  category={item.category}
                  likeCnt={item.likeCnt}
                  viewCnt={item.viewCnt}
                  commentCnt={item.commentCnt}
                  techStack={item.techStack}
                  thumbnail={item.thumbnail}
                />
              </Link>
            </div>
          ))}
        </div>
        {
          (myBProMore) ?
          
            
            <button className="more-button" onClick={bmpower}>더보기</button>
            :
            (mybmProject.length === 0) ?
              <div className="dog-div">
                <img className="cute-dog" src={cuteDog} />
                <p>😢 아직 북마크한 프로젝트가 없습니다.</p>
              </div>
              :
              null
        }
      </div>
    </div>
  )
}

export default ProfilePage;