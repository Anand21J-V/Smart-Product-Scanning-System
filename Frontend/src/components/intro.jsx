import SallyButton from "./utils/sallyButton";
import { useNavigate } from "react-router-dom";

// inside your component

export default function IntroComponent() {
    const navigate = useNavigate();

    return (
        <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory bg-black pb-16">
            <div className="relative top-[96vh] left-[45vw] mt-12 animate-fade-in animate-delay-500">
                <SallyButton variant="outline" size="md" className="hover-zoom" onClick={() => navigate("/chat")}>
                    GET STARTED →
                </SallyButton>
            </div>
            <div className="space-y-36">

            <div className="h-screen w-screen snap-start">
                <img src="/intro/firstIntro.png" alt="" className="w-full h-full object-fit" />
            </div>
            <div className="h-screen w-screen snap-start">
                <img src="/intro/secondIntro.png" alt="" className="w-full h-full object-fit" />
            </div>
            <div className="h-screen w-screen snap-start">
                <img src="/intro/thirdIntro.png" alt="" className="w-full h-full object-fit" />
            </div>
            <div className="h-screen w-screen snap-start">
                <img src="/intro/fourthIntro.png" alt="" className="w-full h-full object-fit" />
            </div>
            <div className="h-screen w-screen snap-start">
                <img src="/intro/fifthIntro.png" alt="" className="w-full h-full object-fit" />
            </div>
            </div>
        </div>

    );
}
