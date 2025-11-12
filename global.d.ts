declare namespace JSX {
    interface IntrinsicElements {
        "model-viewer": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            src?: string;
            "ios-src"?: string;
            "ar-modes"?: string;
            ar?: boolean;
            "camera-controls"?: boolean;
            "auto-rotate"?: boolean;
            "ar-placement"?: string;
        };
    }
}
