import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';

export const get = query({
        args: { paginationOpts: paginationOptsValidator },
        handler: async (ctx, args) => {
                return await ctx.db.query('documents').paginate(args.paginationOpts);
                // do something with `tasks`
        },
});

export const create = mutation({
        args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
        handler: async (ctx, args) => {
                const user = await ctx.auth.getUserIdentity();
                if (!user) {
                        throw new Error('User not authenticated');
                }

                const { title, initialContent } = args;
                return await ctx.db.insert('documents', {
                        title: title || 'Untitled Document',
                        ownerId: user.subject,
                        initialContent: initialContent || '',
                });
        },
});
