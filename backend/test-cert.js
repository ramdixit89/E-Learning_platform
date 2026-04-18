const generateCertificate = require('./utils/generateCertificate');

(async () => {
    try {
        const certPath = await generateCertificate({
            username: "Test User",
            courseTitle: "Test Course",
            userId: "65d6c8e31a2b3c4d5e6f7c8d",
            courseId: "123456"
        });
        console.log("SUCCESS:", certPath);
    } catch (e) {
        console.error("FAILED:", e);
    }
})();
