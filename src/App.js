import React, { useState } from "react"
import './App.css';
import Button from "react-bootstrap/Button";
import animate from "animate.css"
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  var randomNumber = Math.floor(Math.random() * 50); 
  // var ranNum = Math.floor(Math.random() * 5); 
  // var colourArray = ["red", "blue", "yellow", "purple", "green"]

  const [quote, setQuote] = useState({
    txt: "",
    auth: ""
  });

  // const [boxStyle, setBoxStyle] = useState({
  //   backgroundColor: "",
  //   color: ""
  // })

  const [getQuote, setGetQuote] = useState(true)
  const [animate, setAnimation] = useState({
    animation: "",
    
  });

  
  function ani() {
    // document.getElementById('quote-text').className = 'classname';
    const element = document.getElementById('quote-text')
    element.classList.remove('classname'); // reset animation
    void element.offsetWidth; // trigger reflow
    element.classList.add('classname'); // start animation
  }


  React.useEffect(() => {
   
   if(getQuote){     
     
    fetch("https://zenquotes.io/api/quotes/")
    .then(response=>{
      if(response.ok){
        return(response.json())
      }
      throw response
    })
    .then(data=>{
        ani();    
        setQuote({
          txt: data[randomNumber].q,
          auth: data[randomNumber].a
        }) 
         
    })
    .catch(error=>{
      console.log(error)
    })
  }
  
  setGetQuote(false)    
  }, [getQuote, randomNumber])  

  return (
    <div className="App" style={{backgroundColor: "#fff"}}>
      <header className="App-header">
      <h1>Be Motivated!</h1>
      <div id="quote-box" >
        <h3 id="quote-text" > {quote.txt}</h3>
        <p id="author" style={{textShadow: "2px 2px 2px #fff"}}> {quote.auth}</p>
        <div></div>
        <Button variant="dark" size="sm" id="new-quote" onClick={ ()=>{setGetQuote(true)} }>Next Quote</Button>
        <Button variant="dark" size="sm" id="tweet-quote" type="link"> Tweet Quote </Button>


      </div>
        
       
      </header>
    </div>
  );
}

export default App;
