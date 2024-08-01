import { useEffect, useState } from 'react';
import React from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import {coin, highVoltage, rocket, tasks, trophy, bitcoin} from './images';
import { Frens  } from './utils/Frens';
import { Earn } from './utils/Earn';
import { Boosts } from './utils/Boosts';
import { LinkWallet } from './utils/LinkWallet';


const App:  React.FC = () => {
  const [points, setPoints] = useState(29857775);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 12;
  const energyToReduce = 12;
  const [activeOverlay, setActiveOverlay] = useState(null);

  const handleButtonClick = (overlay: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setActiveOverlay(overlay);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
      <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
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
              <img src={coin} width={44} height={44} />
              <span className="ml-2">{points.toLocaleString()}</span>
            </div>
            <div className="text-base mt-2 flex items-center">
              <img src={trophy} width={24} height={24} />
              <span className="ml-1">
              Gold <Arrow size={18} className="ml-0 mb-1 inline-block" />
            </span>
            </div>
          </div>
          {activeOverlay === 'LinkWallet' && <LinkWallet closeOverlay={closeOverlay} />}
          {activeOverlay && (
              <div className="overlay-background" onClick={closeOverlay}></div>
          )}

          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
            <div className="w-full flex justify-between gap-2">
              <div className="w-1/3 flex items-center justify-start max-w-32">
                <div className="flex items-center justify-center">
                  <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                  <div className="ml-2 text-left">
                    <span className="text-white text-2xl font-bold block">{energy}</span>
                    <span className="text-white text-large opacity-75">/ 6500</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex items-center max-w-60 text-sm">
                <div className="w-full bg-[#f3c45a] py-4 rounded-2xl flex justify-around">
                  <button className="flex flex-col items-center gap-1" onClick={() => handleButtonClick('Frens')}>
                    <img src={tasks} width={24} height={24} alt="Frens" />
                    <span>Tasks</span>
                  </button>
                  <div className="h-[48px] w-[2px] bg-[#f3c45a]"></div>
                  <button className="flex flex-col items-center gap-1" onClick={() => handleButtonClick('Earn')}>
                    <img src={coin} width={24} height={24} alt="Earn" />
                    <span>Earn</span>
                  </button>
                  <div className="h-[48px] w-[2px] bg-[#f3c45a]"></div>
                  <button className="flex flex-col items-center gap-1" onClick={() => handleButtonClick('Boosts')}>
                    <img src={rocket} width={24} height={24} alt="Boosts" />
                    <span>Airdrop</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full bg-[#f9c035] rounded-full mt-4">
              <div
                  className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
                  style={{ width: `${(energy / 6500) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center">
            <div className="relative mt-4" onClick={handleClick}>
              <img src={bitcoin} width={256} height={256} alt="notcoin" />
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

          {activeOverlay === 'Frens' && <Frens closeOverlay={closeOverlay} />}
          {activeOverlay === 'Earn' && <Earn closeOverlay={closeOverlay} />}
          {activeOverlay === 'Boosts' && <Boosts closeOverlay={closeOverlay} />}

          {activeOverlay && (
              <div className="overlay-background" onClick={closeOverlay}></div>
          )}
        </div>
      </div>
  );
};


export default App;
