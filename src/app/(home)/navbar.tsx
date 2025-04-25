import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SearchInput } from './search-input';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

export const Navbar = () => {
        return (
                <nav className="flex items-center justify-between h-full w-full ">
                        <div className="flex gap-3 items-center shrink-0 pr-6">
                                <Link href="/" className="flex items-center gap-2">
                                        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                                        <h3 className="text-2xl pl-1 font-medium">Docs</h3>
                                </Link>
                        </div>
                        <SearchInput />
                        <div className="flex items-center gap-4 pl-4">
                                <OrganizationSwitcher
                                        afterCreateOrganizationUrl={'/'}
                                        afterLeaveOrganizationUrl="/"
                                        afterSelectOrganizationUrl={'/'}
                                        afterSelectPersonalUrl={'/'}
                                />

                                <UserButton />
                        </div>
                </nav>
        );
};
