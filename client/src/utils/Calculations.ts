export const calculateTimeRemaining = (deadlineString: Date) => {
    const now = new Date();

    const deadline = new Date(deadlineString);

    const timeDiff = deadline.getTime() - now.getTime();

    if (timeDiff <= 0) {
        return "Overdue";
    }

    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return `${daysRemaining}D ${hoursRemaining}H`;
};
