import React from 'react';
import { Editor } from './editor';
import { Toolbar } from './toolbar';
import { Navbar } from './navbar';

const DocumentIdPage = () => {
        return (
                <div className="min-h-screen bg-[#FAFBFD]">
                        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 bg-[#FAFBFD] z-10 shadow-sm print:hidden">
                                <Navbar />
                                <Toolbar />
                        </div>
                        <div className="pt-[120px] print:pt-0">
                                <Editor />
                        </div>
                </div>
        );
};

export default DocumentIdPage;
