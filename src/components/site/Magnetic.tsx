import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

/** Magnetic hover: the element drifts toward the cursor and springs back. */
export function Magnetic({
  children,
  className,
  strength = 0.4,
  style,
  as = "button",
  href,
  onClick,
  disabled,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] as typeof motion.button;

  return (
    <Comp
      // @ts-expect-error polymorphic ref
      ref={ref}
      href={href}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </Comp>
  );
}
