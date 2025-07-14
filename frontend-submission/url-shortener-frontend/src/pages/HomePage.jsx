
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { log } from '../logger/logger';

function HomePage() {
  const [inputs, setInputs] = useState([
    { url: '', expiry: '', shortcode: '' },
  ]);

  const [results, setResults] = useState([]);

  useEffect(() => {
    log('frontend', 'info', 'page', 'HomePage mounted');
  }, []);

  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', expiry: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInputs = inputs.filter(input => input.url.trim() !== '');
    if (validInputs.length === 0) {
      alert("Please enter at least one valid URL.");
      return ;
    }

    try {
      const shortened = [];

      for (let input of validInputs) {
        const body = {
          originalUrl: input.url,
          validity: input.expiry ? parseInt(input.expiry) : 30,
          shortcode: input.shortcode || null
        };

        log("frontend", "info", "api", `Sending POST for ${input.url}`);

       
        const res = await axios.post("https://jsonplaceholder.typicode.com/posts", body);

        shortened.push({
          originalUrl: input.url,
          shortUrl: `http://short.ly/${input.shortcode || 'xyz123'}`,
          expiry: body.validity
        });
      }

      setResults(shortened);
      log("frontend", "info", "api", "All URLs shortened successfully.");
    } catch (err) {
      console.error(err);
      log("frontend", "error", "api", `Error shortening URLs: ${err.message}`);
      alert("Something went wrong while shortening URLs.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔗 URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={index} style={{ marginBottom: "15px", borderBottom: "1px solid #ddd" }}>
            <h4>URL #{index + 1}</h4>
            <input
              type="text"
              placeholder="Original URL"
              value={input.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
              required
            /><br />
            <input
              type="number"
              placeholder="Expiry in minutes (default 30)"
              value={input.expiry}
              onChange={(e) => handleChange(index, 'expiry', e.target.value)}
            /><br />
            <input
              type="text"
              placeholder="Custom Shortcode (optional)"
              value={input.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            />
          </div>
        ))}
        {inputs.length < 5 && (
          <button type="button" onClick={addInput}>➕ Add another URL</button>
        )}
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>Shorten URLs</button>
      </form>

      {/* RESULTS */}
      {results.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>🎉 Shortened Links:</h3>
          <ul>
            {results.map((res, i) => (
              <li key={i}>
                <strong>{res.shortUrl}</strong> <br />
                🔗 Original: {res.originalUrl} <br />
                ⏳ Expires in: {res.expiry} minutes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePage;
