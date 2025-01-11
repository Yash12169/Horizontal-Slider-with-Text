"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import './Slider.css'
const wordList:string[] = [
    "Now ,", "lets", "Explore", "the", "future", "of", "electric", "scooters", "with",
    "cutting-edge", "technology", "and", "sustainable", "innovation",
];


const Slider = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(latest => {
            const wordCount = Math.min(Math.floor(latest * 30), 15); // Max 15 words
            const newWords = wordList.slice(0, wordCount);
            setWords(newWords);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    const width = useTransform(scrollYProgress, [0, 0.5], ["0px", "100%"]);
    const translateY = useTransform(scrollYProgress, [0.5, 1], ["0%", "-100vh"]);
    const sliderTextStyle:React.CSSProperties = {
        fontSize: '3.5em',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        width: '1200px',
        color: '',
        mixBlendMode: 'difference',
        fontWeight: 700
    };
    return (
        <section
            ref={targetRef}
            className="relative h-[200vh] carda"
            style={{ background: "white" }}
        >
            <motion.div
                style={{ y: translateY }}
                className="sticky top-0 h-screen carda rounded-3xl flex flex-col justify-center overflow-hidden ml-[10px] mr-[10px]"
            >
                <div style={sliderTextStyle} className=' fixed montserrat-thick top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-in  p-4 rounded z-10 slider-text'>
                    {words.join(" ")}
                </div>
                <div className="h-[120vh] absolute inset-x-0 top-1/2 transform -translate-y-1/2" style={{ background: "white" }}>
                    <motion.div
                        style={{ width }}
                        className="h-[900px] overflow-hidden rounded-lg origin-left absolute top-1/2 left-0 transform -translate-y-1/2"
                    >
                        <Card />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

const Card = () => {
    return (
        <div className="relative h-full w-full bg-black text-[#FFF] rounded-3xl">
            <div
                style={{
                    backgroundImage: `url(/home/yash/Desktop/animations/src/img2.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "left center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            ></div>
        </div>
    );
};

export default Slider;