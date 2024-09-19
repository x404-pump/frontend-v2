'use client';

import React from "react";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

import { SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export function NavBar() {

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
            wrapper: "w-full",
          }}
      >
          <NavbarContent
              className="flex basis-1/5 sm:basis-full"
              justify="start"
          >
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