const puppeteer = require("puppeteer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

const generateCertificate = async ({ username, courseTitle, userId, courseId }) => {
  try {
    const certPath = path.join(__dirname, `../certificates/${userId}_${courseId}.pdf`);
    const dir = path.dirname(certPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const issueDate = formatDate(new Date());
    const certificateId = `RDC-${String(userId).slice(-6).toUpperCase()}-${String(courseId).slice(-6).toUpperCase()}`;

    // Read and compile the EJS template
    const templatePath = path.join(__dirname, "../views/certificate.ejs");
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    
    // Render HTML with dynamic variables
    const htmlContent = ejs.render(templateContent, {
      username,
      courseTitle,
      issueDate,
      certificateId
    });

    // Launch Puppeteer headless browser
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    
    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate high-quality PDF in Landscape
    await page.pdf({
      path: certPath,
      format: "A4",
      landscape: true,
      printBackground: true // Essential to capture background colors/gradients
    });

    await browser.close();
    return certPath;
  } catch (error) {
    console.error("Puppeteer Certificate Generation Error:", error);
    throw error;
  }
};

module.exports = generateCertificate;
