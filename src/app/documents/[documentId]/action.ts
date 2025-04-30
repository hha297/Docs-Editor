'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { Id } from '../../../../convex/_generated/dataModel';
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<'documents'>[]) {
        return await convex.query(api.documents.getByIds, { documentIds: ids });
}
export async function getUsers() {
        const { sessionClaims } = await auth();
        const clerk = await clerkClient();
        const sessionClaimsOrgId = (sessionClaims?.o as { id?: string })?.id;

        const response = await clerk.users.getUserList({
                organizationId: [sessionClaimsOrgId as string],
        });

        const users = response.data.map((user) => ({
                id: user.id,
                name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',

                avatar: user.imageUrl,
        }));

        return users;
}
