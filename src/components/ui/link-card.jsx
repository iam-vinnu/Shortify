import React from 'react'
import { Link } from 'react-router-dom'

const Linkcard = ({url , fetchUrls}) => {
  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
        <img src={url?.qr} className='h-32 object-contain ring ring-blue-500 self-start' alt="" />
        <Link to={`/link/${url?.id}`} className='flex flex-col'>
          <span>{url?.title}</span>
          <span>https://shortify.in/{url?.custom_url ? url?.custom_url : url.short_url}</span>
          <span>{url?.original_url}</span>
          <span>{new Date(url?.created_at).toLocaleString()}</span>
        </Link>
    </div>
  )
}

export default Linkcard