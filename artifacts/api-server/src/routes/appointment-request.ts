import {
  Router,
  type IRouter,
  type Request,
  type Response,
} from "express";
import { db, appointmentRequestsTable } from "@workspace/db";

const router: IRouter = Router();

type Body = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  doctor?: unknown;
  preferredDate?: unknown;
  time?: unknown;
};

function str(v: unknown, max: number): string {
  return String(v ?? "").trim().slice(0, max);
}

function strOrNull(v: unknown, max: number): string | null {
  const s = str(v, max);
  return s.length > 0 ? s : null;
}

router.post(
  "/appointment-request",
  async (req: Request, res: Response) => {
    try {
      const body = (req.body ?? {}) as Body;

      const firstName = str(body.firstName, 100);
      const lastName = str(body.lastName, 100);
      const phone = str(body.phone, 50);
      const email = strOrNull(body.email, 200);
      const message = strOrNull(body.message, 1000);
      const doctor = strOrNull(body.doctor, 200);
      const time = strOrNull(body.time, 50);
      const preferredDate = strOrNull(body.preferredDate, 200);

      if (!firstName || !lastName || !phone) {
        return res
          .status(400)
          .json({ error: "First name, last name and phone are required." });
      }

      const fullName = `${firstName} ${lastName}`.trim();
      const dateLabel =
        preferredDate && time
          ? `${preferredDate} at ${time}`
          : preferredDate ?? null;

      const inserted = await db
        .insert(appointmentRequestsTable)
        .values({
          name: fullName,
          phone,
          email,
          preferredDate: dateLabel,
          treatment: doctor ? `With ${doctor}` : null,
          notes: message,
          transcript: {
            source: "contact-form",
            doctor,
            preferredDate,
            time,
            message,
          },
        })
        .returning({ id: appointmentRequestsTable.id });

      return res.json({ ok: true, id: inserted[0]?.id ?? null });
    } catch (e) {
      req.log.error({ err: e }, "appointment-request failed");
      const detail = e instanceof Error ? e.message : String(e);
      return res
        .status(500)
        .json({ error: "Could not save appointment request", detail });
    }
  },
);

export default router;
