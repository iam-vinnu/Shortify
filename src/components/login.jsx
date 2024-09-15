import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from './ui/input'
import { BeatLoader } from 'react-spinners'
import { Button } from './ui/button'
import Error from './error'
import  * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'




const Login = () => {
    const [errors , setErrors] = useState([]);

    const [formData , setFormData] = useState({
        email:'',
        password:''
    });

const handleInputChange = (e)=>{
         const {name , value } = e.target
         setFormData((prevState)=>({
            ...prevState,
            [name]:value,
         }))
};

const {data , error , loading , fn:fnLogin} = useFetch(login,formData);

useEffect(() => {
    console.log(data);
    
  }, [data, error]);

const handleLogin =async ()=>{
    setErrors([])
    try {
        
    const schema = Yup.object().shape({
        email:Yup.string().email('Invalid Email').required('Email is required'),
        password:Yup.string().min(6,'Password must be at least 6 charcaters').required('Password is required')
    })
       await schema.validate(formData , {abortEarly: false});
       
       await fnLogin(formData);

    } catch (error) {
        const newErrors = {};

        error?.inner?.forEach((err) => {
            newErrors[err.path] = err.message;
        });

        setErrors(newErrors)
    }
}
    return (

        
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    to your account if you already have one
                </CardDescription>
                {error && <Error message={error.message}/>}
            </CardHeader>
            <CardContent className="space-y-2">
                <div className='space-y-1'>
                    <label htmlFor="">Email</label>
                   <Input  name="email" type="email" placeholder="Enter Email" onChange={handleInputChange}/>
                   {errors.email && <Error message={errors.email}/>}
                </div>
                <div className='space-y-1'>
                    <label htmlFor="">Password</label>
                   <Input  name="password" type="password" placeholder="Enter Password" onChange={handleInputChange} />
                   {errors.password && <Error message={errors.password}/>}
                </div>
            </CardContent>
            <CardFooter>
               <Button onClick={handleLogin}>
                {loading ? <BeatLoader size={10} color='#36d7b7'/> :"Login"}
               </Button>
            </CardFooter>
        </Card>
    )
}

export default Login