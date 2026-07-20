import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Component, type ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(e: Error) { return { error: e }; }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <div style={{ padding: '40px', fontFamily: 'monospace', color: '#D4AF37', background: '#011a10', minHeight: '100vh' }}>
          <h1 style={{ color: '#ff6b6b' }}>React Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#fff', fontSize: '14px' }}>{err.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#aaa', fontSize: '12px' }}>{err.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary><App /></ErrorBoundary>
);
