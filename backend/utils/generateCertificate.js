const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = ({ username, courseTitle, userId, courseId }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 40 });

    const certPath = path.join(__dirname, `certificates/${userId}_${courseId}.pdf`);
    const dir = path.dirname(certPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const stream = fs.createWriteStream(certPath);
    doc.pipe(stream);

    // Background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fffdf6");

    // Top & Bottom Border Lines
    doc.lineWidth(3).strokeColor("#d4af37");
    doc.moveTo(40, 40).lineTo(doc.page.width - 40, 40).stroke();
    doc.moveTo(40, doc.page.height - 40).lineTo(doc.page.width - 40, doc.page.height - 40).stroke();

    // Logo
    const logoPath = path.join(__dirname, "../uploads/logo.png");
    console.log("Logo Path:", logoPath);  // Should print correct absolute path
    console.log("Logo Exists:", fs.existsSync(logoPath));
    if (fs.existsSync(logoPath)) {
      console.log("Logo Exists:", fs.existsSync(logoPath)); // Add this line temporarily
      doc.image(logoPath, doc.page.width / 2 - 50, 50, { width: 100 });
    }
    
    // Title
    doc
      .fontSize(28)
      .fillColor("#001f3f")
      .font("Helvetica-Bold")
      .text("CERTIFICATE OF COMPLETION", 0, 130, { align: "center" });

    // Presented text
    doc
      .fontSize(16)
      .fillColor("#001f3f")
      .font("Helvetica")
      .text("This certificate is proudly presented to", {
        align: "center",
      });

    // Username
    doc
      .moveDown(0.3)
      .fontSize(30)
      .fillColor("#b8860b")
      .font("Helvetica-Bold")
      .text(username, { align: "center" });

    // Course Completion Text
    doc
      .moveDown(0.3)
      .fontSize(16)
      .fillColor("#001f3f")
      .font("Helvetica")
      .text("For successfully completing the course", { align: "center" });

    // Course Title
    doc
      .moveDown(0.2)
      .fontSize(24)
      .fillColor("#0a4d8c")
      .font("Helvetica-Bold")
      .text(courseTitle, { align: "center" });

    // Instructor Name
    doc
      .fontSize(14)
      .fillColor("#000")
      .font("Helvetica-Bold")
      .text("Ram Dixit", 80, doc.page.height - 120);
    doc
      .fontSize(12)
      .fillColor("#444")
      .font("Helvetica")
      .text("Professional Educator", 80, doc.page.height - 100);

    // Footer line
    doc
      .fontSize(12)
      .fillColor("#444")
      .font("Helvetica")
      .text("RDCoders • Empowering Coders • www.rdcoders.com", 0, doc.page.height - 60, {
        align: "center",
      });

    // Seal
    const sealPath = path.join(__dirname, "./uploads/seal.png"); // Use your red seal image here
    if (fs.existsSync(sealPath)) {
      doc.image(sealPath, doc.page.width - 160, doc.page.height - 160, { width: 100 });
    }

    doc.end();

    stream.on("finish", () => resolve(certPath));
    stream.on("error", reject);
  });
};

module.exports = generateCertificate;
