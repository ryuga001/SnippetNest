import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {

    return (
        <nav className='bg-gray-200 flex w-full justify-between p-2'>
            <aside className='flex'>
                <Avatar>
                    <AvatarImage src="https://plus.unsplash.com/premium_photo-1671679269810-63dd9438ca81?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <AvatarFallback>Logo</AvatarFallback>
                </Avatar>
                {/* <Button variant="ghost">Store</Button> */}
                <Button variant="link">Home</Button>
                <Button variant="link">Templates</Button>
            </aside>
            <main>
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </main>
        </nav>
    )
}

export default Navbar