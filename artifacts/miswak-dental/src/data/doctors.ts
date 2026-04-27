export type Doctor = {
  id: string;
  name: string;
  role: string;
  credentials: string;
  years: string;
  image: string;
  workingDays: number[];
};

export const doctors: Doctor[] = [
  {
    id: "dr-ismail",
    name: "Dr. Ismail Qureshi",
    role: "Assistant Director",
    credentials: "BDS, Associate General Dentist",
    years: "18+ Years",
    image: "/treatments/dr-ismail.jpg",
    workingDays: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "dr-lukhman",
    name: "Dr. Lukhman Qureshi",
    role: "Assistant Director",
    credentials: "BDS, Associate General Dentist",
    years: "15+ Years",
    image: "/treatments/dr-lukhman.jpg",
    workingDays: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "dr-asadullah",
    name: "Dr. Mohammed Asadullah Khan",
    role: "Orthodontist",
    credentials: "BDS, MDS – Orthodontics",
    years: "17+ Years",
    image: "/treatments/dr-asadullah.jpg",
    workingDays: [1, 3, 5, 6],
  },
  {
    id: "dr-taha",
    name: "Dr. Taha Siddiqui",
    role: "Orthodontist",
    credentials: "BDS, MDS – Orthodontics",
    years: "14+ Years",
    image: "/treatments/dr-taha.jpg",
    workingDays: [2, 4, 6, 0],
  },
  {
    id: "dr-azhar",
    name: "Dr. Azhar Mohiuddin",
    role: "Oral Surgeon",
    credentials: "BDS, MDS – Oral & Maxillofacial Surgery",
    years: "14+ Years",
    image: "/treatments/dr-azhar.jpg",
    workingDays: [1, 2, 4, 5, 6],
  },
  {
    id: "dr-toufeek",
    name: "Dr. Mohammad Toufeek",
    role: "Oral Surgeon",
    credentials: "BDS, MDS – Oral & Maxillofacial Surgery",
    years: "10+ Years",
    image: "/treatments/dr-toufeek.jpg",
    workingDays: [2, 3, 5, 6, 0],
  },
  {
    id: "dr-farah",
    name: "Dr. Amtul Safia Farah",
    role: "General Dentist",
    credentials: "BDS, Miswak Associate",
    years: "10+ Years",
    image: "/treatments/dr-farah.jpg",
    workingDays: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "dr-shariqa",
    name: "Dr. Shariqa Riaz",
    role: "General Dentist",
    credentials: "BDS, Miswak Associate",
    years: "6+ Years",
    image: "/treatments/dr-shariqa.jpg",
    workingDays: [1, 2, 3, 4, 5, 6],
  },
];

function buildSlots(startHour: number, endHour: number): string[] {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (const m of [0, 30]) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "AM" : "PM";
      const minute = m.toString().padStart(2, "0");
      slots.push(`${hour12}:${minute} ${ampm}`);
    }
  }
  return slots;
}

export const WEEKDAY_SLOTS = buildSlots(9, 21);
export const SUNDAY_SLOTS = buildSlots(10, 17);

export function getSlotsForDay(weekday: number): string[] {
  return weekday === 0 ? SUNDAY_SLOTS : WEEKDAY_SLOTS;
}

export function isDoctorAvailableOn(doctor: Doctor, date: Date): boolean {
  return doctor.workingDays.includes(date.getDay());
}

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getBookedSlots(doctorId: string, date: Date): Set<string> {
  const slots = getSlotsForDay(date.getDay());
  const seed = hashString(`${doctorId}-${date.toDateString()}`);
  const booked = new Set<string>();
  const count = 2 + (seed % 4);
  for (let i = 0; i < count; i++) {
    booked.add(slots[(seed * (i + 1)) % slots.length]);
  }
  return booked;
}
