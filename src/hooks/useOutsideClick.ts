import { useEffect } from 'react';

const useOutsideClick = (
    menuRef: React.RefObject<HTMLDivElement | null>,
    buttonRef: React.RefObject<HTMLButtonElement | null>,
    setIsOpen: (isOpen: boolean) => void
) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current && !menuRef.current.contains(e.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => window.removeEventListener("click", handleClickOutside);
    }, [menuRef, buttonRef, setIsOpen]);
};

export default useOutsideClick;
