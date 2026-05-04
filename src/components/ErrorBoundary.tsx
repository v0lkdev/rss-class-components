import { Component, type JSX, type ErrorInfo } from "react";

type ErrorBoundaryProps = {
    fallback: JSX.Element;
    children: JSX.Element;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return {hasError: true};
    }
    
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
