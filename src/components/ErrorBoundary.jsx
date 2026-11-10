import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf9f6',
          padding: '2rem',
          fontFamily: "'Inter', sans-serif"
        }}>
          <div style={{
            background: '#FAF7F2',
            border: '1px solid #e7e5e4',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 10px 25px -5px rgba(28, 25, 23, 0.08)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <AlertTriangle size={28} />
            </div>

            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#1c1917',
              marginBottom: '0.65rem'
            }}>
              Examination Session Protected
            </h2>

            <p style={{
              fontSize: '0.875rem',
              color: '#57534e',
              lineHeight: 1.6,
              marginBottom: '1.75rem'
            }}>
              A temporary display error was safely intercepted. Your candidate account, saved examination scorecards, and subscription records remain intact.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.25rem',
                  background: '#1c1917',
                  color: '#FAF7F2',
                  border: '1px solid #1c1917',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={15} />
                <span>Reload Application</span>
              </button>

              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.25rem',
                  background: '#FAF7F2',
                  color: '#1c1917',
                  border: '1px solid #e7e5e4',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <Home size={15} />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

