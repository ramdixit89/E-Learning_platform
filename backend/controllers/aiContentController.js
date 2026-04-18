const Course = require("../models/courseModel");

// Dynamically generate AI Quizzes and Interview Questions using Open Source LLMs
exports.generateAiAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // 'quiz' or 'interview'

    // Fetch the course content
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Prepare course context string (limit to avoid massive context window overload, roughly 5000 chars)
    let courseContext = `Course Title: ${course.title}\nDescription: ${course.description}\n`;
    courseContext += "Topics covered:\n";
    course.topics.forEach((topic, index) => {
      courseContext += `${index + 1}. ${topic.title} - ${topic.content.substring(0, 300)}...\n`;
    });

    courseContext = courseContext.substring(0, 10000); // hard cap context length

    // Setup Open Source LLM Endpoint (Defaults to Groq API running Llama 3)
    const LLM_API_KEY =
      process.env.GROQ_API_KEY || process.env.LLM_API_KEY || "no_key_provided";
    const LLM_BASE_URL =
      process.env.LLM_BASE_URL || "https://api.groq.com/openai/v1";
    const LLM_MODEL = process.env.LLM_MODEL || "llama-3.1-8b-instant";

    let prompt = "";
    if (type === "quiz") {
      prompt = `
      You are an expert educator. Based on the following course content, generate an exactly formatted JSON array of 5 multiple-choice questions. 
      The JSON array must be named "quizzes" and each object must contain "question" (string), "options" (array of exactly 4 strings), "correctAnswer" (string, must exactly match one of the options), and "explanation" (string).
      Return ONLY raw JSON, no markdown syntax, no backticks, no other words. 
      Course Content:
      ${courseContext}
      `;
    } else {
      prompt = `
      You are an expert tech recruiter. Based on the following course content, generate an exactly formatted JSON array of 5 interview questions and answers. 
      The JSON array must be named "interviewQuestions" and each object must contain "question" (string) and "answer" (string, a comprehensive answer).
      Return ONLY raw JSON, no markdown syntax, no backticks, no other words. 
      Course Content:
      ${courseContext}
      `;
    }

    // We use native fetch to call the OpenAI-compatible endpoint (Groq/Ollama/OpenRouter)
    const fetchUrl = LLM_BASE_URL.endsWith("/chat/completions") ? LLM_BASE_URL : `${LLM_BASE_URL.replace(/\/$/, '')}/chat/completions`;

    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3, // Low temp for structured JSON logic
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LLM API Error:", errorText);
      return res
        .status(500)
        .json({
          message:
            "Failed to connect to the AI model. Ensure GROQ_API_KEY is in your .env",
          error: errorText,
        });
    }

    const data = await response.json();
    let generatedText = data.choices[0].message.content.trim();

    // Safety cleaner: in case the model wraps the JSON in markdown code blocks like ```json ... ```
    if (generatedText.startsWith("```json")) {
      generatedText = generatedText.substring(7);
    }
    if (generatedText.startsWith("```")) {
      generatedText = generatedText.substring(3);
    }
    if (generatedText.endsWith("```")) {
      generatedText = generatedText.substring(0, generatedText.length - 3);
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(generatedText.trim());
    } catch (e) {
      console.error("Raw AI Output:", generatedText);
      throw new Error("AI failed to return valid JSON format.");
    }

    // Save to database (robustly handle if AI wrapped it in object or returned raw array)
    if (type === "quiz") {
      const finalQuizzes = Array.isArray(parsedJson) ? parsedJson : parsedJson.quizzes || parsedJson.quiz;
      if (finalQuizzes) {
        course.quizzes = finalQuizzes;
        await course.save();
        return res.status(200).json({ message: "AI Quiz Generated successfully!", data: course.quizzes });
      }
    } else if (type === "interview") {
      const finalQuestions = Array.isArray(parsedJson) ? parsedJson : parsedJson.interviewQuestions || parsedJson.questions;
      if (finalQuestions) {
        course.interviewQuestions = finalQuestions;
        await course.save();
        return res.status(200).json({ message: "AI Interview Questions Generated successfully!", data: course.interviewQuestions });
      }
    }
    
    console.error("AI Output shape mismatch:", parsedJson);
    throw new Error("Invalid format returned by AI.");

  } catch (error) {
    console.error("Generate AI Error:", error);
    res
      .status(500)
      .json({
        message: "Server error during AI generation.",
        error: error.message,
      });
  }
};
