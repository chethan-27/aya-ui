import React from "react";
import { Box, BoxProps } from "@mui/material";
import "./styles.css";

export interface BadgeProps extends BoxProps {
    variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
    return (
        <Box
            className={`badge badge--${variant} ${className}`}
            {...props}
        />
    );
}
