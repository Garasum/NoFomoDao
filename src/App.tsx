import {useEffect, useState} from 'react';
import React from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import {coin, highVoltage, rocket, tasks, trophy, bitcoin, background} from './images';
import {Frens} from './utils/Frens';
import {Earn} from './utils/Earn';
import {Boosts} from './utils/Boosts';
import {LinkWallet} from './utils/LinkWallet';
import UserDataService from './utils/userService.ts';

const App: React.FC = () => {
    console.log('App component rendered'); // Log every time the component renders
    const [userId] = useState('kKya8irumCT0ReUQWutZ'); // Default user ID
    const [userData, setUserData] = useState(null);
    const [points, setPoints] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
    const pointsToAdd = 12;
    const energyToReduce = 12;
    let tapCount = 0;
    const [activeOverlay, setActiveOverlay] = useState(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(() => {
        async function fetchData() {
            const data = await UserDataService.getUser(userId);

            // calculate energy
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const restoredEnergy = await calculateRestoredEnergy(data.energy , data.lastEnergyUpdate)

            if (data) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUserData(data);
                setPoints(data.points);
                setEnergy(restoredEnergy); // Assuming data has an energy field
            }
        }



        fetchData();
    }, []); // The effect will run when userId changes

    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await UserDataService.getUser(userId);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const restoredEnergy = await calculateRestoredEnergy(data.energy , data.lastEnergyUpdate)
            if (data) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUserData(data);
                setPoints(data.points);
                setEnergy(restoredEnergy); // Assuming data has an energy field
            }
        }, 3500); // Restore 10 energy points every second
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);


    const handleButtonClick = (overlay: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setActiveOverlay(overlay);
    };

    const closeOverlay = () => {
        setActiveOverlay(null);
    };

    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (energy - energyToReduce < 0) {
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (energy > 0) {
            tapCount++;
            setPoints(points + pointsToAdd);
            setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
            setClicks([...clicks, {id: Date.now(), x, y}]);

            await UserDataService.updateUser(userId, {
                energy: energy - (energyToReduce * tapCount),
                points: points + (pointsToAdd * tapCount),
                lastEnergyUpdate: new Date().getTime(),
            });
            
        }
    };

    const handleAnimationEnd = (id: number) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    // useEffect hook to restore energy over time
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    //     }, 100); // Restore 10 energy points every second
    //
    //     return () => clearInterval(interval); // Clear interval on component unmount
    // }, []);


    const calculateRestoredEnergy = async (currentEnergy: number, lastEnergyUpdate: number)=> {
        const maxEnergy = 6500;
        const fullRechargeTime = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        const energyPerMillisecond = maxEnergy / fullRechargeTime;

        const now = Date.now();
        const lastUpdateTime = new Date(lastEnergyUpdate).getTime();
        const timeElapsed = now - lastUpdateTime;

        // Calculate the energy to restore based on time elapsed
        const energyRestored = timeElapsed * energyPerMillisecond;

        // Calculate the new energy, ensuring it does not exceed the maximum
        const newEnergy = Math.min(currentEnergy + energyRestored, maxEnergy);

        return Math.floor(newEnergy);
    }

    return (
        <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
            <div
                className="bg-gradient-main"
                style={{backgroundImage: `url(${background})`}} // Dynamically set background image
            ></div>

            <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="radial-gradient-overlay"></div>
            </div>

            <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
                <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
                    <div className="w-full cursor-pointer">
                        <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
                            <button className="text-lg" onClick={() => handleButtonClick('LinkWallet')}>
                  <span>
                        Link Your Wallet
                        <Arrow size={18} className="ml-0 mb-1 inline-block"/>
                    </span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-12 text-5xl font-bold flex items-center">
                        <img src={coin} width={44} height={44}/>
                        <span className="ml-2">{points.toLocaleString()}</span>
                    </div>
                    <div className="text-base mt-2 flex items-center">
                        <img src={trophy} width={24} height={24}/>
                        <span className="ml-1">
              Gold <Arrow size={18} className="ml-0 mb-1 inline-block"/>
            </span>
                    </div>
                </div>
                {activeOverlay === 'LinkWallet' && <LinkWallet closeOverlay={closeOverlay}/>}
                {activeOverlay && (
                    <div className="overlay-background" onClick={closeOverlay}></div>
                )}

                <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
                    <div className="w-full flex justify-between gap-2">
                        <div className="w-1/3 flex items-center justify-start max-w-32">
                            <div className="flex items-center justify-center">
                                <img src={highVoltage} width={44} height={44} alt="High Voltage"/>
                                <div className="ml-2 text-left">
                                    <span className="text-white text-2xl font-bold block">{energy}</span>
                                    <span className="text-white text-large opacity-75">/ 6500</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow flex items-center max-w-60 text-sm">
                            <div className="w-full bg-[#f3c45a] py-4 rounded-2xl flex justify-around">
                                <button className="flex flex-col items-center gap-1"
                                        onClick={() => handleButtonClick('Frens')}>
                                    <img src={tasks} width={24} height={24} alt="Frens"/>
                                    <span>Tasks</span>
                                </button>
                                <div className="h-[48px] w-[2px] bg-[#f3c45a]"></div>
                                <button className="flex flex-col items-center gap-1"
                                        onClick={() => handleButtonClick('Earn')}>
                                    <img src={coin} width={24} height={24} alt="Earn"/>
                                    <span>Earn</span>
                                </button>
                                <div className="h-[48px] w-[2px] bg-[#f3c45a]"></div>
                                <button className="flex flex-col items-center gap-1"
                                        onClick={() => handleButtonClick('Boosts')}>
                                    <img src={rocket} width={24} height={24} alt="Boosts"/>
                                    <span>Airdrop</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-[#f9c035] rounded-full mt-4">
                        <div
                            className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
                            style={{width: `${(energy / 6500) * 100}%`}}
                        ></div>
                    </div>
                </div>

                <div className="flex-grow flex items-center justify-center">
                    <div className="relative mt-4" onClick={handleClick}>
                        <img src={bitcoin} width={256} height={256} alt="notcoin"/>
                        {clicks.map((click) => (
                            <div
                                key={click.id}
                                className="absolute text-5xl font-bold opacity-0"
                                style={{
                                    top: `${click.y - 42}px`,
                                    left: `${click.x - 28}px`,
                                    animation: `float 1s ease-out`
                                }}
                                onAnimationEnd={() => handleAnimationEnd(click.id)}
                            >
                                12
                            </div>
                        ))}
                    </div>
                </div>

                {activeOverlay === 'Frens' && <Frens closeOverlay={closeOverlay}/>}
                {activeOverlay === 'Earn' && <Earn closeOverlay={closeOverlay}/>}
                {activeOverlay === 'Boosts' && <Boosts closeOverlay={closeOverlay}/>}

                {activeOverlay && (
                    <div className="overlay-background" onClick={closeOverlay}></div>
                )}
            </div>
        </div>
    );
};


export default App;
