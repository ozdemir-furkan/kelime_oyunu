import './App.css';
import { useState, useEffect} from 'react';
import { DATA } from './data';
const alphabet=["A","B","C","D","E","F","G","H","I","İ","J","K","L","M","N","O","Ö","P","R","S","Ş","T","U","Ü","V","Y","Z"];
function App() {
  const [index,setIndex]=useState(0);
  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");
  const [answerArray,setAnswerArray]=useState([]);
  const [keywords,setKeywords]=useState([]);
  const [resultQuestion,setResultQuestion]=useState(false);
  const [wrong,setWrong]=useState(false);
  const resim = document.createElement("img");


  const shuffle=(array)=>{
    return array.sort(()=>Math.random()-0.5);
  }

  const setKeyword = (keyword) => {
    keywords.push(keyword);
    setKeywords([...keywords]);
  
    const updatedAnswerArray = [...answerArray];
    const keywordIndex = updatedAnswerArray.indexOf(keyword);
    if (keywordIndex !== -1) {
      updatedAnswerArray.splice(keywordIndex, 1);
    }
      setAnswerArray(updatedAnswerArray);
    if (keywords.length === answer.length) {
      if (answer === keywords.join("")) {
        setIndex(index + 1);
        setKeywords([]);
        setResultQuestion(true);
      } else {
        setWrong(true);
      }
    }
  }; 


  useEffect(()=>{
    setWrong(false);
    setResultQuestion(false);
    setAnswer("");
    if(typeof DATA[index]!="undefined"){

    const answer=DATA[index].answer.toLowerCase();
    setAnswer(answer);
    setQuestion(DATA[index].question);
    const stringToArray= answer.split("");
    stringToArray.push(alphabet[Math.floor(Math.random()*alphabet.length)]);
    stringToArray.push(alphabet[Math.floor(Math.random()*alphabet.length)]);
    stringToArray.push(alphabet[Math.floor(Math.random()*alphabet.length)]);
    stringToArray.push(alphabet[Math.floor(Math.random()*alphabet.length)]);
    const alphabetLowerData= stringToArray.map((answer)=>answer.toLowerCase());
    setAnswerArray(shuffle(alphabetLowerData));
  }
    
  }, [resultQuestion]);

  const removeKeyword = (index) => {
    const removedKeyword = keywords.splice(index, 1)[0];
    setKeywords([...keywords]);

    const updatedAnswerArray = [...answerArray, removedKeyword];
    setAnswerArray(updatedAnswerArray.slice(0, answerArray.length + 1));
  };
  return (
    <div className="App">
      <div className="imgBox">
        <img
          className="img1"
          src="https://cdn-icons-png.flaticon.com/512/5726/5726532.png"
        />
        <img
          className="img2"
          src="https://t3.ftcdn.net/jpg/00/53/73/42/360_F_53734293_rs3bkrl9n1EJZBj2CdogkmeF6W5aOhy5.jpg"
        />
        <img
          className="img3"
          src="https://media.istockphoto.com/id/508545844/photo/question-mark-from-books-searching-information-or-faq-edication.jpg?s=612x612&w=0&k=20&c=-RTL7PuuaYZWifHcE4lvNFjqPY_J9VpqMNegcc3sdgA="
        />
        <img
          className="img4"
          src="https://www.balatoyz.com/img/products/2_22.03.2023_ee7d1e8.jpg"
        />
      </div>
      {answer!=""&&
      <div>
      <div>
        <span className={"question-name"}>{question}</span>
      </div>
      
      <div className={"question-area"}>
        {keywords.map((item,index)=>(
          <span style={{"border-bottom":(wrong)?"3px solid red":"3px solid #ddd"}} className={"question"} onClick={()=>removeKeyword(index)} key={index}>
            {item}
          </span>
        ))}

      </div>
      
      <div className={"button-area"}>
        {answerArray.map((item,index)=>(
          <button className={"button"} key={index} onClick={()=>setKeyword(item)}>
            {item}
          </button>
        ))}
      </div>
      
      </div>
      }
      {answer == ""&&
      <div className={"empty-message"}>Sorular Bitti!!
      </div>
      }

    </div>
  );
}

export default App;
