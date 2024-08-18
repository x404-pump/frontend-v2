'use client';

import React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

import { SidebarLeftIcon } from "hugeicons-react";
import { useSidebarControl } from "./sidebar";import { SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { toggleIsExpanded } = useSidebarControl();

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
      <Navbar
          maxWidth="full"
          classNames={{
            base: "bg-background/1 backdrop-blur-lg",
          }}
          onMenuOpenChange={setIsMenuOpen}
      >
          <NavbarContent
              className="flex basis-1/5 sm:basis-full"
              justify="start"
          >
              <NavbarItem>
                  <Button
                      aria-label="Open sidebar"
                      isIconOnly
                      radius="full"
                      variant="light"
                      onClick={toggleIsExpanded}
                  >
                      <SidebarLeftIcon size={24} />
                  </Button>
              </NavbarItem>
              {searchInput}
          </NavbarContent>

          <NavbarContent
              className="hidden sm:flex basis-1/5 sm:basis-full"
              justify="end"
          >
              <NavbarItem className="sm:flex gap-2">
                  <ThemeSwitch />
              </NavbarItem>
          </NavbarContent>
      </Navbar>
  )
}