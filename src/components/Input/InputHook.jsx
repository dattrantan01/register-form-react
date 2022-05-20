import React from 'react';
import { useController } from "react-hook-form";
const InputHook = ({control, ...props}) => {
    const { field } = useController({
        control: control,
        name: props.name,
        defaultValue: "",
    })
    return (
        <input 
            className="p-4 rounded-md border border-purple-500 outline-none" 
            {...field}
            {...props}
            
        />
    );
};

export default InputHook;