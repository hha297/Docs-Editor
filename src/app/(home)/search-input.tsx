'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParam } from '@/hooks/use-search-param';
import { SearchIcon, XIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';

export const SearchInput = () => {
        const [value, setValue] = useState('');
        const inputRef = useRef<HTMLInputElement>(null);
        const [search, setSearch] = useSearchParam('search');
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
        };

        const handleClear = () => {
                setValue('');
                setSearch('');
                inputRef.current?.blur();
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                setSearch(value);
                inputRef.current?.blur();
        };
        return (
                <div className="flex-1 flex items-center justify-center">
                        <form className="relative w-full max-w-3xl" onSubmit={handleSubmit}>
                                <Input
                                        placeholder="Search"
                                        onChange={handleChange}
                                        ref={inputRef}
                                        value={value}
                                        className="md:text-base placeholder:text-neutral-500 px-12 w-full border-none focus-visible:border-none focus-visible:shadow-[0_1px_1px_0_rgba(65, 69, 73,.3),0_1px_3px_1px_rgba(65, 69, 73,.15)] rounded-full bg-[#F0F4F8] h-12 focus-visible:ring-0 focus:bg-white"
                                />
                                <Button
                                        type="submit"
                                        variant="ghost"
                                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-[#F0F4F8] focus-visible:ring-0 focus-visible:bg-[#F0F4F8]"
                                >
                                        <SearchIcon />
                                </Button>
                                {value && (
                                        <Button
                                                type="button"
                                                variant="ghost"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-[#F0F4F8] focus-visible:ring-0 focus-visible:bg-[#F0F4F8]"
                                                onClick={handleClear}
                                        >
                                                <XIcon className="w-4 h-4" />
                                        </Button>
                                )}
                        </form>
                </div>
        );
};
