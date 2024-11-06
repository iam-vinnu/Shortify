import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from '@/context';
import { Button } from './button';
import { Input } from './input';
import Error from '../error';
import { Card } from './card';
import * as yup from 'yup';
import { QRCode } from 'react-qrcode-logo';
import useFetch from '@/hooks/use-fetch';
import { createUrl, updateUrl } from '@/db/apiUrls';
import { BeatLoader } from 'react-spinners';

const UpdateLink = () => {

    const { user } = UrlState();
    const ref = useRef();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');


   const [errors , setErrors] = useState({});
   const [formValues , setFormValues] = useState({
      title : '',
      longUrl: longLink ? longLink : '',
      customUrl:'',
   })

   const schema = yup.object().shape({
    title : yup.string().required('Title is required'),
    longUrl : yup.string().url('Must be a valid URL').required('Long URL is required'),
    customUrl : yup.string(),
   })

   const handleChange = (e) =>{
    setFormValues({
        ...formValues,
        [e.target.id] : e.target.value
    });
   };
   
   const{ loading , error , data , fn:fnCreateUrl } = useFetch(updateUrl ,{...formValues , user_id: user.id} );

   useEffect(()=>{
      if(error === null && data){
        navigate(`/link/${data[0].id}`);
      }
   },[error , data])


  const updateLink = async() =>{
       setErrors([]);
       try {
        await schema.validate(formValues , {abortEarly: false});
        const canvas = ref.current.canvasRef.current;
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
        await fnCreateUrl(blob);
       } catch (error) {
        const newErrors = {};

        error?.inner?.forEach((err) => {
            newErrors[err.path] = err.message;
        });

        setErrors(newErrors)
       }
  }



    return (
        <div>
            <Dialog defaultOpen={longLink}
            onOpenChange={(res)=>{if(!res) setSearchParams({})}} >
                <DialogTrigger><Button variant="destructive">Create New Link</Button></DialogTrigger>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-bold'>Create New</DialogTitle>
                    </DialogHeader>

                  {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={200} ref={ref}/>}

                    <Input id='title' placeholder='Short Link Title'
                    value={formValues.title} 
                    onChange={handleChange}/>
                    {errors.title && <Error message={'some error '} />}

                    <Input id='longUrl' placeholder='Enter your loooong  URL'
                    value={formValues.longUrl} 
                    onChange={handleChange} />
                    {errors.longUrl && <Error message={errors.longUrl} />}

                    <div className='flex items-center gap-2'>
                        <Card className='p-2'>shotify.netlify.app</Card> /
                        <Input id='customUrl' placeholder='Custom URL(optional)'
                        value={formValues.customUrl} 
                        onChange={handleChange} />
                    </div>
                    {error && <Error message={error.message} />}

                    <DialogFooter className='sm:justify-start'>
                            <Button 
                            disabled={loading}
                            onClick={updateLink}
                             variant='destructive'>
                                {loading ? <BeatLoader size={10} color='white'/> : 'Update'}
                            </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateLink