const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateCertificate = ({ username, courseTitle, userId, courseId }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    // Define certificate path
    const certPath = path.join(__dirname, `certificates/${userId}_${courseId}.pdf`);

    // Ensure the certificates folder exists
    const dir = path.dirname(certPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const stream = fs.createWriteStream(certPath);
    doc.pipe(stream);

    // Certificate Design
    doc
      .fontSize(30)
      .fillColor("blue")
      .text("Certificate of Completion", { align: "center" });

    doc.moveDown(1);
    doc
      .fontSize(20)
      .fillColor("black")
      .text(`This is to certify that`, { align: "center" });

    doc.moveDown(0.5);
    doc
      .fontSize(26)
      .fillColor("green")
      .text(username, { align: "center" });

    doc.moveDown(0.5);
    doc
      .fontSize(20)
      .fillColor("black")
      .text(`has successfully completed the course`, { align: "center" });

    doc.moveDown(0.5);
    doc
      .fontSize(24)
      .fillColor("darkblue")
      .text(courseTitle, { align: "center" });

    doc.moveDown(2);
    doc
      .fontSize(16)
      .text(`Instructor: Ram Dixit`, { align: "right", margin: 40 });

    doc.end();

    stream.on("finish", () => {
      resolve(certPath);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = generateCertificate;
