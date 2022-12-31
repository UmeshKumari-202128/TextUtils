import React, {useState} from 'react'



export default function TextForm(props) {
  const handleUpClick = ()=>{
    //console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","success");
  }
  const handleLoClick = ()=>{
    //console.log("Lowercase was clicked" + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase","success");
  }
  const handleClearClick = ()=>{
    //console.log("Text Clear" + text);
    let newText = "";
    setText(newText);
    props.showAlert("Text has been cleared","success");
  }

//   const handleSpeakClick = ()=>{
//     let msg = new SpeechSynthesisUtterance();
//     msg.text = text;
//     window.speechSynthesis.speak(msg);
//   }
  const handleSpeakClick = ()=>{
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById("toggle")
    if(toogle.textContent==="Speak"){
        toogle.innerHTML="Stop"
    }else{
        toogle.innerHTML = "Speak"
        if(toogle.innerHTML==="Speak"){
            window.speechSynthesis.cancel()
        }
    }
    props.showAlert("Speaking Text","success");
  }

  const handleCopy =()=>{
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text has copied to clipboard","success");
  }

  const handleExtraSpaces = () =>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Space has removed","success");
  }
  const handleOnChange = (event)=>{
    //console.log("Onchange was clicked");
    setText(event.target.value);
  }
  const [text, setText] = useState('Enter text here');
  // text = "new text";     // wrong way to change the state
  // setText("new text");   // correct way to change the state
  return (
    <>
        <div className='container' style={{color:props.mode==="dark"?"white":"black"}}>
            <h2>{props.heading}</h2>
            <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor:props.mode==="dark"?"#042743":"white",color:props.mode==="dark"?"white":"black",border:props.mode==="dark"?"2px solid white":"2px solid black"}} id="myBox" rows="8"></textarea>
            </div>
            <button className="btn btn-primary mx-1 mb-1" onClick={handleUpClick}>Convert to UpperCase</button>
            <button className="btn btn-primary mx-1 mb-1" onClick={handleLoClick}>Convert to LowerCase</button>
            <button className="btn btn-primary mx-1 mb-1" onClick={handleClearClick}>Clear Text</button>
            <button className="btn btn-primary mx-1 mb-1" type="submit" id="toggle"onClick={handleSpeakClick}>Speak</button>
            <button className="btn btn-primary mx-1 mb-1" onClick={handleCopy}>Copy Text</button>    
            <button className="btn btn-primary mx-1 mb-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>     
        </div>
        <div className="container my-3" style={{color:props.mode==="dark"?"white":"black"}}>
            <h2> Your Text Summary </h2>
            <p> {text.split(" ").length} words and {text.length} characters</p>
            <p>{0.008*text.split(" ").length} Minutes read</p>
            <h3>Preview</h3>
            <p>{text.length>0?text:"Enter something to preview it here"}</p>
        </div>
    </>
  )
}
