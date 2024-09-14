import logo from './logo.png';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState } from 'react';
import './App.css';

//require('dotenv').config()

function App() {

  const [skill , setSkill] = useState();
  const [roadmap , setRoadmap] = useState();
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateRoadmap(e) {
    setGeneratingAnswer(true);
    e.preventDefault();

    //setRoadmap("Loading your skill path... \n It might take upto 10 seconds");

    try {

      const genAi = new GoogleGenerativeAI("AIzaSyAPZfCIZnLqUB5toqkl4dO08PiQOD9NOoc")
      const model = genAi.getGenerativeModel({model : 'gemini-1.5-flash'})

      const prompt= `write a proffissonal roadmap to learn ${skill} skill and make it as apoints without details , also use emojies`

      const result = await model.generateContent(prompt)
      setRoadmap(result.response.text())

      setGeneratingAnswer(false);

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      
      <div className="container">

        <img className="logo" src={logo} alt="logo"></img>

        <div className="skill-container">
          <label htmlFor="skill">Write the skill you want to gain:</label>
          <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder='Ex: Graphic design, Web development, project management..' />
        </div>

        
        <button className='generator-btn' onClick={generateRoadmap}>Submit</button>

        <div className="roadmap-container">
          {generatingAnswer && (
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          )}
          <pre className='roadmap'>{roadmap}</pre>
        </div>


        <p className='madeBy'>@ Made by: Abdulrahman Omar</p>

      </div>
      
    </div>
  );
}

export default App;
