'use client';
import { useQuery } from 'convex/react';
import { Navbar } from './navbar';
import { TemplateGallery } from './template-gallery';
import { api } from '../../../convex/_generated/api';

export default function Home() {
        const documents = useQuery(api.documents.get);
        return (
                <div className="min-h-screen flex flex-col">
                        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
                                <Navbar />
                        </div>
                        <div className="flex-1 mt-16">
                                <TemplateGallery />
                                {documents?.map((doc) => (
                                        <div key={doc._id} className="p-4">
                                                <h2 className="text-lg font-medium">{doc.title}</h2>
                                        </div>
                                ))}
                        </div>
                </div>
        );
}
