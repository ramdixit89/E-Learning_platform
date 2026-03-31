const jwt = require('jsonwebtoken');

async function testEndpoint() {
  const token = jwt.sign({ userId: '67b3704efc3ee8c0eb7d6bd8', role: 'student' }, 'your_very_secure_secret_key_123', { expiresIn: '1h' });
  
  try {
    const res = await fetch('http://localhost:5000/api/complete-course/generate-certificate', {
      method: "POST",
      body: JSON.stringify({
        userId: '67b3704efc3ee8c0eb7d6bd8',
        courseId: '67b5ae15e8bfa17c09fe0f7a'
      }),
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    if (res.ok) {
        const buffer = await res.arrayBuffer();
        console.log("Success! Received bytes:", buffer.byteLength);
    } else {
        const text = await res.text();
        console.log("HTTP Error:", res.status, text);
    }
  } catch (err) {
    console.error("Request failed:", err.message);
  }
}
testEndpoint();
