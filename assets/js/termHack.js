import { useEffect, useState } from "react";

export default function TerminalName() {
  const text = "Yusuf Salie";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="terminal">
      Hi, I'm{" "}
      <span className="glitch" data-text={displayed}>
        {displayed}
        <span className="cursor">|</span>
      </span>
    </h2>
  );
}