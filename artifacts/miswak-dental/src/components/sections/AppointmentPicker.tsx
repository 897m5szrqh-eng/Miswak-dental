import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Check, Clock, UserRound } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  doctors,
  getBookedSlots,
  getSlotsForDay,
  isDoctorAvailableOn,
  type Doctor,
} from "@/data/doctors";

export type AppointmentSelection = {
  doctor: Doctor;
  date: Date;
  time: string;
};

type Props = {
  selection: AppointmentSelection | null;
  onSelectionChange: (s: AppointmentSelection | null) => void;
};

const STEP_LABELS = ["Doctor", "Date", "Time"] as const;

function formatLongDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export const AppointmentPicker = ({ selection, onSelectionChange }: Props) => {
  const [doctorId, setDoctorId] = useState<string | null>(
    selection?.doctor.id ?? null,
  );
  const [date, setDate] = useState<Date | undefined>(selection?.date);
  const [time, setTime] = useState<string | null>(selection?.time ?? null);

  const doctor = useMemo(
    () => doctors.find((d) => d.id === doctorId) ?? null,
    [doctorId],
  );

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setMonth(d.getMonth() + 2);
    return d;
  }, [today]);

  const slots = useMemo(() => {
    if (!doctor || !date) return [] as string[];
    return getSlotsForDay(date.getDay());
  }, [doctor, date]);

  const booked = useMemo(() => {
    if (!doctor || !date) return new Set<string>();
    return getBookedSlots(doctor.id, date);
  }, [doctor, date]);

  const currentStep = !doctor ? 0 : !date ? 1 : !time ? 2 : 3;

  const pickDoctor = (d: Doctor) => {
    setDoctorId(d.id);
    if (date && !isDoctorAvailableOn(d, date)) {
      setDate(undefined);
      setTime(null);
      onSelectionChange(null);
    } else if (date && time) {
      onSelectionChange({ doctor: d, date, time });
    }
  };

  const pickDate = (d: Date | undefined) => {
    setDate(d);
    setTime(null);
    onSelectionChange(null);
  };

  const pickTime = (t: string) => {
    setTime(t);
    if (doctor && date) {
      onSelectionChange({ doctor, date, time: t });
    }
  };

  const reset = () => {
    setDoctorId(null);
    setDate(undefined);
    setTime(null);
    onSelectionChange(null);
  };

  return (
    <div className="bg-card border border-border rounded-[2rem] p-6 md:p-10 shadow-card">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-accent mb-2">
            Choose Your Visit
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-primary leading-tight">
            Pick a doctor, date & time
          </h2>
        </div>
        {(doctor || date || time) && (
          <button
            type="button"
            onClick={reset}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-smooth"
          >
            Reset
          </button>
        )}
      </div>

      {/* Stepper */}
      <ol className="flex items-center gap-2 mb-8">
        {STEP_LABELS.map((label, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <li key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`h-7 w-7 rounded-full grid place-items-center text-xs font-medium shrink-0 transition-smooth ${
                  done
                    ? "bg-accent text-accent-foreground"
                    : active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={`text-xs uppercase tracking-widest ${
                  active || done ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < STEP_LABELS.length - 1 && (
                <span className="hidden sm:block h-px flex-1 bg-border" />
              )}
            </li>
          );
        })}
      </ol>

      {/* Step 1 — Doctor grid */}
      <section aria-label="Select a doctor">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
          <UserRound className="h-3.5 w-3.5" /> Select a doctor
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {doctors.map((d) => {
            const selected = d.id === doctorId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => pickDoctor(d)}
                aria-pressed={selected}
                className={`group text-left rounded-2xl p-3 border transition-smooth ${
                  selected
                    ? "border-accent bg-accent/5 shadow-card"
                    : "border-border bg-secondary/30 hover:border-accent/40 hover:bg-secondary/60"
                }`}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-3">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-500"
                  />
                  {selected && (
                    <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-accent text-accent-foreground grid place-items-center">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
                <div className="font-serif text-sm text-primary leading-tight">
                  {d.name}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {d.role}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2 — Calendar */}
      <AnimatePresence initial={false}>
        {doctor && (
          <motion.section
            key="date-step"
            aria-label="Select a date"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                <CalendarIcon className="h-3.5 w-3.5" /> Pick a date
                <span className="text-muted-foreground/60 normal-case tracking-normal">
                  · {doctor.name} works{" "}
                  {doctor.workingDays.includes(0) ? "all week" : "Mon – Sat"}
                </span>
              </div>
              <div className="bg-secondary/30 rounded-2xl p-4 inline-block">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={pickDate}
                  disabled={(d) =>
                    d < today || d > maxDate || !isDoctorAvailableOn(doctor, d)
                  }
                  fromDate={today}
                  toDate={maxDate}
                />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Step 3 — Time slots */}
      <AnimatePresence initial={false}>
        {doctor && date && (
          <motion.section
            key="time-step"
            aria-label="Select a time"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-8">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Available times for{" "}
                {formatShortDate(date)}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {slots.map((s) => {
                  const isBooked = booked.has(s);
                  const isSelected = s === time;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => !isBooked && pickTime(s)}
                      disabled={isBooked}
                      aria-pressed={isSelected}
                      className={`px-2 py-2.5 rounded-xl text-sm font-medium border transition-smooth ${
                        isSelected
                          ? "border-accent bg-accent text-accent-foreground"
                          : isBooked
                            ? "border-border bg-secondary/30 text-muted-foreground/50 line-through cursor-not-allowed"
                            : "border-border bg-secondary/40 text-foreground hover:border-accent/50 hover:bg-accent/10"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-[11px] text-muted-foreground">
                Times shown in clinic local time. Struck-through slots are
                already booked.
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Selection summary */}
      <AnimatePresence>
        {doctor && date && time && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mt-8 rounded-2xl bg-gradient-hero p-5 md:p-6 border border-accent/30"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-1">
                  Your selection
                </div>
                <div className="font-serif text-lg text-primary leading-snug">
                  {doctor.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatLongDate(date)} · {time}
                </div>
              </div>
              <Button
                type="button"
                variant="hero"
                size="lg"
                className="shrink-0 !shadow-none hover:!shadow-none"
                onClick={() => {
                  document
                    .getElementById("appointment-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Continue to your details
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
