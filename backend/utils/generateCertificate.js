const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = ({ username, courseTitle, userId, courseId }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 50 });

    const certPath = path.join(__dirname, `certificates/${userId}_${courseId}.pdf`);
    const dir = path.dirname(certPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const stream = fs.createWriteStream(certPath);
    doc.pipe(stream);

    // Background
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fffdf6");

    // Border
    doc
      .lineWidth(4)
      .strokeColor("#d4af37")
      .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .stroke();

    // RDCoders Logo
    const logoPath = path.join(__dirname, "../uploads/RD_CODERS___2_-removebg-preview (1).png"); // adjust path if needed
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, doc.page.width / 2 - 50, 40, { width: 100 });
    }

    // Title
    doc
      .fontSize(34)
      .fillColor("#222")
      .font("Helvetica-Bold")
      .text("CERTIFICATE", { align: "center", lineGap: 4 });

    doc
      .fontSize(18)
      .font("Helvetica")
      .fillColor("#444")
      .text("of Completion", { align: "center" });

    // Recipient Name
    doc
      .moveDown(2)
      .fontSize(24)
      .fillColor("#000")
      .font("Helvetica")
      .text(`This certificate is awarded to`, { align: "center" });

    doc
      .moveDown(0.5)
      .fontSize(30)
      .fillColor("#d4af37")
      .font("Helvetica-Bold")
      .text(username, { align: "center" });

    doc
      .moveDown(0.5)
      .fontSize(20)
      .fillColor("#000")
      .font("Helvetica")
      .text(`for successfully completing the course`, { align: "center" });

    doc
      .moveDown(0.5)
      .fontSize(26)
      .fillColor("#0a4d8c")
      .font("Helvetica-Bold")
      .text(courseTitle, { align: "center" });

    // Footer Details
    doc
      .moveDown(3)
      .fontSize(12)
      .fillColor("#888")
      .text("RDCoders • Empowering Coders", { align: "center" });

    // Instructor Signature Section
    doc
      .fontSize(16)
      .fillColor("#000")
      .text("Instructor: Ram Dixit", 70, doc.page.height - 100);

    doc
      .fontSize(12)
      .fillColor("#444")
      .text("Professional Educator", 70, doc.page.height - 80);

    // Seal Image (Optional)
    const sealPath = path.join(__dirname, "../uploads/seal.png"); // If you want to add a seal image
    if (fs.existsSync(sealPath)) {
      doc.image(sealPath, doc.page.width - 150, doc.page.height - 150, { width: 100 });
    }

    doc.end();

    stream.on("finish", () => resolve(certPath));
    stream.on("error", reject);
  });
};

module.exports = generateCertificate;
