const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument({ margin: 50 });
const outputPath = "d:/Resume_projects/Interview_Preparation_Guide.pdf";

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Helper for bold text
function addSectionTitle(title) {
  doc.moveDown();
  doc.fontSize(18).font("Helvetica-Bold").fillColor("#2c3e50").text(title);
  doc.fontSize(12).font("Helvetica").fillColor("black");
  doc.moveDown(0.5);
}

function addSubTitle(title) {
  doc.moveDown(0.5);
  doc.fontSize(14).font("Helvetica-Bold").fillColor("#2980b9").text(title);
  doc.fontSize(12).font("Helvetica").fillColor("black");
  doc.moveDown(0.2);
}

// Title
doc
  .fontSize(24)
  .font("Helvetica-Bold")
  .text("Interview Preparation Guide", { align: "center" });
doc
  .fontSize(12)
  .font("Helvetica")
  .text("Projects: E-Learning Platform & E-Commerce Full Stack", {
    align: "center",
  });
doc.moveDown(2);

// PROJECT 1
addSectionTitle("1. E-Learning Platform");

addSubTitle("One-Liner Introduction");
doc
  .font("Helvetica-Oblique")
  .text(
    '"I built a full-stack E-Learning platform where users can browse, enroll in, and complete courses, while admins can create and manage course content with rich text editing and multimedia support."',
  );

addSubTitle("Technical Overview");
doc.font("Helvetica").text("Frontend: React.js (Vite), CSS");
doc.text("Backend: Node.js, Express.js");
doc.text("Database: MongoDB (Mongoose ODM)");
doc.text("Auth: JWT, bcryptjs");
doc.text("Storage: Cloudinary");

addSubTitle("Key Features");
doc.list([
  "Role-Based Access Control (RBAC): Separate User/Admin dashboards.",
  "Course Management: Admins create courses with rich text topics.",
  'Progress Tracking: "completedCourse" model tracks user progress.',
  "Authentication: JWT, bcrypt, OTP-based password reset.",
]);

addSubTitle("Sample Interview Answer");
doc
  .font("Helvetica-Oblique")
  .text(
    '"For my E-Learning Platform, I implemented a MERN stack architecture. I built RESTful APIs for secure authentication and a comprehensive course management system supporting rich text content. A key challenge I solved was course progress tracking by creating a dedicated relationship model between users and courses."',
  );

// PROJECT 2
addSectionTitle("2. E-Commerce Full Stack");

addSubTitle("One-Liner Introduction");
doc
  .font("Helvetica-Oblique")
  .text(
    '"I developed a complete E-Commerce application with product catalog, dynamic variants, cart management, and a robust order processing system."',
  );

addSubTitle("Technical Overview");
doc.font("Helvetica").text("Frontend: React.js, Context API");
doc.text("Backend: Node.js, Express.js");
doc.text("Database: MongoDB (Mongoose)");
doc.text("Auth: JWT, bcrypt");
doc.text("State: Context API (Global Store)");

addSubTitle("Key Features");
doc.list([
  "Product Variants: Dynamic schema for multiple variants (size, color, etc.).",
  "Cart Logic: Database-persisted cart with auto-cleanup hooks on product deletion.",
  "Order Lifecycle: 5-stage status flow (Pending -> Delivered).",
  "Payment & Billing: Support for multiple payment methods and addresses.",
]);

addSubTitle("Sample Interview Answer");
doc
  .font("Helvetica-Oblique")
  .text(
    '"My E-Commerce project focuses on scalability and data integrity. I designed a dynamic product variant system to handle diverse inventory types without schema changes. I implemented Mongoose middleware to automatically clean up cart items when products are deleted to ensure database consistency."',
  );

// COMMON QUESTIONS
addSectionTitle("3. Common Interview Questions");

addSubTitle("Q1: What was the most challenging part?");
doc
  .font("Helvetica")
  .text(
    'E-Learning: "Implementing the rich text editor for course content and rendering raw HTML safely."',
  );
doc.moveDown(0.2);
doc.text(
  'E-Commerce: "Designing the flexible database schema for product variants so it scales for different product categories."',
);

addSubTitle("Q2: How did you handle security?");
doc.text(
  '"I used JWT for stateless authentication and bcrypt for password hashing. API endpoints are protected with custom middleware that verifies tokens."',
);

addSubTitle("Q3: Why MERN Stack?");
doc.text(
  '"The unified JavaScript ecosystem allows for seamless data flow (JSON) between frontend and backend. MongoDB\'s schema flexibility was crucial for complex data structures."',
);

doc.moveDown(2);
doc
  .fontSize(10)
  .fillColor("grey")
  .text("Generated for Interview Preparation", { align: "center" });

doc.end();

stream.on("finish", () => {
  console.log("PDF created successfully at: " + outputPath);
});
