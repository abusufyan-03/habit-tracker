import type { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    disabled?: boolean;
}

export function Button ({children, disabled}: ButtonProps) {
    return(
        <>
        <button disabled={disabled} className="bg-zinc-200 hover:bg-zinc-400 text-zinc-900 px-2 py-1 rounded-lg font-semibold cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled">{children}</button>
        </>
    )
}