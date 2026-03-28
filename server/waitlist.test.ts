import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  insertWaitlistEntry: vi.fn().mockResolvedValue([{ insertId: 1 }]),
  getWaitlistEntries: vi.fn().mockResolvedValue([
    {
      id: 1,
      parentName: "Test Parent",
      email: "test@example.com",
      phone: "555-1234",
      childAge: "2-4",
      concerns: "Communication",
      source: "website",
      createdAt: new Date(),
    },
  ]),
  insertNewsletterEntry: vi.fn().mockResolvedValue([{ insertId: 1 }]),
  getNewsletterEntries: vi.fn().mockResolvedValue([
    {
      id: 1,
      email: "newsletter@example.com",
      createdAt: new Date(),
    },
  ]),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a waitlist entry with all fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.waitlist.submit({
      parentName: "Jane Doe",
      email: "jane@example.com",
      phone: "555-0123",
      childAge: "4-6",
      concerns: "Social interaction difficulties",
      source: "landing_page",
    });

    expect(result).toEqual({ success: true });
  });

  it("submits a waitlist entry with only required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.waitlist.submit({
      parentName: "John Doe",
      email: "john@example.com",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects waitlist entry with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.waitlist.submit({
        parentName: "Test",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });

  it("rejects waitlist entry with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.waitlist.submit({
        parentName: "",
        email: "test@example.com",
      })
    ).rejects.toThrow();
  });

  it("lists waitlist entries", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const entries = await caller.waitlist.list();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]).toHaveProperty("parentName");
    expect(entries[0]).toHaveProperty("email");
  });
});

describe("newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("subscribes with valid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.subscribe({
      email: "subscriber@example.com",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects subscription with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.newsletter.subscribe({
        email: "bad-email",
      })
    ).rejects.toThrow();
  });

  it("lists newsletter entries", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const entries = await caller.newsletter.list();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]).toHaveProperty("email");
  });
});
