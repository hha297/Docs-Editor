'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { useEditorStore } from '@/store/use-editor-store';
import { FontSize } from '@/extensions/font-size';
import { LineHeight } from '@/extensions/line-height';
import { Ruler } from './ruler';
import { Threads } from './threads';
import { useStorage } from '@liveblocks/react';

interface EditorProps {
        initialContent?: string | undefined;
}
export const Editor = ({ initialContent }: EditorProps) => {
        const liveblocks = useLiveblocksExtension({ initialContent, offlineSupport_experimental: true });
        const { setEditor } = useEditorStore((state) => state);

        const leftMargin = useStorage((root) => root.leftMargin);
        const rightMargin = useStorage((root) => root.rightMargin);

        const editor = useEditor({
                immediatelyRender: false,
                onCreate: ({ editor }) => {
                        setEditor(editor);
                },
                onDestroy: () => {
                        setEditor(null);
                },
                onUpdate: ({ editor }) => {
                        setEditor(editor);
                },
                onSelectionUpdate: ({ editor }) => {
                        setEditor(editor);
                },
                onTransaction: ({ editor }) => {
                        setEditor(editor);
                },
                onFocus: ({ editor }) => {
                        setEditor(editor);
                },
                onBlur: ({ editor }) => {
                        setEditor(editor);
                },
                onContentError: ({ editor }) => {
                        setEditor(editor);
                },

                editorProps: {
                        attributes: {
                                style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px;`,
                                class: 'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1000px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
                        },
                },
                extensions: [
                        FontSize,
                        LineHeight.configure({
                                types: ['paragraph', 'heading'],
                                defaultLineHeight: 'normal',
                        }),
                        StarterKit.configure({
                                // The Liveblocks extension comes with its own history handling
                                history: false,
                        }),
                        TaskList,
                        TaskItem.configure({ nested: true }),
                        Table.configure({
                                resizable: true,
                        }),
                        TableRow,
                        TableHeader,
                        TableCell,
                        Image,
                        ImageResize,
                        Underline,
                        TextStyle,
                        FontFamily,
                        Highlight.configure({
                                multicolor: true,
                        }),
                        Color.configure({
                                types: ['textStyle'],
                        }),
                        Link.configure({
                                openOnClick: true,
                                autolink: true,

                                defaultProtocol: 'https',
                                protocols: ['http', 'https'],
                                isAllowedUri: (url, ctx) => {
                                        try {
                                                // construct URL
                                                const parsedUrl = url.includes(':')
                                                        ? new URL(url)
                                                        : new URL(`${ctx.defaultProtocol}://${url}`);

                                                // use default validation
                                                if (!ctx.defaultValidate(parsedUrl.href)) {
                                                        return false;
                                                }

                                                // disallowed protocols
                                                const disallowedProtocols = ['ftp', 'file', 'mailto'];
                                                const protocol = parsedUrl.protocol.replace(':', '');

                                                if (disallowedProtocols.includes(protocol)) {
                                                        return false;
                                                }

                                                // only allow protocols specified in ctx.protocols
                                                const allowedProtocols = ctx.protocols.map((p) =>
                                                        typeof p === 'string' ? p : p.scheme,
                                                );

                                                if (!allowedProtocols.includes(protocol)) {
                                                        return false;
                                                }

                                                // disallowed domains
                                                const disallowedDomains = [
                                                        'example-phishing.com',
                                                        'malicious-site.net',
                                                ];
                                                const domain = parsedUrl.hostname;

                                                if (disallowedDomains.includes(domain)) {
                                                        return false;
                                                }

                                                // all checks have passed
                                                return true;
                                        } catch {
                                                return false;
                                        }
                                },
                                shouldAutoLink: (url) => {
                                        try {
                                                // construct URL
                                                const parsedUrl = url.includes(':')
                                                        ? new URL(url)
                                                        : new URL(`https://${url}`);

                                                // only auto-link if the domain is not in the disallowed list
                                                const disallowedDomains = [
                                                        'example-no-autolink.com',
                                                        'another-no-autolink.com',
                                                ];
                                                const domain = parsedUrl.hostname;

                                                return !disallowedDomains.includes(domain);
                                        } catch {
                                                return false;
                                        }
                                },
                        }),
                        TextAlign.configure({
                                types: ['heading', 'paragraph'],
                        }),
                        liveblocks,
                ],
                content: ``,
        });

        if (!editor) {
                return null;
        }
        return (
                <div className="size-full overflow-x-auto bg-[F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
                        <Ruler />
                        <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print::min-w-0">
                                <EditorContent editor={editor} />
                                <Threads editor={editor} />
                        </div>
                </div>
        );
};
