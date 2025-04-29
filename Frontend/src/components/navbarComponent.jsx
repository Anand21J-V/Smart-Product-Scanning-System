/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Navbar() {
    const [userName, setUserName] = useState("Shrey")    
    const [menuOpen, setMenuOpen] = useState(false);
    
    return <>
        <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-4 bg-transparent">
            {/* Logo */}
            <img src="/blackLogo.png" alt="Logo" className="h-8 sm:h-10" />

            {/* Mobile Menu Button */}
            <button
                className="sm:hidden block ml-auto"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? (
                    <XMarkIcon className="h-6 w-6 text-black" />
                ) : (
                    <Bars3Icon className="h-6 w-6 text-black" />
                )}
            </button>

            {/* Desktop Menu */}
            <div className="hidden sm:flex ml-auto w-[18vw] min-w-[240px] items-center gap-2 px-2 py-2 rounded-[50px] bg-white shadow">
                <img
                    src="/bat_duck.png"
                    alt="profile"
                    className="w-10 h-10 rounded-full border border-black object-cover"
                />
                <p className="text-gray-700 font-medium font-[Helvetica World] truncate">{userName}</p>
                <div className="w-10 h-10 rounded-full bg-[#dadada] flex items-center justify-center ml-auto">
                    <img src="/Bell_pin_light.png" alt="Notifications" className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#dadada] flex items-center justify-center">
                    <img src="/setting_line_light.png" alt="Settings" className="w-5 h-5" />
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-[70px] right-4 w-[90vw] sm:hidden bg-white rounded-xl shadow p-4 flex flex-col gap-4 z-50">
                    <div className="flex items-center gap-3">
                        <img
                            src="/bat_duck.png"
                            alt="profile"
                            className="w-10 h-10 rounded-full border border-black object-cover"
                        />
                        <p className="text-gray-700 font-medium font-[Helvetica World]">{userName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#dadada] flex items-center justify-center">
                            <img src="/Bell_pin_light.png" alt="Notifications" className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#dadada] flex items-center justify-center">
                            <img src="/setting_line_light.png" alt="Settings" className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            )}
        </nav>

    </>
}

export default Navbar;