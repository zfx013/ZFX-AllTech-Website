"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type CursorVariant = "default" | "hover" | "click" | "text" | "hidden";

interface CursorState {
  variant: CursorVariant;
  text?: string;
  color?: string;
}

interface CursorContextValue {
  cursor: CursorState;
  setCursor: (state: CursorState) => void;
  setVariant: (variant: CursorVariant) => void;
  setText: (text: string, color?: string) => void;
  reset: () => void;
  onHover: () => void;
  onLeave: () => void;
}

const DEFAULT_CURSOR: CursorState = { variant: "default" };

const CursorContext = createContext<CursorContextValue | null>(null);

interface CursorProviderProps {
  children: ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursor, setCursorState] = useState<CursorState>(DEFAULT_CURSOR);

  const setCursor = useCallback((state: CursorState) => {
    setCursorState(state);
  }, []);

  const setVariant = useCallback((variant: CursorVariant) => {
    setCursorState((prev) => ({ ...prev, variant }));
  }, []);

  const setText = useCallback((text: string, color?: string) => {
    setCursorState({ variant: "text", text, color });
  }, []);

  const reset = useCallback(() => {
    setCursorState(DEFAULT_CURSOR);
  }, []);

  const onHover = useCallback(() => {
    setCursorState((prev) => ({ ...prev, variant: "hover" }));
  }, []);

  const onLeave = useCallback(() => {
    setCursorState(DEFAULT_CURSOR);
  }, []);

  const value = useMemo<CursorContextValue>(
    () => ({
      cursor,
      setCursor,
      setVariant,
      setText,
      reset,
      onHover,
      onLeave,
    }),
    [cursor, setCursor, setVariant, setText, reset, onHover, onLeave]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor(): CursorContextValue {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
