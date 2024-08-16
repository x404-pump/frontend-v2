'use client';

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import { PiShootingStarBold } from "react-icons/pi";
import { Copy01Icon } from "hugeicons-react";


import {
  APTCoinIcon,
  SearchIcon,
} from "@/components/icons";
import { ConnectWalletDialog } from '@/components/WalletSelector';
import { GradientBorder } from "@/components/GradientBorder";
import { ThemeSwitch } from "@/components/theme-switch";
import { truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import { accountAPTBalance } from "@/view-functions/accountBalance";
import { useAccount } from "@/hooks/useAccount";
import React from "react";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      radius="full"
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="start">
        <NavbarItem className="hidden lg:flex">
          {searchInput}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </NextUINavbar>
  );
};