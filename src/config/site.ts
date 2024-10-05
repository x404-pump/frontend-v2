export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "X404 Pump",
  description: "Groundbreaking ecosystem built on the Aptos blockchain, centered around the new ERC404 standard for tokenized NFTs",
  slogan: "Fractionalized, NFTs and Focused Launchpad",
  keywords: "X404, NFT, ERC404, Aptos, Launchpad, Marketplace",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Disconnect",
      href: "/disconnect",
    },
  ],
  links: {
    github: "https://github.com/x404-pump",
    docs: "https://x404pump.gitbook.io/x404pump-docs",
    x: "https://x.com/x404pump",
    telegram: "https://t.me/x404pump",
  },
};
