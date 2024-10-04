import { Input } from '@nextui-org/input';
import { SearchIcon } from '../icons';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export * from './SearchContext';
export default function SearchEngine() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
   
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set(name, value)
   
        return params.toString()
      },
      [searchParams]
    )
   
    return (
        <div>
            <Input
                placeholder="Search"
                variant='bordered'
                size="md"
                width="100%"
                radius="full"
                startContent= {<SearchIcon />}
                onChange={(e) => {
                    const value = e.target.value

                    router.push(pathname + '?' + createQueryString('search', value))
                }}
            />
        </div>
    );
}