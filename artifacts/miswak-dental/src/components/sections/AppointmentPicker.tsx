import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, UserRound } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const pickDoctor = (id: string) => {
    setDoctorId(id);
    const next = doctors.find((d) => d.id === id) ?? null;
    if (next && date && !isDoctorAvailableOn(next, date)) {
      setDate(undefined);
      setTime(null);
      onSelectionChange(null);
    } else if (next && date && time) {
      onSelectionChange({ doctor: next, date, time });
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
      <div className="flex items-center justify-between gap-4 mb-8">
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

      {/* Step 1 — Doctor dropdown */}
      <section aria-label="Select a doctor">
        <label
          htmlFor="doctor-select"
          className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2"
        >
          <UserRound className="h-3.5 w-3.5" /> Select a doctor
        </label>
        <Select value={doctorId ?? undefined} onValueChange={pickDoctor}>
          <SelectTrigger
            id="doctor-select"
            className="h-12 rounded-xl bg-secondary/40 border-border text-base"
          >
            <SelectValue placeholder="Choose a doctor…" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                <span className="font-medium">{d.name}</span>
                <span className="text-muted-foreground"> · {d.role}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
