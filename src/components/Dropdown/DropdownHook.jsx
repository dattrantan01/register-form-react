import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import useClickOutSide from '../../hooks/useClickOutSide';

const DropdownHook = ({control, setValue, name, dropdownValue}) => {

    const [label, setLabel] = useState(dropdownValue)
    const {setShow, show, nodeRef} = useClickOutSide();
    const jobValue = useWatch({
        control,
        name: "job",
        defaultValue: ""
    })
    const handleClickJobValue = (e) => {
        setValue(name, e.target.dataset.value);
        setShow(false);
        setLabel(e.target.textContent);
    }
    return (
        <div className="relative" ref={nodeRef}>
            <div className="p-4 rounded-lg border border-purple-400 bg-white flex items-center justify-between cursor-pointer"
                onClick={() => {setShow(!show)}}
            >
                <span>{label}</span>
            </div>
            <div className={`absolute top-full left-0 w-full rounded-lg bg-white ${show ? "" : "invisible opacity-0"}`}>
                <div className="p-5 cursor-pointer hover:bg-purple-200" onClick={handleClickJobValue} data-value="frontend">Frontend Developer</div>
                <div className="p-5 cursor-pointer hover:bg-purple-200" onClick={handleClickJobValue} data-value="backend">Backend Developer</div>
                <div className="p-5 cursor-pointer hover:bg-purple-200" onClick={handleClickJobValue} data-value="fullstack">Fullstack Developer</div>
            </div>
        </div>
    );
};

export default DropdownHook;