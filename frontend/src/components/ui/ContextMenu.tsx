//context menu injected with options for both project and task
// editing, updating, deleting, maybe -- view members haven't decided on that one

//react
import { useState, useRef, useEffect, type MouseEventHandler } from "react";

//icon
import { EllipsisVertical } from "lucide-react";

interface ContextMenuOption {
    label: string;
    onClick: () => void;
    destructive?: boolean;
}

//passed from Project and Task -- need 2 separate in the Dashboard and Project Views for Grid/Card and different actions
interface ContextMenuProps {
    options: ContextMenuOption[];
}

export function ContextMenu({ options }:  ContextMenuProps){
    const[open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null); //

    useEffect(() =>{
        function handleClickOutside(e: MouseEvent){
            //if ref exists, and ref does not contain mouse target then close the the Menu
            if(ref.current && !ref.current.contains(e.target as Node)){
                setOpen(false);
            }
        }
        //when clicked outside
        document.addEventListener("mousedown", handleClickOutside);
        //disconnect event- each time would have a new event and then its a memory leak and not necessary to always be listening when menu isnt open
        return () => document.removeEventListener("mousedown", handleClickOutside);

    },[])

       return (
        <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
            <button
                onClick={() => setOpen(!open)}
                className="p-1 rounded-md text-forge-muted hover:text-forge-login-text hover:bg-gray-100 transition-colors"
            >
                <EllipsisVertical size={14} />
            </button>

            {open && (
                <div className="absolute right-0 top-6 z-20 bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden min-w-30">
                    {options.map((option) => (
                        <button
                            key={option.label}
                            onClick={() => {
                                option.onClick();
                                setOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${
                                option.destructive ? "text-red-500" : "text-forge-login-text"
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

}