import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom';



function LandingPage() {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten =(e)=>{
    e.preventDefault();
    if(longUrl){navigate(`/auth?createNew=${longUrl}`);}
  }


  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 sm:my-16 text-3xl sm:text-5xl lg:text-6xl text-white text-center font-extrabold'>
        The Only URL Shortner <br /> You&rsquo;ll ever need! 👇
      </h2>

      <form onSubmit={handleShorten} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
        <Input type="url" placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4" />
        <Button onClick={handleShorten} className="h-full" type="submit" variant="destructive">Shorten!</Button>
      </form>
      <img src="./banner.jpeg" alt="" className='w-full my-11 md:px-11' />
      <div className='text-2xl mt-7'>FAQ's</div>
      <Accordion type="multiple" collapsible className='sm:w-full md:px-11'>
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the Shortify URL Shortner works?</AccordionTrigger>
          <AccordionContent>
            when you enter a long URL, our system will generate a shorter version of that URL.
            This shortened URL redirects to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>       
        <AccordionItem value="item-2">
          <AccordionTrigger>Do i need account to use the app?</AccordionTrigger>
          <AccordionContent>
            Yes, Creating a account allows you to manage your URLs, view analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How does the Shortify URL Shortner works?</AccordionTrigger>
          <AccordionContent>
            when you enter a long URL, our system will generate a shorter version of that URL.
            This shortened URL redirects to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default LandingPage