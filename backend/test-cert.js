const generateCertificate = require("d:/Resume_projects/E-Learning_platform/backend/utils/generateCertificate");
generateCertificate({
  username: "Test User",
  courseTitle: "Test Course",
  userId: "123456789012345678901234",
  courseId: "123456789012345678901234"
}).then(certPath => {
  console.log("Success! Path:", certPath);
}).catch(err => {
  console.error("Error:", err);
});
