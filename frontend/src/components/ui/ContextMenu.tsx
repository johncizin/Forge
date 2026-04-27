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
    })

}