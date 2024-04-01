import { useState, useEffect } from "react";

/**
 * Manage a cooldown timer that persists accross page reloads
 * @param initialCooldown
 */
const useCooldownTimer = (
  initialCooldown: number
): {
  isCooldown: boolean;
  cooldownTime: number;
  startCooldown: () => void;
} => {
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    const storedCooldownEnd = localStorage.getItem("cooldownEnd");
    if (storedCooldownEnd) {
      const now = new Date().getTime();
      const cooldownEnd = parseInt(storedCooldownEnd, 10);
      const remainingCooldown = cooldownEnd - now;

      if (remainingCooldown > 0) {
        setIsCooldown(true);
        setCooldownTime(Math.ceil(remainingCooldown / 1000));
      }
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isCooldown && cooldownTime > 0) {
      intervalId = setInterval(() => {
        setCooldownTime((time) => {
          if (time - 1 <= 0) {
            localStorage.removeItem("cooldownEnd");
            setIsCooldown(false);
          }
          return time - 1;
        });
      }, 1000);
    }

    // clear timeout on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isCooldown, cooldownTime]);

  const startCooldown = (): void => {
    const now = new Date().getTime();
    const cooldownEnd = now + initialCooldown * 1000;
    localStorage.setItem("cooldownEnd", cooldownEnd.toString());

    setIsCooldown(true);
    setCooldownTime(initialCooldown);
  };

  return { isCooldown, cooldownTime, startCooldown };
};

export default useCooldownTimer;
