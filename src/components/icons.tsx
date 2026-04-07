import { 
  Search, 
  User, 
  ShoppingCart, 
  HelpCircle, 
  // Facebook, 
  // Instagram, 
  Music2, 
  Pin,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight
} from "lucide-react";

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="218" height="74" viewBox="0 0 218 74" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M76.9733 36.579C75.8155 37.2197 74.6347 37.5446 73.422 37.5446C72.5204 37.5446 71.8111 37.3021 71.2894 36.8124C70.7677 36.3273 70.5068 35.6592 70.5068 34.8171C70.5068 32.0621 72.3786 29.0646 76.1267 25.8245C79.8747 22.5844 83.4992 20.9644 87.0047 20.9644C87.1329 20.9644 87.2565 20.9644 87.3754 20.9644C87.4944 20.9644 87.6088 20.9735 87.7187 20.9918C88.7118 19.5777 89.714 18.2094 90.7345 16.8868C91.7551 15.5642 92.7664 14.3972 93.7778 13.3904C94.0707 13.0975 94.359 12.8275 94.6473 12.5758C94.9311 12.3287 95.2011 12.0953 95.4619 11.8756C94.2492 12.5346 93.0776 13.2485 91.9518 14.0082C90.8215 14.7725 90.0847 15.1523 89.7369 15.1523C89.6636 15.1523 89.595 15.134 89.5309 15.0974C89.4669 15.0608 89.4074 15.015 89.3524 14.9601C89.2426 14.8503 89.1602 14.6901 89.1053 14.4796C89.0504 14.2691 89.0229 14.0906 89.0229 13.9442C89.0229 13.1891 89.5904 12.4431 90.7299 11.6971C91.8695 10.9558 92.4278 10.4066 92.4095 10.0588C92.3912 10.0405 92.3546 10.0176 92.2996 9.99015" fill="currentColor"/>
  </svg>
);

export const SearchIcon = Search;
export const UserIcon = User;
export const CartIcon = ShoppingCart;
export const HelpIcon = HelpCircle;
export const FacebookIcon = Search;
export const InstagramIcon = Search;
export const TikTokIcon = Music2;
export const PinterestIcon = Pin;
export const WhatsAppIcon = MessageCircle;
export const MenuIcon = Menu;
export const CloseIcon = X;
export { ChevronDown, ChevronRight, ArrowRight };
