import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white text-center p-4">
          <h1 className="display-1 fw-bold text-danger mb-4">Oops!</h1>
          <h3 className="mb-4">Something went wrong on our end.</h3>
          <p className="text-muted mb-5">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button 
            className="btn btn-primary btn-lg rounded-pill"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
          >
            Go Back Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
