import React, { Component } from 'react';
import './Boundary.css'; 

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="error-boundary">
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error && this.state.error.toString()}</p>
                    <p>We're working to fix it. Please try refreshing the page.</p>
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
