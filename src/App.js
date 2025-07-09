import React, { useState } from "react";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);
  const [inputUrls, setInputUrls] = useState("");
  const [validity, setValidity] = useState("");
  const [preferredCode, setPreferredCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputUrls.trim()) return;

    const urlList = inputUrls
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url)
      .slice(0, 5);

    // Generate fake short URLs for each
    const newUrls = urlList.map((original, idx) => ({
      original,
      short: preferredCode
        ? `https://short.ly/${preferredCode}${urlList.length > 1 ? idx + 1 : ""}`
        : "https://short.ly/" + Math.random().toString(36).substring(7),
      validity: validity || "Not set",
      preferredCode: preferredCode || "Not set",
    }));

    setUrls([...newUrls, ...urls]);
    setInputUrls("");
    setValidity("");
    setPreferredCode("");
  };

  return (
    <div className="App">
      <header>
        <h1>URL Shortener</h1>
      </header>
      {/* URL Shorten Form */}
      <section>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter up to 5 URLs, one per line"
            value={inputUrls}
            onChange={(e) => setInputUrls(e.target.value)}
            rows={5}
            style={{ width: "60%", padding: "8px", display: "block", marginBottom: "10px" }}
            required
          />
          <input
            type="text"
            placeholder="Optional validity time (e.g., 24h, 7d)"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            style={{ width: "60%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Optional preferred short code"
            value={preferredCode}
            onChange={(e) => setPreferredCode(e.target.value)}
            style={{ width: "60%", padding: "8px", marginBottom: "10px" }}
          />
          <button type="submit" style={{ marginLeft: "10px", padding: "8px 16px" }}>
            Shorten
          </button>
        </form>
        <small>Enter up to 5 URLs, each on a new line.</small>
      </section>
      {/* List of shortened URLs */}
      <section>
        {urls.length === 0 ? (
          <p>No URLs shortened yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {urls.map((url, idx) => (
              <li key={idx} style={{ margin: "12px 0", background: "#f5f5f5", padding: "10px", borderRadius: "6px" }}>
                <div>
                  <strong>Original:</strong> <a href={url.original} target="_blank" rel="noopener noreferrer">{url.original}</a>
                </div>
                <div>
                  <strong>Shortened:</strong> <a href={url.short} target="_blank" rel="noopener noreferrer">{url.short}</a>
                </div>
                <div>
                  <strong>Validity:</strong> {url.validity}
                </div>
                <div>
                  <strong>Preferred Code:</strong> {url.preferredCode}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;