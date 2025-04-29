'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import { type Level } from '@tiptap/extension-heading';
import {
        AlignCenterIcon,
        AlignJustifyIcon,
        AlignLeftIcon,
        AlignRightIcon,
        Bold,
        ChevronDown,
        DeleteIcon,
        HighlighterIcon,
        ImageIcon,
        Italic,
        LinkIcon,
        ListCollapseIcon,
        ListIcon,
        ListOrderedIcon,
        ListTodoIcon,
        LucideIcon,
        MessageSquarePlusIcon,
        MinusIcon,
        PlusIcon,
        PrinterIcon,
        Redo2Icon,
        RemoveFormattingIcon,
        SearchIcon,
        SpellCheckIcon,
        Strikethrough,
        Underline,
        Undo2Icon,
        UploadIcon,
} from 'lucide-react';
import { useState } from 'react';
import { type ColorResult, CirclePicker, SketchPicker } from 'react-color';

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
        const { editor } = useEditorStore();
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
                        {
                                label: 'Comment',
                                icon: MessageSquarePlusIcon,
                                onClick: () => {
                                        editor?.chain().focus().addPendingComment().run();
                                },
                                isActive: editor?.isActive('liveblocks'),
                        },
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
                        <FontSizeButton />
                        {sections[1].map((item) => (
                                <ToolbarButton
                                        key={item.label}
                                        icon={item.icon}
                                        isActive={item.isActive}
                                        onClick={item.onClick}
                                />
                        ))}
                        <TextColorButton />
                        <TextHighlightButton />
                        <Separator orientation="vertical" className="mx-2" />
                        <LinkButton />
                        <ImageButton />
                        <AlignButton />
                        <LineHeightButton />
                        <ListButton />
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
        const { editor } = useEditorStore();
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
        const { editor } = useEditorStore();
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
                                                                editor
                                                                        ?.chain()
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

const TextColorButton = () => {
        const { editor } = useEditorStore();
        const value = editor?.getAttributes('textStyle').color || '#000000';

        const onChange = (color: ColorResult) => {
                editor?.chain().focus().setColor(color.hex).run();
        };

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <span className="text-sm" style={{ color: value }}>
                                                A
                                        </span>
                                        <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2 ">
                                <CirclePicker color={value} onChange={onChange} />
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};

const TextHighlightButton = () => {
        const { editor } = useEditorStore();
        const value = editor?.getAttributes('highlight').color || '#000000';
        const onChange = (color: ColorResult) => {
                editor?.chain().focus().setHighlight({ color: color.hex }).run();
        };

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <HighlighterIcon className="size-4 mb-1" style={{ color: value }} />

                                        <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2 ">
                                <SketchPicker color={value} onChange={onChange} />
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};

const LinkButton = () => {
        const { editor } = useEditorStore();
        const [value, setValue] = useState('');

        const onChange = (href: string) => {
                editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
                setValue('');
        };

        return (
                <DropdownMenu
                        onOpenChange={(open) => {
                                if (open) {
                                        setValue(editor?.getAttributes('link').href || '');
                                }
                        }}
                >
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <LinkIcon className="size-4 mb-1" style={{ color: value }} />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2 flex items-center gap-x-2">
                                <Input
                                        placeholder="https://example.com"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                />
                                <Button onClick={() => onChange(value)}>Apply</Button>
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};

const ImageButton = () => {
        const { editor } = useEditorStore();
        const [imageUrl, setImageUrl] = useState('');
        const [isDialogOpen, setIsDialogOpen] = useState(false);

        const onChange = (src: string) => {
                editor?.chain().focus().setImage({ src }).run();
                setImageUrl('');
                setIsDialogOpen(false);
        };
        const onUpload = () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                onChange(imageUrl);
                        }
                };
                input.click();
        };

        const handleImageUrlSubmit = () => {
                if (imageUrl) {
                        onChange(imageUrl);
                        setImageUrl('');
                        setIsDialogOpen(false);
                }
        };

        return (
                <>
                        <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                        <button
                                                className={cn(
                                                        'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                                )}
                                        >
                                                <ImageIcon className="size-4" />
                                        </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                        <DropdownMenuItem onClick={onUpload}>
                                                <UploadIcon className="size-4" />
                                                Upload Image
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                                                <SearchIcon className="size-4" />
                                                Paste Image URL
                                        </DropdownMenuItem>
                                </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogContent>
                                        <DialogHeader>
                                                <DialogTitle>Paste Image URL</DialogTitle>
                                        </DialogHeader>
                                        <Input
                                                placeholder="https://example.com/image.png"
                                                value={imageUrl}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                                onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                                handleImageUrlSubmit();
                                                        }
                                                }}
                                        />
                                </DialogContent>
                        </Dialog>
                </>
        );
};

const AlignButton = () => {
        const { editor } = useEditorStore();

        const alignments = [
                { label: 'Align Left', value: 'left', icon: AlignLeftIcon },
                { label: 'Align Center', value: 'center', icon: AlignCenterIcon },
                { label: 'Align Right', value: 'right', icon: AlignRightIcon },
                { label: 'Align Justify', value: 'justify', icon: AlignJustifyIcon },
        ];

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <AlignLeftIcon className="size-4 mb-1" />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                                {alignments.map(({ label, value, icon: Icon }) => (
                                        <button
                                                key={value}
                                                onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                                                className={cn(
                                                        'flex items-center gap-x-2 rounded-sm  hover:bg-neutral-200/80 px-2 py-2',
                                                        editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80',
                                                )}
                                        >
                                                <Icon className="size-4" />
                                                <span className="text-sm">{label}</span>
                                        </button>
                                ))}
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};

const ListButton = () => {
        const { editor } = useEditorStore();

        const lists = [
                {
                        label: 'Bullet List',
                        icon: ListIcon,
                        isActive: () => editor?.isActive('bulletList'),
                        onClick: () => editor?.chain().focus().toggleBulletList().run(),
                },
                {
                        label: 'Ordered List',
                        icon: ListOrderedIcon,
                        isActive: () => editor?.isActive('orderedList'),
                        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
                },
                {
                        label: 'Task List',
                        icon: ListTodoIcon,
                        isActive: () => editor?.isActive('taskList'),
                        onClick: () => editor?.chain().focus().toggleTaskList().run(),
                },
        ];

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <ListIcon className="size-4 mb-1" />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                                {lists.map(({ label, onClick, isActive, icon: Icon }) => (
                                        <button
                                                key={label}
                                                onClick={onClick}
                                                className={cn(
                                                        'flex items-center gap-x-2 rounded-sm  hover:bg-neutral-200/80 px-2 py-2',
                                                        isActive() && 'bg-neutral-200/80',
                                                )}
                                        >
                                                <Icon className="size-4" />
                                                <span className="text-sm">{label}</span>
                                        </button>
                                ))}
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};

const FontSizeButton = () => {
        const { editor } = useEditorStore();
        const currentFontSize = editor?.getAttributes('textStyle').fontSize
                ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
                : '16';

        const [fontSize, setFontSize] = useState(currentFontSize);
        const [inputValue, setInputValue] = useState(fontSize);
        const [isEditing, setIsEditing] = useState(false);
        const updateFontSize = (newSize: string) => {
                const size = parseInt(newSize);
                if (!isNaN(size) && size > 0) {
                        editor?.chain().focus().setFontSize(`${size}px`).run();
                        setFontSize(newSize);
                        setInputValue(newSize);
                        setIsEditing(false);
                }
        };
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
        };

        const handleInputBlur = () => {
                updateFontSize(inputValue);
        };

        const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                        e.preventDefault();
                        updateFontSize(inputValue);
                        editor?.commands.focus();
                }
        };
        const increment = () => {
                const newSize = parseInt(fontSize) + 1;
                updateFontSize(newSize.toString());
        };

        const decrement = () => {
                const newSize = parseInt(fontSize) - 1;
                if (newSize > 0) {
                        updateFontSize(newSize.toString());
                }
        };

        return (
                <div className="flex items-center gap-x-1">
                        <button
                                className={cn(
                                        'h-7 w-7 shrink-0 flex items-center justify-center rounded-sm  hover:bg-neutral-200/80',
                                )}
                                onClick={decrement}
                        >
                                <MinusIcon className="size-4" />
                        </button>
                        {isEditing ? (
                                <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        onKeyDown={handleInputKeyDown}
                                        className={cn(
                                                'h-7 w-10 shrink-0 border text-center border-neutral-400 rounded-sm bg-transparent text-sm focus:outline-none focus:ring-0',
                                        )}
                                />
                        ) : (
                                <button
                                        onClick={() => {
                                                setIsEditing(true);
                                                setFontSize(currentFontSize);
                                        }}
                                        className={cn(
                                                'h-7 w-10 shrink-0 border text-center border-neutral-400 rounded-sm bg-transparent text-sm hover:bg-neutral-200/80',
                                        )}
                                >
                                        {currentFontSize}
                                </button>
                        )}
                        <button
                                className={cn(
                                        'h-7 w-7 shrink-0 flex items-center justify-center rounded-sm  hover:bg-neutral-200/80',
                                )}
                                onClick={increment}
                        >
                                <PlusIcon className="size-4" />
                        </button>
                </div>
        );
};

const LineHeightButton = () => {
        const { editor } = useEditorStore();

        const lineHeights = [
                { label: 'Default', value: 'normal' },
                { label: 'Single', value: '1' },
                { label: '1.5', value: '1.5' },
                { label: 'Double', value: '2' },
        ];

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <button
                                        className={cn(
                                                'h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm  hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm',
                                        )}
                                >
                                        <ListCollapseIcon className="size-4 mb-1" />
                                </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                                {lineHeights.map(({ label, value }) => (
                                        <button
                                                key={value}
                                                onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                                                className={cn(
                                                        'flex items-center gap-x-2 rounded-sm  hover:bg-neutral-200/80 px-2 py-2',
                                                        editor?.getAttributes('paragraph').lineHeight === value &&
                                                                'bg-neutral-200/80',
                                                )}
                                        >
                                                <span className="text-sm">{label}</span>
                                        </button>
                                ))}
                        </DropdownMenuContent>
                </DropdownMenu>
        );
};
