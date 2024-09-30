import { Button } from '@/components/ui/button';
import { UrlState } from '@/context';
import { getClickUrl } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { Copy, Download, LinkIcon, Trash } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader, BeatLoader } from 'react-spinners';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Location from '@/components/location-stats';
import Device from '@/components/device-stats';

function Link() {

  const dowmloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  }



  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const { loading, data: url, fn, error } = useFetch(getUrl, { id, user_id: user?.id });
  const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClickUrl, id);
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate('/dashboard');
  };

  let link = '';
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <div className='px-6'>
      {
        (loading || loadingStats) && (<BarLoader className='mb-4' width={'100%'} color='#36d7b7' />)
      }

      <div className='flex flex-col gap-8 sm:flex-row justify-between'>

        <div className='flex flex-col items-start gap-8 rounded-lg sm:w-2/5'>
          <span className='text-6xl font-extrabold hover:underline cursor-pointer'>
            {url?.title}
          </span>
          <a href="https://shortify.in/{link}"
            target='_blank'
            className='text-2xl sm:text-4xl text-blue-400 font-bold hover:underline'
          >https://shortify.in/{link}</a>
          <a href="{url?.original_url}" target='_blank'>
            <LinkIcon className='p-2 text-xl' />
            {url?.original_url}</a>
          <span className='flex items-end font-extralight text-sm'>
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className='flex gap-2'>
            <Button variant="ghost" onClick={() =>
              navigator.clipboard.writeText(`https://shortify.in/${url?.short_url}`)
            }>
              <Copy />
            </Button>
            <Button variant="ghost" onClick={dowmloadImage}>
              <Download />
            </Button>
            <Button variant="ghost" onClick={() => fnDelete()}>
              {loadingDelete ? <BeatLoader size={5} color='white' /> : <Trash />}
            </Button>
          </div>
          <img src={url?.qr}
            alt=""
            className='w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain' />
        </div>

        <div className='sm:w-3/5'>
          <Card className=''>
            <CardHeader>
              <CardTitle className='text-4xl font-extrabold '>Stats</CardTitle>
            </CardHeader>
           {stats && stats?.length ? (
             <CardContent className='flex flex-col gap-8'>
              <Card>
              <CardHeader>
                <CardTitle>Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats?.length}</p>
              </CardContent>
            </Card>
            <CardTitle>Location Data</CardTitle>
            <Location stats={stats}/>
            <CardTitle>Device Info</CardTitle>
            <Device stats={stats}/>
             </CardContent>
              
           ):( <CardContent>
               {loadingStats === false
                  ? "No Statistics yet"
                  : 'loading Statistics.....'
               }
          </CardContent>)
           }
            
          </Card>
        </div>


      </div>
    </div>
  )
}

export default Link