import React, {useState} from 'react';
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

function App() {

  const [text, setText] = useState("");
  const [pirateText, setPirateText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  //calls Pirate Translator API with text input and saves translation to state
  function handleSubmit(event) {
    fetch("https://api.funtranslations.com/translate/pirate.json?text=" + text)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error("API Request Failed!");
        setPirateText("Error: Request Failed! (Probably exceeded the 5 calls per hour limit)");
      }
    })
    .then(data => {
      setPirateText(data.contents.translated);
    });    
  }

  return (
    <div className="app-container">
      <InputBox text={text}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
      />
      <OutputBox pirateText={pirateText}/>
      <div className="attribution-links-container">
        <a href="http://www.freepik.com">
          parchment created by Brgfx - www.freepik.com
        </a>  
        <a href='https://www.freepik.com/vectors/tree'>
          background image created by upklyak - www.freepik.com
        </a>
      </div>
      
    </div>
  )
}

export default App;
