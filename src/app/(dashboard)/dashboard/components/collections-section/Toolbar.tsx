'use client';

import { useSearch } from "@/components/search";
import { Input } from "@nextui-org/input";
import { Search01Icon } from "hugeicons-react";

export default function Toolbar() {
    const { searchQuery, setSearchQuery} = useSearch();
    
    return(
        <Input
            placeholder="Search"
            radius="full"            
            className="w-full lg:max-w-screen-sm"
            value={searchQuery}
            endContent= {<Search01Icon size={16}/>}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    )
}