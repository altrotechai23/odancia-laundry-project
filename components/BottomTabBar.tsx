"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, Sparkles, Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/services", label: "Services", icon: Sparkles },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function BottomTabBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-1 rounded-2xl border border-border/50 bg-background/80 px-2 py-2 shadow-2xl shadow-foreground/10 backdrop-blur-xl">
            <div className="flex items-center pr-1 border-r border-border/30 mr-1">
              <ThemeToggle />
            </div>
            {tabs.map((tab) => {
              const active = isActive(tab.href);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="relative flex flex-col items-center px-4 py-1.5 transition-colors"
                >
                  {active && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-xl bg-primary/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <tab.icon
                    className={`relative z-10 h-5 w-5 transition-colors duration-200 ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`relative z-10 mt-0.5 text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
