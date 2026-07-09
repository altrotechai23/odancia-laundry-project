import type { NavLink, SocialLink } from "./types";

export const NAV_LINKS: NavLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const CONTACT = {
  phone: "+27 71 838 5010",
  phoneHref: "tel:+27718385010",

  whatsapp: "https://wa.me/27718385010",

  email: "info@odancialaundry.co.za",

  address: "Cape Town, South Africa",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/odancialaundry",
    external: true,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/odancialaundry",
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/27718385010",
    external: true,
  },
];

export const COMPANY = {
  name: "Odancia Laundry",

  slogan: "Luxury Laundry & Dry Cleaning",

  cta: "Schedule Pickup",

  menuTitle: "Navigation",

  founded: "2025",
};

export const MENU_FOOTER = [
  "Premium Garment Care",
  "24 Hour Turnaround",
  "Free Pickup & Delivery",
];