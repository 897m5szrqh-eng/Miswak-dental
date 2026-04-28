export type GalleryItem = { title: string; img: string };

export const galleryItems: GalleryItem[] = [
  { title: "Reception & Hospital Entrance", img: `${import.meta.env.BASE_URL}gallery/reception.png` },
  { title: "Modern Treatment Room", img: `${import.meta.env.BASE_URL}gallery/treatment-room.png` },
  { title: "Advanced CBCT Imaging", img: `${import.meta.env.BASE_URL}gallery/cbct-scanner.png` },
  { title: "Patient Waiting Area", img: `${import.meta.env.BASE_URL}gallery/waiting-area.png` },
];
