"use client";

import { useEffect, useState } from "react";

export default function DateTime() {
    const [currentDateTime, setCurrentDateTime] = useState<string>("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(
                now.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    if (!currentDateTime) return null;

    return <span>{currentDateTime}</span>;
}
