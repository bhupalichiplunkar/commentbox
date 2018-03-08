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
    timeStamp : new Date(),
    likes : [
      {
        id: 5,
        fname : 'Bhupali',
        lname : 'Chiplunkar',
        profilePic
      },
      {
        id: 6,
        fname : 'Aradhana',
        lname : 'Haldar',
      },
      {
        id: 7,
        fname : 'Revati',
        lname : 'Ghadge',
      },
      {
        id: 8,
        fname : 'Lakhan',
        lname : 'Suchdev',
      },
      {
        id: 9,
        fname : 'Mandar',
        lname : 'Rane',
      }
    ],
    comments : [{
      id: 12,
      author : {
        id: 6,
        fname : 'Aradhana',
        lname : 'Haldar',
      },
      timeStamp : new Date(),
      content : 'hey what a pretty picture',
      likes : [
        {
          id: 5,
          fname : 'Bhupali',
          lname : 'Chiplunkar',
          profilePic
        },
        {
          id: 6,
          fname : 'Aradhana',
          lname : 'Haldar',
        }],
      replies : [{
        id: 123,
        author : {
          id: 5,
          fname : 'Bhupali',
          lname : 'Chiplunkar',
          profilePic
        },
        timeStamp : new Date(),
        content : 'Thanks',
        likes : [{
          id: 6,
          fname : 'Aradhana',
          lname : 'Haldar',
        }],
      }]
    }]
  }
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default data;
