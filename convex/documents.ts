import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';

export const get = query({
        args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
        handler: async (ctx, { paginationOpts, search }) => {
                const user = await ctx.auth.getUserIdentity();
                if (!user) {
                        throw new Error('Unauthenticated user');
                }

                const organizationId = (user.organization_id ?? undefined) as string | undefined;
                //Search within the documents of the organization
                if (search && organizationId) {
                        return await ctx.db
                                .query('documents')
                                .withSearchIndex('search_title', (q) =>
                                        q.search('title', search).eq('organizationId', organizationId),
                                )
                                .paginate(paginationOpts);
                }
                //Search within the documents of the user
                if (search) {
                        return await ctx.db
                                .query('documents')
                                .withSearchIndex('search_title', (q) =>
                                        q.search('title', search).eq('ownerId', user.subject),
                                )
                                .paginate(paginationOpts);
                }
                //Get all documents of the organization
                if (organizationId) {
                        return await ctx.db
                                .query('documents')
                                .withIndex('by_organization_id', (q) => q.eq('organizationId', organizationId))
                                .paginate(paginationOpts);
                }
                //Get all documents of the user
                return await ctx.db
                        .query('documents')
                        .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
                        .paginate(paginationOpts);
        },
});

export const create = mutation({
        args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
        handler: async (ctx, args) => {
                const user = await ctx.auth.getUserIdentity();
                if (!user) {
                        throw new Error('Unauthenticated user');
                }

                const organizationId = (user.organization_id ?? undefined) as string | undefined;

                const { title, initialContent } = args;
                return await ctx.db.insert('documents', {
                        title: title || 'Untitled Document',
                        ownerId: user.subject,
                        organizationId,
                        initialContent: initialContent || '',
                });
        },
});

export const deleteById = mutation({
        args: { documentId: v.id('documents') },
        handler: async (ctx, args) => {
                const user = await ctx.auth.getUserIdentity();
                if (!user) {
                        throw new Error('Unauthenticated user');
                }
                const organizationId = (user.organization_id ?? undefined) as string | undefined;
                const document = await ctx.db.get(args.documentId);
                if (!document) {
                        throw new Error('Document not found');
                }
                const isOwner = document.ownerId === user.subject;
                const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);

                if (!isOwner && !isOrganizationMember) {
                        throw new Error('User is not the owner of the document');
                }
                return await ctx.db.delete(args.documentId);
        },
});

export const updateById = mutation({
        args: { documentId: v.id('documents'), title: v.string() },
        handler: async (ctx, args) => {
                const user = await ctx.auth.getUserIdentity();
                if (!user) {
                        throw new Error('Unauthenticated user');
                }
                const organizationId = (user.organization_id ?? undefined) as string | undefined;
                const document = await ctx.db.get(args.documentId);
                if (!document) {
                        throw new Error('Document not found');
                }
                const isOwner = document.ownerId === user.subject;
                const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId);

                if (!isOwner && !isOrganizationMember) {
                        throw new Error('User is not the owner of the document');
                }

                return await ctx.db.patch(args.documentId, {
                        title: args.title,
                });
        },
});

export const getById = query({
        args: { documentId: v.id('documents') },
        handler: async (ctx, args) => {
                return await ctx.db.get(args.documentId);
        },
});
