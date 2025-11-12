import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: "chars" | "words" | "lines";
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    textAlign?: React.CSSProperties["textAlign"];
}

export const SplitText: React.FC<SplitTextProps> = ({
                                                        text,
                                                        className = "",
                                                        delay = 80,
                                                        duration = 0.6,
                                                        ease = "power3.out",
                                                        splitType = "chars",
                                                        from = { opacity: 0, y: 40 },
                                                        to = { opacity: 1, y: 0 },
                                                        threshold = 0.1,
                                                        rootMargin = "-100px",
                                                        tag = "h1",
                                                        textAlign = "center",
                                                    }) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Lazy load GSAP plugins to prevent SSR mismatch
        Promise.all([
            import("gsap/ScrollTrigger"),
            import("gsap/SplitText"),
        ]).then(([scrollTriggerModule, splitTextModule]) => {
            const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
            const SplitText = splitTextModule.SplitText;
            gsap.registerPlugin(ScrollTrigger, SplitText);

            const el = ref.current;
            if (!el) return;

            // Split the text
            const split = new SplitText(el, { type: splitType });
            const targets =
                splitType === "chars"
                    ? split.chars
                    : splitType === "words"
                        ? split.words
                        : split.lines;

            gsap.fromTo(
                targets,
                from,
                {
                    ...to,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    scrollTrigger: {
                        trigger: el,
                        start: `top ${100 - threshold * 100}% ${rootMargin}`,
                        once: true,
                    },
                }
            );

            return () => {
                ScrollTrigger.getAll().forEach((t) => t.kill());
                split.revert();
            };
        });
    }, [text, delay, duration, ease, splitType, threshold, rootMargin]);

    const Tag = tag as keyof JSX.IntrinsicElements;

    return (
        <Tag
            ref={ref}
            className={`split-parent inline-block overflow-hidden whitespace-normal ${className}`}
            style={{ textAlign, willChange: "transform, opacity" }}
        >
            {text}
        </Tag>
    );
};

export default SplitText;
