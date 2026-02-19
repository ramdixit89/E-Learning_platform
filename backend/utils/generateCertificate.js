const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

const generateCertificate = ({ username, courseTitle, userId, courseId }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 40 });

    const certPath = path.join(__dirname, `certificates/${userId}_${courseId}.pdf`);
    const dir = path.dirname(certPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const stream = fs.createWriteStream(certPath);
    doc.pipe(stream);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const issueDate = formatDate(new Date());
    const certificateId = `RDC-${String(userId).slice(-6).toUpperCase()}-${String(courseId)
      .slice(-6)
      .toUpperCase()}`;

    // Background
    doc.rect(0, 0, pageWidth, pageHeight).fill("#fdfbf6");

    // Outer border
    doc.lineWidth(4).strokeColor("#c9a23f");
    doc.roundedRect(25, 25, pageWidth - 50, pageHeight - 50, 12).stroke();

    // Inner border
    doc.lineWidth(1).strokeColor("#e1c676");
    doc.roundedRect(40, 40, pageWidth - 80, pageHeight - 80, 10).stroke();

    // Watermark
    doc
      .font("Helvetica-Bold")
      .fontSize(80)
      .fillColor("#f2efe6")
      .opacity(0.7)
      .text("RDCODERS", 0, pageHeight / 2 - 60, { align: "center" });
    doc.opacity(1);

    // Logo
    const logoPath = path.join(__dirname, "../uploads/logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, pageWidth / 2 - 50, 55, { width: 100 });
    }

    // Title
    doc
      .fontSize(28)
      .fillColor("#001f3f")
      .font("Helvetica-Bold")
      .text("CERTIFICATE OF COMPLETION", 0, 135, { align: "center" });

    // Presented text
    doc
      .fontSize(16)
      .fillColor("#001f3f")
      .font("Helvetica")
      .text("This certificate is proudly presented to", { align: "center" });

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
      .text(courseTitle, { align: "center", width: pageWidth - 120, lineGap: 4 });

    // Issue date
    doc
      .moveDown(0.8)
      .fontSize(12)
      .fillColor("#333")
      .font("Helvetica")
      .text(`Issued on ${issueDate}`, { align: "center" });

    // Signature line
    doc
      .strokeColor("#444")
      .lineWidth(1)
      .moveTo(80, pageHeight - 130)
      .lineTo(260, pageHeight - 130)
      .stroke();

    // Instructor Name
    doc
      .fontSize(14)
      .fillColor("#000")
      .font("Helvetica-Bold")
      .text("Ram Dixit", 80, pageHeight - 120);
    doc
      .fontSize(12)
      .fillColor("#444")
      .font("Helvetica")
      .text("Lead Instructor", 80, pageHeight - 100);

    // Certificate ID
    doc
      .fontSize(10)
      .fillColor("#666")
      .font("Helvetica")
      .text(`Certificate ID: ${certificateId}`, pageWidth - 320, pageHeight - 120);

    // Footer line
    doc
      .fontSize(12)
      .fillColor("#444")
      .font("Helvetica")
      .text("RDCoders - Empowering Coders - www.rdcoders.com", 0, pageHeight - 60, {
        align: "center",
      });

    doc.end();

    stream.on("finish", () => resolve(certPath));
    stream.on("error", reject);
  });
};

module.exports = generateCertificate;
