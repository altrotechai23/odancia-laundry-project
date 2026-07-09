import { Variants } from "framer-motion";

/* ------------------------------ */
/* HEADER */
/* ------------------------------ */

export const headerVariants: Variants = {
  hidden: {
    y: -40,
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* ------------------------------ */
/* FULLSCREEN OVERLAY */
/* ------------------------------ */

export const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      duration: 0.35,
    },
  },

  exit: {
    opacity: 0,

    transition: {
      duration: 0.25,
    },
  },
};

/* ------------------------------ */
/* FULLSCREEN MENU */
/* ------------------------------ */

export const menuVariants: Variants = {
  hidden: {
    clipPath: "circle(0% at calc(100% - 40px) 40px)",
  },

  visible: {
    clipPath: "circle(150% at calc(100% - 40px) 40px)",

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    clipPath: "circle(0% at calc(100% - 40px) 40px)",

    transition: {
      duration: 0.55,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

/* ------------------------------ */
/* STAGGER LINKS */
/* ------------------------------ */

export const menuContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },

  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/* ------------------------------ */
/* INDIVIDUAL LINK */
/* ------------------------------ */

export const menuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },

  visible: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    x: -20,

    transition: {
      duration: 0.2,
    },
  },
};

/* ------------------------------ */
/* LOGO */
/* ------------------------------ */

export const logoVariants: Variants = {
  initial: {
    scale: 1,
  },

  hover: {
    scale: 1.04,

    transition: {
      duration: 0.25,
    },
  },
};

/* ------------------------------ */
/* CTA BUTTON */
/* ------------------------------ */

export const ctaVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },

  hover: {
    scale: 1.04,
    y: -2,

    transition: {
      duration: 0.25,
    },
  },

  tap: {
    scale: 0.98,
  },
};

/* ------------------------------ */
/* MENU BUTTON */
/* ------------------------------ */

export const menuButtonVariants: Variants = {
  initial: {
    rotate: 0,
  },

  open: {
    rotate: 180,

    transition: {
      duration: 0.35,
    },
  },

  closed: {
    rotate: 0,

    transition: {
      duration: 0.35,
    },
  },
};

/* ------------------------------ */
/* FLOATING BACKGROUND GLOW */
/* ------------------------------ */

export const glowVariants: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.4, 0.7, 0.4],

    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ------------------------------ */
/* CONTACT / FOOTER */
/* ------------------------------ */

export const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.45,
      duration: 0.5,
    },
  },
};