import {NextPage} from "next";

interface HeroProps {
    backgroundImg?: any;
    title?: string;
    content?: string;
}

export const Hero: NextPage<HeroProps> = ({ backgroundImg, title, content }) => {
    return (
        <div
            className="hero rounded-xl shadow-xl transition hover:-translate-y-2 duration-300 cursor-pointer select-none"
            style={{ backgroundImage: backgroundImg === undefined ? `url("https://placeimg.com/1000/800/arch")` : backgroundImg }}
        >
            <div className="hero-overlay bg-opacity-60 rounded-xl shadow-lg"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{ title }</h1>
                    <p className="mb-5">{ content }</p>
                    <p className="mb-5">자세한 내용은 클릭하세요.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;