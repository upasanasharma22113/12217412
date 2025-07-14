
import React, { useEffect, useState } from 'react';
import { log } from '../logger/logger';

function StatsPage() {
  const [urlStats, setUrlStats] = useState([]);

  useEffect(() => {
    log("frontend", "info", "page", "StatsPage mounted");

    
    const mockedData = [
      {
        originalUrl: "https://example.com/article/123",
        shortUrl: "http://localhost:3000/redirect/abc123",
        createdAt: "2025-07-14T10:00:00Z",
        expiry: "2025-07-14T10:30:00Z",
        clicks: [
          {
            time: "2025-07-14T10:01:30Z",
            source: "WhatsApp",
            location: "Delhi, India"
          },
          {
            time: "2025-07-14T10:04:30Z",
            source: "Email",
            location: "Bangalore, India"
          }
        ]
      },
      {
        originalUrl: "https://github.com/upasana/myrepo",
        shortUrl: "http://localhost:3000/redirect/dev321",
        createdAt: "2025-07-14T11:00:00Z",
        expiry: "2025-07-14T11:30:00Z",
        clicks: []
      }
    ];

    setUrlStats(mockedData);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 URL Analytics</h1>

      {urlStats.map((item, idx) => (
        <div key={idx} style={{ marginBottom: "25px", border: "1px solid #ddd", padding: "15px" }}>
          <p><strong>Original URL:</strong> {item.originalUrl}</p>
          <p><strong>Short URL:</strong> <a href={item.shortUrl} target="_blank" rel="noreferrer">{item.shortUrl}</a></p>
          <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
          <p><strong>Expires At:</strong> {new Date(item.expiry).toLocaleString()}</p>
          <p><strong>Total Clicks:</strong> {item.clicks.length}</p>

          {item.clicks.length > 0 && (
            <>
              <h4>📍 Click Insights:</h4>
              <ul>
                {item.clicks.map((click, i) => (
                  <li key={i}>
                    🕒 {new Date(click.time).toLocaleString()} — {click.source} from {click.location}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default StatsPage;
