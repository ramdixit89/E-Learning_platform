import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Certificate = ({ userName, courseTitle, date }) => {
  const certificateRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: "Certificate",
  });

  return (
    <div className="text-center my-5">
      <button className="btn btn-success mb-3 d-flex align-items-center gap-2" onClick={handlePrint}>
        <FaDownload /> Download Certificate
      </button>

      <div ref={certificateRef} className="certificate p-5 shadow-lg text-center" style={styles.certificate}>
        <div style={styles.border}>
          <h1 className="fw-bold text-uppercase text-gold mt-3">Certificate of Completion</h1>
          <p className="fs-5 text-muted">This is to certify that</p>
          <h2 className="fw-bold text-primary">{userName}</h2>
          <p className="fs-5 text-muted">has successfully completed the course</p>
          <h3 className="fw-bold text-danger">{courseTitle}</h3>
          <p className="fs-6">on {date}</p>
          <div className="d-flex justify-content-between mt-4 px-5">
            <div>
              <hr style={{ width: "150px", borderTop: "2px solid black" }} />
              <p className="text-muted">Ram Dixit</p>
              <p className="text-muted">Instructor</p>
            </div>
            <div>
              <hr style={{ width: "150px", borderTop: "2px solid black" }} />
              <p className="text-muted">{date}</p>
              <p className="text-muted">Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  certificate: {
    width: "800px",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "15px",
    position: "relative",
  },
  border: {
    border: "10px solid gold",
    padding: "30px",
    borderRadius: "10px",
  },
};

export default Certificate;