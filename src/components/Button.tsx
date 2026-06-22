import type { ComponentProps} from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost-destructive"
type ButtonProps = {
    variant?: Variant
} & ComponentProps<"button">

export function Button ({ variant ="primary", className, ...props}: ButtonProps) {
    return(
        <>
        <button {...props} className={twMerge(
            getVarientStyles(variant),
            "px-2 py-1 rounded-lg cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled",
            className )}/>
        </>
    )
}

function getVarientStyles(variant: Variant) {
    switch (variant) {
        case "primary":
            return "bg-zinc-200 hover:bg-zinc-400 text-zinc-900"
        case "secondary":
            return "bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
        case "ghost-destructive":
            return "text-red-200 hover:text-red-200 hover:bg-red-800 bg-red-700"
        default:
            throw new Error(`Invalid varients: ${variant satisfies never}`);
    }
}