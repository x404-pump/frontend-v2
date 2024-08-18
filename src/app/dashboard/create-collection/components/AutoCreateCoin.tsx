'use client';

import { m } from "framer-motion";
import { Button, ButtonProps } from "@nextui-org/button";

interface AutoCreateCoinProps extends ButtonProps { }

export function AutoCreateCoin({ ...props }: AutoCreateCoinProps) {
    return (
        <m.div
            className="rounded-full"
            style={{
                display: "inline-block",
                padding: "2px",
                background: "linear-gradient(270deg, #ffffff, #9353D3, #ffffff)",
                backgroundSize: "600% 600%",
            }}
            animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
            }}
        >
            <m.div
                className="rounded-full"
                style={{
                    background: "linear-gradient(270deg, #ff6ec4, #7873f5, #ff6ec4)",
                    backgroundSize: "600% 600%",
                }}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
                <Button
                    color="secondary"
                    radius="full"
                    size="md"
                    className="bg-transparent"
                    {...props}
                >
                    Auto Create Coin
                </Button>
            </m.div>
        </m.div>
    );
}