import { useMediaQuery } from 'react-responsive'

export type TUseMediaContext = {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
};
export const useMedia = (): TUseMediaContext => {
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
}
export default useMedia;