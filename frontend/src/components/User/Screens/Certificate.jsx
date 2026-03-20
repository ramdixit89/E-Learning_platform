import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload, FaPrint, FaImage } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const Certificate = ({ userName = "Student Name", courseTitle = "Web Development Bootcamp", date = new Date().toLocaleDateString() }) => {
  const certificateRef = useRef();

  // 1. Print directly using react-to-print
  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `${userName} - Certificate`,
  });

  // 2. Download High-Res Image (PNG)
  const downloadImage = async () => {
    const element = certificateRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 3, useCORS: true });
    const data = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = data;
    link.download = `Certificate_${userName}.png`;
    link.click();
  };

  // 3. Download High-Res PDF
  const downloadPDF = async () => {
    const element = certificateRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    // jsPDF parameters: landscape orientation, points unit, A4 page size
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    // Maintain aspect ratio calculation based on elements width/height
    const canvasInfo = element.getBoundingClientRect();
    const ratio = canvasInfo.height / canvasInfo.width;
    const pdfHeight = pdfWidth * ratio;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Certificate_${userName}.pdf`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Great+Vibes&family=Montserrat:wght@400;600&display=swap');

        .certificate-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1rem;
          background-color: #f3f4f6;
          min-height: 100vh;
        }

        .actions-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }

        .cert-container {
          width: 900px;
          height: 650px;
          background: #fff;
          padding: 20px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          /* Subtle woven texture overlay */
          background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23f9fafb" fill-opacity="0.4" fill-rule="evenodd"><path d="M50 50L0 0v100h100z"/></g></svg>');
        }

        .cert-border-outer {
          border: 5px solid #b89c49;
          height: 100%;
          padding: 10px;
        }

        .cert-border-inner {
          border: 1px solid #b89c49;
          height: 100%;
          position: relative;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%);
        }

        /* Golden Corners */
        .cert-corner {
          position: absolute;
          width: 45px;
          height: 45px;
          border: 5px solid #b89c49;
        }

        .cert-corner-tl { top: -6px; left: -6px; border-right: none; border-bottom: none; }
        .cert-corner-tr { top: -6px; right: -6px; border-left: none; border-bottom: none; }
        .cert-corner-bl { bottom: -6px; left: -6px; border-right: none; border-top: none; }
        .cert-corner-br { bottom: -6px; right: -6px; border-left: none; border-top: none; }

        .cert-header {
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          color: #1f2937;
          letter-spacing: 4px;
          text-align: center;
          margin-bottom: 5px;
        }

        .cert-subheader {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
          color: #b89c49;
          letter-spacing: 6px;
          text-transform: uppercase;
          margin-bottom: 40px;
          font-weight: 600;
        }

        .cert-body-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          color: #4b5563;
          margin-bottom: 20px;
        }

        .cert-recipient {
          font-family: 'Great Vibes', cursive;
          font-size: 4.8rem;
          color: #111827;
          margin-bottom: 15px;
          line-height: 1;
        }

        .cert-course {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          color: #1e3a8a; /* Deep elegant blue */
          margin-bottom: 50px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 5px;
          font-weight: 700;
        }

        .cert-footer {
          display: flex;
          justify-content: space-between;
          width: 85%;
          margin-top: auto;
          align-items: flex-end;
        }

        .sign-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 200px;
        }

        .sign-line {
          width: 100%;
          border-bottom: 1px solid #4b5563;
          margin-bottom: 10px;
          margin-top: 5px;
        }

        .sign-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 2px;
          color: #4b5563;
          text-transform: uppercase;
        }

        .sign-date {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 1.2rem;
          color: #111827;
          height: 35px; /* keep signature height aligned */
          display: flex;
          align-items: flex-end;
          margin-bottom: 4px;
        }
        
        .instructor-sign {
          font-family: 'Great Vibes', cursive;
          font-size: 2.5rem;
          color: #111827;
          height: 35px;
          display: flex;
          align-items: flex-end;
          margin-bottom: -5px; /* slight adjust for cursive descenders */
        }

        .seal-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .seal {
          width: 110px;
          height: 110px;
          background: radial-gradient(circle, #d4af37 0%, #aa8529 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.1);
          border: 4px solid #fff;
          position: relative;
          z-index: 2;
        }

        .seal::before {
          content: '';
          position: absolute;
          width: 118px;
          height: 118px;
          border: 1.5px dashed #b89c49;
          border-radius: 50%;
          z-index: -1;
        }

        .seal-inner {
          font-family: 'Cinzel', serif;
          color: #fff;
          font-weight: bold;
          text-align: center;
          font-size: 0.75rem;
          letter-spacing: 2px;
          line-height: 1.4;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }

        /* Ribbon effect behind the seal */
        .ribbon-left, .ribbon-right {
          position: absolute;
          bottom: -20px;
          width: 30px;
          height: 50px;
          background: #8b0000; /* Deep red ribbon */
          z-index: 1;
        }

        .ribbon-left {
          left: 15px;
          transform: rotate(20deg);
          border-bottom-left-radius: 5px;
        }

        .ribbon-right {
          right: 15px;
          transform: rotate(-20deg);
          border-bottom-right-radius: 5px;
        }
        
        /* Ribbon tail cutouts */
        .ribbon-left::after, .ribbon-right::after {
          content: '';
          position: absolute;
          bottom: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 15px solid #f9fafb; /* matching inner background color to make the cut */
        }

        .ribbon-left::after { left: 0; }
        .ribbon-right::after { left: 0; }
      `}</style>

      <div className="certificate-wrapper">
        <div className="actions-bar">
          <button className="btn btn-outline-dark d-flex align-items-center gap-2" onClick={handlePrint}>
            <FaPrint /> Print Record
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={downloadImage}>
            <FaImage /> Export Image
          </button>
          <button className="btn btn-success d-flex align-items-center gap-2" onClick={downloadPDF}>
            <FaDownload /> Download PDF
          </button>
        </div>

        {/* Certificate DOM */}
        <div ref={certificateRef} className="cert-container" id="printable-certificate">
          <div className="cert-border-outer">
            <div className="cert-border-inner">
              {/* Corner Accents */}
              <div className="cert-corner cert-corner-tl"></div>
              <div className="cert-corner cert-corner-tr"></div>
              <div className="cert-corner cert-corner-bl"></div>
              <div className="cert-corner cert-corner-br"></div>

              {/* Main Content */}
              <div className="cert-header">Certificate of Completion</div>
              <div className="cert-subheader">This proudly certifies that</div>
              
              <div className="cert-recipient">{userName}</div>
              
              <div className="cert-body-text">has successfully completed the comprehensive program in</div>
              
              <div className="cert-course">{courseTitle}</div>

              {/* Footer row with Date, Seal, and Signature */}
              <div className="cert-footer">
                <div className="sign-block">
                  <div className="sign-date">{date}</div>
                  <div className="sign-line"></div>
                  <div className="sign-text">Date Completed</div>
                </div>

                <div className="seal-container">
                  <div className="ribbon-left"></div>
                  <div className="ribbon-right"></div>
                  <div className="seal">
                    <div className="seal-inner">OFFICIAL<br/>PRO<br/>SEAL</div>
                  </div>
                </div>

                <div className="sign-block">
                  <div className="instructor-sign">Ram Dixit</div>
                  <div className="sign-line"></div>
                  <div className="sign-text">Lead Instructor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;