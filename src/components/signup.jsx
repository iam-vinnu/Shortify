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
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch'
import { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/context'




const Signup = () => {
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    email: '',
    name:'',
    password: '',
    profile_pic: null 
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longlink = searchParams.get('createNew')

  const handleInputChange = (e) => {
    const { name, value , files } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }))
  };


  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longlink ? `creatNew=${longlink}` : ""}`);
      fetchUser();
    }

  }, [ error , loading]);

  const handleSignup = async () => {
    setErrors([])
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid Email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 charcaters').required('Password is required'),
        profile_pic: Yup.mixed().required('Profile picture is required')
      })
      await schema.validate(formData, { abortEarly: false });

      await fnSignup();

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
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
      <div className='space-y-1'>
          <label htmlFor="">Name</label>
          <Input name="name" type="text" placeholder="Enter Full Name" onChange={handleInputChange} />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className='space-y-1'>
          <label htmlFor="">Email</label>
          <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange} />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className='space-y-1'>
          <label htmlFor="">Password</label>
          <Input name="password" type="password" placeholder="Enter Password" onChange={handleInputChange} />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className='space-y-1'>
          <label htmlFor="">Profile Pic</label>
          <Input name="profile_pic" type="file" accept='image/*' onChange={handleInputChange} />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color='#36d7b7' /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Signup