import axios from 'axios';
const TOKEN = "Bearer YOUR_ACCESS_TOKEN_HERE";

export const log = async (stack, level, pkg, message) => {
  try {
    const res = await axios.post(
      'http://20.244.56.144/eva1uation-service/logs',
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("✅ Log sent:", res.data);
  } catch (err) {
    console.error("❌ Logging failed:", err.message);
  }
};
