import React from 'react';
import './App.css';
import openai from './openai';

function App() {
  const [input, setInput] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [loading, setLoading] = React.useState();

  const handleSubmit = async () => {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Correct this to standard English: " + input.trimEnd(),
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    document.getElementById('answer').innerHTML = response.data.choices[0].text;
    setLoading(false);
  }

  React.useEffect(() => {
    if (done) {
      setTimeout(() => {
        setDone(false);
      }, 3000);
    }
  }, [done]);

  return (
    <div className="App">
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your string here" />
      <button onClick={handleSubmit}>Submit</button>
      {loading ? <p>Loading...</p> : null}
      <div>
        <h4>Corrected sentence</h4>
        <p id="answer"></p>
        <button onClick={() => {
          navigator.clipboard.writeText(document.getElementById('answer').innerText);
          setDone(true);
        }}>Copy to Clipboard</button>
        {done ? <p>Copied to clipboard successfully!</p> : null}
      </div>
    </div >
  );
}

export default App;
