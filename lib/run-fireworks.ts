import confetti from "canvas-confetti";

export const RunFireworks = () => {
    const duration = 5 * 1000; // Constant duration for fireworks animation

    // Calculate animation end time based on duration
    const animationEnd = Date.now() + duration;

    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
    }; // Constant default configuration for confetti particles

    function randomInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 50 * (timeLeft / duration);
        const origin1 = { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }; // Consistent naming
        const origin2 = { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }; // Consistent naming

        confetti({ ...defaults, particleCount, origin: origin1 });
        confetti({ ...defaults, particleCount, origin: origin2 });
    }, 250);
};