interface FullscreenLoaderProps {
        label?: string;
        className?: string;
}

import { Loader2Icon } from 'lucide-react';
import React from 'react';

export const FullscreenLoader = ({ label, className }: FullscreenLoaderProps) => {
        return (
                <div className="min-h-screen flex flex-col items-center justify-center gap-2">
                        <Loader2Icon className="animate-spin size-6 text-muted-foreground" />
                        {label && <p className={`text-muted-foreground text-sm ${className}`}>{label}</p>}
                </div>
        );
};
