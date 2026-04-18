// 📌 Handle Chatbot Queries (Mock FAQ)
const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Please send a message." });
    }

    const lowerMsg = message.toLowerCase();
    let reply = "I am currently a mock assistant! 🤖 Try asking me about our 'courses', 'certificates', or 'prices'. In the future, I'll be powered by OpenAI!";

    if (lowerMsg.includes("course") || lowerMsg.includes("learn")) {
      reply = "We offer a wide variety of expert-led courses ranging from beginner to advanced. Visit the 'Courses' tab to explore our catalog!";
    } else if (lowerMsg.includes("certificate") || lowerMsg.includes("cert")) {
      reply = "Yes! You can earn free verified certificates upon completing 100% of a course curriculum. You can view them in your Dashboard.";
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("free")) {
      reply = "Our core platform features many free courses, and we also offer premium paths. Check the specific course detail page for enrollment information!";
    } else if (lowerMsg.includes("contact") || lowerMsg.includes("support")) {
      reply = "You can reach out to our team at support@rdcoders.com or visit our Contact page.";
    } else if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
      reply = "Hello there! 👋 How can I help you with your learning journey today?";
    }

    // Simulate network delay to make the bot feel real
    setTimeout(() => {
      res.status(200).json({ reply });
    }, 1000);

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ reply: "Oops! Something went wrong while connecting to the assistant." });
  }
};

module.exports = {
  askChatbot,
};
