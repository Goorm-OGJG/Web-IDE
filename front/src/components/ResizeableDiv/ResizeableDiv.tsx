import React, { useState, useRef, useEffect, useCallback } from "react";

type ResizableContainerProps = {
  children: React.ReactNode[];
};

const ResizableContainer: React.FC<ResizableContainerProps> = ({ children }) => {
  const initialWidth = 100 / children.length;
  const [widths, setWidths] = useState<number[]>(
    new Array(children.length).fill(initialWidth),
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingDivIndex, setDraggingDivIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (index: number): void => {
    setIsDragging(true);
    setDraggingDivIndex(index);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
    setDraggingDivIndex(null);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && containerRef.current !== null && draggingDivIndex !== null) {
        const totalWidth = containerRef.current.getBoundingClientRect().width;
        const newWidth =
          ((e.clientX - containerRef.current.getBoundingClientRect().left) / totalWidth) *
          100;
        const offset = newWidth - widths[draggingDivIndex];

        const updatedWidths = [...widths];
        updatedWidths[draggingDivIndex] = newWidth;
        updatedWidths[draggingDivIndex + 1] -= offset;

        setWidths(updatedWidths);
      }
    },
    [isDragging, draggingDivIndex, widths],
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} style={{ display: "flex", width: "100%" }}>
      {React.Children.map(children, (child, index) => (
        <div
          style={{
            width: `${widths[index] || initialWidth}%`,
            position: "relative",
            minWidth: "200px",
          }}
        >
          {child}
          {index < children.length - 1 && (
            <div
              style={{
                cursor: "ew-resize",
                position: "absolute",
                top: 0,
                right: 0,
                width: "3px",
                height: "100vh",
                backgroundColor: "lightgray",
              }}
              onMouseDown={() => handleMouseDown(index)}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResizableContainer;
