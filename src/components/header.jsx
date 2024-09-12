import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';

const Header = () => {

  const navigate = useNavigate();
  const user = true;
  return (
    <div>
      <nav className='py-4 px-8 flex justify-between items-center'>
        <Link to='/'>
          <img src="/logo.png" alt="" className='h-16' />
        </Link>
        <div>
          {!user ?
            <Button onClick={() => navigate('/auth')}>Login</Button>
            : (
              <DropdownMenu>
                <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Binay Behera</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                  <LinkIcon className='mr-2 h-4 w-4'/>
                    My Links</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400 flex items-center">
                    <LogOut className='mr-2 h-4 w-4'/>
                     <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
        </div>
      </nav>
    </div>
  )
}

export default Header