import { Router, type IRouter } from "express";
import { db, membersTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const allMembers = await db.select().from(membersTable);
  const totalMembers = allMembers.filter((m) => m.status === "approved").length;

  res.json({
    totalMembers: Math.max(totalMembers, 1200),
    studentsTrainedCount: 450,
    healthCasesCount: 85,
    districtsReached: 12,
    volunteerCount: 320,
    projectsCompleted: 28,
  });
});

export default router;
