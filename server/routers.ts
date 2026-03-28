import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { insertWaitlistEntry, insertNewsletterEntry, getWaitlistEntries, getNewsletterEntries } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  waitlist: router({
    submit: publicProcedure
      .input(z.object({
        parentName: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        childAge: z.string().optional(),
        concerns: z.string().optional(),
        source: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await insertWaitlistEntry({
          parentName: input.parentName,
          email: input.email,
          phone: input.phone || null,
          childAge: input.childAge || null,
          concerns: input.concerns || null,
          source: input.source || "website",
        });
        // Notify owner of new signup
        await notifyOwner({
          title: "New Waitlist Signup",
          content: `${input.parentName} (${input.email}) joined the waitlist.${input.childAge ? ` Child age: ${input.childAge}` : ""}`,
        }).catch(() => {});
        return { success: true };
      }),
    list: publicProcedure.query(async () => {
      return getWaitlistEntries();
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Valid email is required"),
      }))
      .mutation(async ({ input }) => {
        await insertNewsletterEntry({ email: input.email });
        return { success: true };
      }),
    list: publicProcedure.query(async () => {
      return getNewsletterEntries();
    }),
  }),
});

export type AppRouter = typeof appRouter;
