import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom = "button") {
    const [show, setShow] = useState(false);
    const nodeRef = useRef();
    
   
    useEffect(() => {
        const handleClickOutDropDown = (e) => {
            if(nodeRef.current && !nodeRef.current.contains(e.target) && !e.target.matches(dom)) {
                setShow(false);
            }
        }
        document.addEventListener('click', handleClickOutDropDown);
        return () => {
            document.removeEventListener('click', handleClickOutDropDown);
        }
    }, []);
    return {
        show,
        nodeRef,
        setShow
    };
}