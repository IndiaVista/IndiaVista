import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
export default function Dropdown({key,keyName, labels, items, handleChange, indexval}) {
    const [label,setLabel]=useState(labels)
    const handleClick=(value)=>{
        setLabel(value)
        handleChange(indexval, keyName, value); 
    }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton 
        
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {label}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div className="py-1">
          {items.map((value, index) => (
            <MenuItem 
            key={index}>
                
              {({ active }) => (
                <button
                  
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm`}
                  onClick={()=>handleClick(value)}
                  
                >
                  {value}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
