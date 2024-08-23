'use client';

import { motion } from 'framer-motion';

export default function HeroSolutionSection() {
    return (
        <section className="w-full my-64">
            <div className="flex flex-col items-center justify-center">
                <motion.h1
                    className="text-4xl font-bold text-default-foreground z-10 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Solution - Introduction X404
                </motion.h1>
                <motion.p
                    className="text-base text-default-500 w-full max-w-screen-sm break-words text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Introducing the solution X404 for
                </motion.p>
            </div>
        </section>
    )
}