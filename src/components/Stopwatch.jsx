import React, { useState, useRef } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    // Start the stopwatch
    const start = () => {
        if (!running) {
            setRunning(true);
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
    };

    // Pause the stopwatch
    const pause = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
    };

    // Reset the stopwatch
    const reset = () => {
        clearInterval(intervalRef.current);
        setTime(0);
        setLaps([]);
        setRunning(false);
    };

    // Record a lap
    const recordLap = () => {
        if (running) {
            setLaps([...laps, time]);
        }
    };

    // Format time as mm:ss:ms
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}:
            ${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen 
                bg-gradient-to-r from-blue-500 via-indigo-400 to-gray-300
                text-white px-4 sm:px-6 lg:px-8">

            <div className="bg-white bg-opacity-10 p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl
                      backdrop-filter backdrop-blur-lg max-w-lg md:max-w-2xl lg:max-w-3xl">

                {/* Stopwatch Display */}
                <div className="text-5xl sm:text-6xl md:text-7xl font-mono mb-8 text-center">
                    {formatTime(time)}
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-2 sm:space-x-4 mb-8">
                    {!running ? (
                        <button
                            onClick={start}
                            className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500 bg-opacity-80 hover:bg-opacity-100
                         text-white font-semibold rounded-full shadow-lg
                         transform hover:scale-105 transition duration-300"
                        >
                            Start
                        </button>
                    ) : (
                        <button
                            onClick={pause}
                            className="px-4 py-2 sm:px-6 sm:py-3 bg-yellow-500 bg-opacity-80 hover:bg-opacity-100
                         text-white font-semibold rounded-full shadow-lg
                         transform hover:scale-105 transition duration-300"
                        >
                            Pause
                        </button>
                    )}

                    <button
                        onClick={reset}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-red-500 bg-opacity-80 hover:bg-opacity-100
                       text-white font-semibold rounded-full shadow-lg
                       transform hover:scale-105 transition duration-300"
                    >
                        Reset
                    </button>

                    <button
                        onClick={recordLap}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 bg-opacity-80 hover:bg-opacity-100
                       text-white font-semibold rounded-full shadow-lg
                       transform hover:scale-105 transition duration-300"
                    >
                        Lap
                    </button>
                </div>

                {/* Laps List */}
                {laps.length > 0 && (
                    <div className="max-h-40 sm:max-h-48 md:max-h-60 overflow-y-auto scrollbar p-2">
                        <h3 className="text-lg sm:text-2xl font-semibold mb-4">Laps</h3>
                        <ul className="list-none space-y-2 pr-3"> {/* Added right padding */}
                            {laps.map((lap, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between bg-white bg-opacity-20 p-2 rounded-lg 
                                    shadow-sm text-sm sm:text-base"
                                >
                                    <span>Lap {index + 1}</span>
                                    <span>{formatTime(lap)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Stopwatch;
