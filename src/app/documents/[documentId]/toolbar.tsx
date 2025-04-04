'use client';

import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { Bold, Italic, LucideIcon, Strikethrough, Underline, Undo2Icon } from 'lucide-react';
import React from 'react';

interface ToolbarButtonProps {
        icon: LucideIcon;
        isActive?: boolean;
        onClick?: () => void;
}
const ToolbarButton = ({ icon: Icon, isActive, onClick }: ToolbarButtonProps) => {
        return (
                <button
                        className={cn(
                                'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
                                isActive && 'bg-neutral-200/80',
                        )}
                >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} onClick={onClick} />
                </button>
        );
};
export const Toolbar = () => {
        const { editor } = useEditorStore((state) => state);
        const sections: { label: string; icon: LucideIcon; onClick: () => void; isActive?: boolean }[][] = [
                [
                        {
                                label: 'Bold',
                                icon: Bold,
                                onClick: () => editor?.chain().focus().toggleBold().run(),
                                isActive: editor?.isActive('bold'),
                        },
                        { label: 'Italic', icon: Italic, onClick: () => {} },
                        { label: 'Underline', icon: Underline, onClick: () => {} },
                        { label: 'Strikethrough', icon: Strikethrough, onClick: () => {} },
                        { label: 'Undo', icon: Undo2Icon, onClick: () => editor?.chain().focus().undo().run() },
                        { label: 'Redo', icon: Undo2Icon, onClick: () => editor?.chain().focus().redo().run() },
                ],
                // [
                //         { label: 'H1', icon: 'Heading1', onClick: () => {} },
                //         { label: 'H2', icon: 'Heading2', onClick: () => {} },
                //         { label: 'H3', icon: 'Heading3', onClick: () => {} },
                // ],
                // [
                //         { label: 'Bullet List', icon: 'ListBullet', onClick: () => {} },
                //         { label: 'Numbered List', icon: 'ListOrdered', onClick: () => {} },
                // ],
                // [
                //         { label: 'Link', icon: 'Link2', onClick: () => {} },
                //         { label: 'Image', icon: 'ImageIcon', onClick: () => {} },
                // ],
        ];
        return (
                <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
                        {sections[0].map((item) => (
                                <ToolbarButton
                                        key={item.label}
                                        icon={item.icon}
                                        isActive={item.isActive}
                                        onClick={item.onClick}
                                />
                        ))}
                </div>
        );
};
