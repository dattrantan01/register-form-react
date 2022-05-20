import React from 'react';
import { useForm } from "react-hook-form";
import InputHook from '../Input/InputHook';
import RadioHook from '../Radio/RadioHook';
import CheckboxHook from '../Checkbox/CheckboxHook';
import DropdownHook from '../Dropdown/DropdownHook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required("Please enter your Username"),
    email: yup.string().email().required("Please enter your Email"),
    password: yup
        .string()
        .required("Please enter your password")
        .min(8, "atleast 8 characters please")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
            message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
        }),
        gender: yup.string().required("Please select your gender")
            .oneOf(["male", "female"], "Please select your gender"), // oneOf để chỉ cho giá trị trả về trong mảng
        term: yup.boolean().required("Please accept the term").oneOf([true], "Pleas accept the term"),
        job: yup.string().required("Select your job please").oneOf(["frontend","backend", "fullstack"], "Please select your job")
  })
  .required();

const RegisterHook = () => {
    const { register, handleSubmit, control, formState, setValue, reset } = useForm({
        defaultValue: {
            term: "",
            gender: ""
        },
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const onSubmit = (values) => {
        console.log(formState.errors)
        if(formState.isValid === false) {
            console.log("not valid");
            return;
        }
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               resolve();
               console.log(values);
               reset({
                username: "",
                password: "",
                email: "",
                gender: "",
                job: "",
                term: false
               });
           }, 3000)
        })

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] mx-auto my-10">
            <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="username" className="cursor-pointer">Username</label>
                <InputHook
                    type="text" 
                    placeholder="Please enter your username" 
                    id="username"
                    control= {control}
                    name="username"
                >
                </InputHook>
                {formState.errors.username && <div className="text-sm text-red-600">{formState.errors.username.message}</div>}
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="password" className="cursor-pointer">Password</label>
                <InputHook
                    type="password" 
                    placeholder="Please enter your password" 
                    id="password"
                    control= {control}
                    name="password"
                >
                </InputHook>
                {formState.errors.password && <div className="text-sm text-red-600">{formState.errors.password.message}</div>}
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label htmlFor="email" className="cursor-pointer">Email</label>
                <InputHook
                    type="email" 
                    placeholder="Please enter your email" 
                    id="email"
                    control= {control}
                    name="email"
                >
                </InputHook>
                {formState.errors.email && <div className="text-sm text-red-500">{formState.errors.email.message}</div>}
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="cursor-pointer">Gender</label>
                <div className="flex items-center gap-x-5 ml-[3px]">

                    <div className="flex items-center gap-x-3">
                        <RadioHook
                            control= {control}
                            name="gender"
                            value="male"
                        >

                        </RadioHook>
                        <span>Male</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <RadioHook
                            control= {control}
                            name="gender"
                            value="female"

                        ></RadioHook>
                        <span>Female</span>
                    </div>
                </div>
                {formState.errors.gender && <div className="text-sm text-red-600">{formState.errors.gender.message}</div>}
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className="cursor-pointer">Are you</label>
                <DropdownHook control={control}  name="job" setValue={setValue} dropdownValue="Select your job"></DropdownHook>
                {formState.errors.job && <div className="text-sm text-red-600">{formState.errors.job.message}</div>}
            </div>
            <div className="flex flex-col gap-2">
                <CheckboxHook control={control} text="I accept the terms and conditions" name="term"></CheckboxHook>
                {formState.errors.term && <div className="text-sm text-red-600">{formState.errors.term.message}</div>}
            </div>
     
            <button type="submit" className={`border border-purple-500 w-full p-3 bg-purple-400 rounded-lg mt-5 text-purple-50`}
                disabled={formState.isSubmitting}
            >
                {formState.isSubmitting ? <div className="w-5 h-5 border-white border-4 border-t-transparent rounded-full animate-spin mx-auto"></div> : "Submit"}
            </button>
        </form>
    );
};

export default RegisterHook;