import { useEffect } from 'react';
import "css-paint-polyfill";

export default function CurvedLine() {
  useEffect(() => {
    CSS.paintWorklet.addModule(
      "https://unpkg.com/curved-line@1.0.0/curved-line.js"
    );
  });
  return null;
}