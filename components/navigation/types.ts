export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface CTAButtonProps {
  className?: string;
  onClick?: () => void;
}

export interface LogoProps {
  className?: string;
}

export interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export interface DesktopNavProps {
  pathname: string;
}

export interface ContactInfoProps {
  className?: string;
}

export interface BackgroundEffectsProps {
  className?: string;
}

export interface FullscreenMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}