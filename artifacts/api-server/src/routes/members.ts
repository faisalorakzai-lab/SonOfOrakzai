import { Router, type IRouter } from "express";
import { eq, ilike, or } from "drizzle-orm";
import { db, membersTable } from "@workspace/db";
import {
  CreateMemberBody,
  UpdateMemberBody,
  UpdateMemberParams,
  GetMemberParams,
  ListMembersQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/members", async (req, res): Promise<void> => {
  const query = ListMembersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let members = db.select().from(membersTable).orderBy(membersTable.createdAt);

  const rows = await members;

  let filtered = rows;
  if (query.data.status) {
    filtered = filtered.filter((m) => m.status === query.data.status);
  }
  if (query.data.search) {
    const s = query.data.search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(s) ||
        m.email.toLowerCase().includes(s) ||
        m.location.toLowerCase().includes(s) ||
        m.profession.toLowerCase().includes(s)
    );
  }

  res.json(
    filtered.map((m) => ({
      id: m.id,
      name: m.name,
      fatherName: m.fatherName,
      cnic: m.cnic,
      phone: m.phone,
      email: m.email,
      location: m.location,
      profession: m.profession,
      skills: m.skills,
      interest: m.interest,
      message: m.message,
      status: m.status,
      createdAt: m.createdAt.toISOString(),
    }))
  );
});

router.post("/members", async (req, res): Promise<void> => {
  const parsed = CreateMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [member] = await db
    .insert(membersTable)
    .values({
      name: parsed.data.name,
      fatherName: parsed.data.fatherName,
      cnic: parsed.data.cnic,
      phone: parsed.data.phone,
      email: parsed.data.email,
      location: parsed.data.location,
      profession: parsed.data.profession,
      skills: parsed.data.skills,
      interest: parsed.data.interest,
      message: parsed.data.message ?? null,
      status: "pending",
    })
    .returning();

  res.status(201).json({
    id: member.id,
    name: member.name,
    fatherName: member.fatherName,
    cnic: member.cnic,
    phone: member.phone,
    email: member.email,
    location: member.location,
    profession: member.profession,
    skills: member.skills,
    interest: member.interest,
    message: member.message,
    status: member.status,
    createdAt: member.createdAt.toISOString(),
  });
});

router.get("/members/stats/overview", async (req, res): Promise<void> => {
  const all = await db.select().from(membersTable);
  const total = all.length;
  const approved = all.filter((m) => m.status === "approved").length;
  const pending = all.filter((m) => m.status === "pending").length;
  const rejected = all.filter((m) => m.status === "rejected").length;

  res.json({ total, approved, pending, rejected });
});

router.get("/members/:id", async (req, res): Promise<void> => {
  const params = GetMemberParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [member] = await db
    .select()
    .from(membersTable)
    .where(eq(membersTable.id, params.data.id));

  if (!member) {
    res.status(404).json({ error: "Member not found" });
    return;
  }

  res.json({
    id: member.id,
    name: member.name,
    fatherName: member.fatherName,
    cnic: member.cnic,
    phone: member.phone,
    email: member.email,
    location: member.location,
    profession: member.profession,
    skills: member.skills,
    interest: member.interest,
    message: member.message,
    status: member.status,
    createdAt: member.createdAt.toISOString(),
  });
});

router.patch("/members/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = UpdateMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Partial<typeof membersTable.$inferInsert> = {};
  if (parsed.data.status !== undefined) updateData.status = parsed.data.status;
  if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
  if (parsed.data.profession !== undefined) updateData.profession = parsed.data.profession;

  const [member] = await db
    .update(membersTable)
    .set(updateData)
    .where(eq(membersTable.id, id))
    .returning();

  if (!member) {
    res.status(404).json({ error: "Member not found" });
    return;
  }

  res.json({
    id: member.id,
    name: member.name,
    fatherName: member.fatherName,
    cnic: member.cnic,
    phone: member.phone,
    email: member.email,
    location: member.location,
    profession: member.profession,
    skills: member.skills,
    interest: member.interest,
    message: member.message,
    status: member.status,
    createdAt: member.createdAt.toISOString(),
  });
});

export default router;
