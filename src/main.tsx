import { createRoot } from 'react-dom/client'
import { StrictMode, Component, ReactNode } from 'react'
import App from './App.tsx'
import './index.css'

// Define props interface for ErrorBoundary
interface ErrorBoundaryProps {
  children?: ReactNode;
}

// Define state interface for ErrorBoundary
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error boundary for better debugging
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("React Error:", error, info)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
