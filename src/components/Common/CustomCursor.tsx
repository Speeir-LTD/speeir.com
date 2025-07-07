"use client";

import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (cursorRef.current && cursorInnerRef.current) {
      // Use transform for better performance
      const cursor = cursorRef.current;
      const cursorInner = cursorInnerRef.current;
      
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      // Use CSS transition for smoother follower effect instead of setTimeout
      cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current && cursorInnerRef.current) {
      // Scale both cursor elements on hover
      const currentTransform = cursorRef.current.style.transform;
      if (!currentTransform.includes('scale')) {
        cursorRef.current.style.transform += ' scale(1.3)';
        cursorInnerRef.current.style.transform += ' scale(0.8)';
      }
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current && cursorInnerRef.current) {
      // Remove scale from both elements
      cursorRef.current.style.transform = cursorRef.current.style.transform.replace(' scale(1.3)', '');
      cursorInnerRef.current.style.transform = cursorInnerRef.current.style.transform.replace(' scale(0.8)', '');
    }
  }, []);

  useEffect(() => {
    // More aggressive throttling for better performance on complex pages
    let isThrottled = false;
    let lastTime = 0;
    
    const throttledMoveCursor = (e: MouseEvent) => {
      const now = performance.now();
      if (!isThrottled && (now - lastTime) > 16) { // ~60fps throttling
        moveCursor(e);
        lastTime = now;
        isThrottled = true;
        requestRef.current = requestAnimationFrame(() => {
          isThrottled = false;
        });
      }
    };

    document.addEventListener("mousemove", throttledMoveCursor);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", throttledMoveCursor);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [moveCursor, handleMouseEnter, handleMouseLeave]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed pointer-events-none z-[9999] will-change-transform w-5 h-5 rounded-full transition-all duration-150 ease-out"
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6)", // Blue to purple gradient like home page
          position: "fixed",
          left: "-10px",
          top: "-10px",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "normal", // Changed from difference for better visibility in light mode
          willChange: "transform",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)", // Subtle glow effect
        }}
      />
      
      {/* Cursor follower ring */}
      <div
        ref={cursorInnerRef}
        className="custom-cursor-inner fixed pointer-events-none z-[9998] will-change-transform w-10 h-10 rounded-full border-2"
        style={{
          borderColor: "rgba(59, 130, 246, 0.4)", // Blue color matching the gradient
          position: "fixed",
          left: "-20px",
          top: "-20px",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          backgroundColor: "rgba(59, 130, 246, 0.05)", // Very subtle background
          transition: "transform 0.15s ease-out", // Smooth trailing effect
        }}
      />
    </>
  );
};

export default CustomCursor;
