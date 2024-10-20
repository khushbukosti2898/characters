import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorComponent } from './ErrorComponent';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorComponent onRetry={this.handleReload} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
