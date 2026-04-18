

async function run() {
  try {
    const res = await fetch("http://localhost:5000/api/course/generate-ai-content/65d6c8e31a2b3c4d5e6f7c8d", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "quiz" })
    });
    const data = await res.text();
    console.log("STATUS:", res.status);
    console.log("BODY:", data);
  } catch (e) {
    console.error(e);
  }
}
run();
