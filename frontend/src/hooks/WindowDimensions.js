import {useState, useEffect, useCallback} from 'react';
/**
 * Hook which allows use to register for changes in window dimensions, allowing us to responsively change
 * the card grid for mobile. This code is assisted by users on stackoverflow.
 * https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
 */
export default function useWindowDimensions() {
    // May be possible that the medium of consumption is not a window but rather a text reader
    // or something of the sort
    const hasWindow = typeof window !== 'undefined';
    const getWindowDimensions = useCallback(() => {
        if (hasWindow) {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            };
        } else {
            return {
                width: null,
                height: null
            };
        }
    }, [hasWindow]);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(()=> {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions);
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow, getWindowDimensions])
    return windowDimensions;
}