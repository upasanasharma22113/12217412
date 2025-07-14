import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { log } from '../logger/logger';

function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    log("frontend", "info", "page", `RedirectPage loaded with shortcode: ${shortcode}`);

    const fetchAndRedirect = async () => {
      try {
       
        const response = await axios.get(`http://your-backend/api/url/${shortcode}`, {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`
          }
        });

        const { originalUrl } = response.data;

        log("frontend", "info", "page", `Redirecting to: ${originalUrl}`);
        window.location.href = originalUrl;

      } catch (error) {
        log("frontend", "error", "page", `Redirection failed for shortcode ${shortcode}: ${error.message}`);
        alert("Invalid or expired URL");
      }
    };

    fetchAndRedirect();
  }, [shortcode]);

  return <p>🔁 Redirecting...</p>;
}

export default RedirectPage;
