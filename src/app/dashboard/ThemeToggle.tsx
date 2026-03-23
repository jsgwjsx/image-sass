"use client";

import { Button } from "@/components/ui/Button";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    const activeTheme = ready ? resolvedTheme || theme : "light";
    const isDark = activeTheme === "dark";

    return (
        <Button
            onClick={() => {
                setTheme(isDark ? "light" : "dark");
            }}
            variant="ghost"
            aria-label="切换主题"
            className="transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
            {ready ? (isDark ? <Sun /> : <Moon />) : <Sun />}
        </Button>
    );
}

