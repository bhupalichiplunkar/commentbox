import profilePic from '../assets/images/profilepic.jpg';
import postImg from '../assets/images/postImg.jpg';

const data = {
  currentUser : {
    id: 5,
    fname : 'Bhupali',
    lname : 'Chiplunkar',
    profilePic
  },
  post : {
    id : 1,
    caption : 'my pic',
    postImg,
    likes : ['Bhupali', 'Aradhana', 'Revati', 'Mandar', 'Lakhan'],
    comments : [{
      id: 12,
      author : 5,
      timeStamp : new Date(),
      content : 'hey what a pretty picture',
      likes : ['Bhupali', 'Aradhana'],
      replies : [{
        id: 123,
        author : 'Bhupali',
        timeStamp : new Date(),
        content : 'Thanks',
        likes : ['Aradhana'],
      }]
    }]
  }
}

export default data;
