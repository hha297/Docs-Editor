'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { type Level } from '@tiptap/extension-heading';
import {
        Bold,
        ChevronDown,
        DeleteIcon,
        Italic,
        ListTodoIcon,
        LucideIcon,
        MessageSquarePlusIcon,
        PrinterIcon,
        Redo2Icon,
        RemoveFormattingIcon,
        SpellCheckIcon,
        Strikethrough,
        Underline,
        Undo2Icon,
} from 'lucide-react';
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
                        { label: 'Undo', icon: Undo2Icon, onClick: () => editor?.chain().focus().undo().run() },
                        { label: 'Redo', icon: Redo2Icon, onClick: () => editor?.chain().focus().redo().run() },
                        { label: 'Clear', icon: DeleteIcon, onClick: () => editor?.chain().focus().clearNodes().run() },
                        { label: 'Print', icon: PrinterIcon, onClick: () => window.print() },
                        {
                                label: 'Spell Check',
                                icon: SpellCheckIcon,
                                onClick: () => {
                                        const current = editor?.view.dom.getAttribute('spellcheck');
                                        editor?.view.dom.setAttribute(
                                                'spellcheck',
                                                current === 'true' ? 'false' : 'true',
                                        );
                                },
                        },
                ],
                [
                        {
                                label: 'Bold',
                                icon: Bold,
                                onClick: () => editor?.chain().focus().toggleBold().run(),
                                isActive: editor?.isActive('bold'),
                        },
                        {
                                label: 'Italic',
                                icon: Italic,
                                onClick: () => editor?.chain().focus().toggleItalic().run(),
                                isActive: editor?.isActive('italic'),
                        },

                        {
                                label: 'Underline',
                                icon: Underline,
                                onClick: () => editor?.chain().focus().toggleUnderline().run(),
                                isActive: editor?.isActive('underline'),
                        },
                        {
                                label: 'Strikethrough',
                                icon: Strikethrough,
                                onClick: () => editor?.chain().focus().toggleStrike().run(),
                                isActive: editor?.isActive('strike'),
                        },
                ],

                [
                        { label: 'Comment', icon: MessageSquarePlusIcon, onClick: () => {}, isActive: false },
                        {
                                label: 'Todolist',
                                icon: ListTodoIcon,
                                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                                isActive: editor?.isActive('taskList'),
                        },
                        {
                                label: 'Remove Formatting',
                                icon: RemoveFormattingIcon,
                                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                        },
                ],
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
                        <Separator orientation="vertical" className="mx-2" />
                        <FontFamilyButton />
                        <Separator orientation="vertical" className="mx-2" />
                        <HeadingLevelButton />
                        <Separator orientation="vertical" className="mx-2" />
                        {/* TODO: Font Size */}
                        {sections[1].map((item) => (
                                <ToolbarButton
                                        key={item.label}
                                        icon={item.icon}
                                        isActive={item.isActive}
                                        onClick={item.onClick}
                                />
                        ))}
                        {/* TODO: Text Color */}
                        {/* TODO: Highlight Color */}
                        <Separator orientation="vertical" className="mx-2" />
                        {/* TODO: Link, Image */}
                        {/* TODO: Align */}
                        {/* TODO: Line Height */}
                        {/* TODO: List */}
                        {sections[2].map((item) => (
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

const FontFamilyButton = () => {
        const { editor } = useEditorStore((state) => state);
        const fontFamilies = [
                { label: 'Arial', value: 'Arial' },
                { label: 'Times New Roman', value: 'Times New Roman' },
                { label: 'Courier New', value: 'Courier New' },
                { label: 'Helvetica', value: 'Helvetica' },
                { label: 'Georgia', value: 'Georgia' },
                { label: 'Verdana', value: 'Verdana' },
                { label: 'Tahoma', value: 'Tahoma' },
                { label: 'Trebuchet MS', value: 'Trebuchet MS' },
                { label: 'Impact', value: 'Impact' },
                { label: 'Comic Sans MS', value: 'Comic Sans MS' },
                { label: 'Lucida Console', value: 'Lucida Console' },
                { label: 'Arial Black', value: 'Arial Black' },
                { label: 'Palatino Linotype', value: 'Palatino Linotype' },
                { label: 'Book Antiqua', value: 'Book Antiqua' },
                { label: 'Arial Narrow', value: 'Arial Narrow' },
                { label: 'Garamond', value: 'Garamond' },
                { label: 'Century Gothic', value: 'Century Gothic' },
                { label: 'Frank Ruhl Libre', value: 'Frank Ruhl Libre' },
                { label: 'Open Sans', value: 'Open Sans' },
                { label: 'Roboto', value: 'Roboto' },
        ];
        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 w-32 shrink-0 flex items-center justify-between rounded-sm bg-white hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <span className="truncate">
                                                {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
                                        </span>
                                        <ChevronDown className="ml-2 size-4 shrink-0" />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                                {fontFamilies.map(({ label, value }) => (
                                        <button
                                                key={label}
                                                className={cn(
                                                        'flex items-center gap-x-2 rounded-sm  hover:bg-neutral-200/80 px-2 py-1',
                                                        editor?.getAttributes('textStyle').fontFamily === value &&
                                                                'bg-neutral-200/80',
                                                )}
                                                style={{ fontFamily: value }}
                                                onClick={() => {
                                                        editor?.chain().focus().setFontFamily(value).run();
                                                }}
                                        >
                                                <span className="text-sm truncate">{label}</span>
                                        </button>
                                ))}
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};

const HeadingLevelButton = () => {
        const editor = useEditorStore((state) => state.editor);
        const headingLevels = [
                { label: 'Normal', value: 0, fontSize: '16px' },
                { label: 'Heading 1', value: 1, fontSize: '32px' },
                { label: 'Heading 2', value: 2, fontSize: '28px' },
                { label: 'Heading 3', value: 3, fontSize: '24px' },
                { label: 'Heading 4', value: 4, fontSize: '20px' },
                { label: 'Heading 5', value: 5, fontSize: '18px' },
        ];

        const getCurrentHeadingLevel = () => {
                for (let level = 1; level <= 5; level++) {
                        if (editor?.isActive('heading', { level })) {
                                return `Heading ${level}`;
                        }
                }
                return 'Normal';
        };

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm bg-white hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <span className="truncate">{getCurrentHeadingLevel()}</span>
                                        <ChevronDown className="ml-2 size-4 shrink-0" />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                                {headingLevels.map(({ label, value, fontSize }) => (
                                        <button
                                                key={label}
                                                className={cn(
                                                        'flex items-center gap-x-2 rounded-sm  hover:bg-neutral-200/80 px-2 py-1',
                                                        (value === 0 && !editor?.isActive('heading')) ||
                                                                (editor?.isActive('heading', { level: value }) &&
                                                                        'bg-neutral-200/80'),
                                                )}
                                                style={{ fontSize }}
                                                onClick={() => {
                                                        if (value === 0) {
                                                                editor?.chain().focus().setParagraph().run();
                                                        } else {
                                                                editor?.chain()
                                                                        .focus()
                                                                        .toggleHeading({ level: value as Level })
                                                                        .run();
                                                        }
                                                }}
                                        >
                                                {label}
                                        </button>
                                ))}
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};
