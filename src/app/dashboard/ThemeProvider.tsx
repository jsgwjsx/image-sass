"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

type Props = Parameters<typeof NextThemeProvider>[0];

export function ThemeProvider(props: Props) {
    return (
        <NextThemeProvider
            {...props}
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {props.children}
        </NextThemeProvider>
    );
}

