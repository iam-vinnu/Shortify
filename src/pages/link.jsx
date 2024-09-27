import { UrlState } from '@/context';
import { getClickUrl } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { LinkIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

function Link() {
 
  const {id} = useParams();
  const {user} = UrlState();
  const navigate = useNavigate();

  const{ loading, data : url , fn , error} = useFetch(getUrl , {id , user_id : user?.id});
  const{ loading : loadingStats, data : stats , fn : fnStats} = useFetch(getClickUrl , id);
  const{ loading : loadingDelete,  fn : fnDelete} = useFetch(deleteUrl , id);

  useEffect(()=>{
    fn();
    fnStats();
  },[]);

  if(error){
    navigate('/dashboard');
  };

  let link ='';
  if(url){
    link = url?.custom_url ? url?.custom_url : url?.short_url ;
  }

  return (
    <div className='px-6'>
            {
              (loading || loadingStats)&&(<BarLoader className='mb-4' width={'100%'} color='#36d7b7' />)
            }

            <div className='flex flex-col gap-8 sm:flex-row justify-between'>

              <div className='flex flex-col items-start gap-8 rounded-lg sm:w-2/5'>
                <span className='text-6xl font-extrabold hover:underline cursor-pointer'>
                  {url?.title}
                  </span>
                <a href="https://shortify.in/{link}" 
                   target='_blank'
                   className='text-3xl sm:text-4xl text-blue-400 font-bold hover:underline'
                >https://shortify.in/{link}</a>
                <a href="{url?.original_url}" target='_blank'>
                  <LinkIcon className='p-2 text-xl'/>
                  {url?.original_url}</a>
                  <span className='flex items-end font-extralight text-sm'>
                    {new Date(url?.created_at).toLocaleString()}
                    </span>
              </div>     

              <div className='w-3/5'>
               
              </div>


            </div>
    </div>
  )
}

export default Link