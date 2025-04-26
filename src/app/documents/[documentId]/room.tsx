'use client';

import { ReactNode } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

export function Room({ children }: { children: ReactNode }) {
        const params = useParams();
        return (
                <LiveblocksProvider
                        publicApiKey={'pk_dev_LihSCxHITsqkJApk2z0Uoud-0_AN1Cy3b79uBSsBqeyfvT3yCP9ICXwB5TBNXjpd'}
                >
                        <RoomProvider id={params.documentId as string}>
                                <ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
                        </RoomProvider>
                </LiveblocksProvider>
        );
}
