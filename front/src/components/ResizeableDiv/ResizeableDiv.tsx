import React, { useState, useRef, useEffect, useCallback } from "react";

type ResizableContainerProps = {
  children: React.ReactNode[];
  initialRatios?: number[];
};

const ResizableContainer: React.FC<ResizableContainerProps> = ({
  children,
  initialRatios,
}) => {
  const initialRatio = 100 / children.length;
  const [flexes, setFlexes] = useState<number[]>(
    initialRatios ? initialRatios : new Array(children.length).fill(initialRatio),
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
          (e.clientX - containerRef.current.getBoundingClientRect().left) / totalWidth;

        let remainingFlex = 1 - newWidth; // 전체 flex 값에서 newWidth를 뺀 값
        remainingFlex -= flexes
          .slice(0, draggingDivIndex)
          .reduce((acc, val) => acc + val, 0); // 앞쪽 div들의 flex 값을 뺌

        const updatedFlexes = [...flexes];
        updatedFlexes[draggingDivIndex] = newWidth;
        if (draggingDivIndex + 1 < flexes.length) {
          updatedFlexes[draggingDivIndex + 1] = remainingFlex; // 남은 flex 값을 다음 div에 할당
        }

        setFlexes(updatedFlexes);
      }
    },
    [isDragging, draggingDivIndex, flexes],
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
            flex: flexes[index] || initialRatio,
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
