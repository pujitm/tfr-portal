// Drag and drop roster builder

import { memo, useEffect, useState, type PropsWithChildren } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useLocalStorage, useToggle } from "usehooks-ts";

import cn from "~/utils/classnames";
import { Icons } from "./Icons";
import ThemeSelect from "./ThemeSelect";
import { Button } from "./primitive/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./primitive/Dropdown";
import { Item } from "./sortable/Item/Item";

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // I believe this is an animation delay
    // from https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx#L717
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}

const RoleColors = {
  bruiser: "#7193f1",
  healer: "#71ffaa",
  support: "#ff93ff",
} as const;
type RoleVariant = keyof typeof RoleColors;
export function SortableItem(props: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
    over,
    overIndex,
  } = useSortable({ id: props.id, data: { builds: ["bruiser"] } });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;
  // The idea here is to separate the state management of the chosen build from the list's/item's state.
  // Using localstorage for the prototype, but this seems like a natural use case for jotai
  const [role, setBuild] = useLocalStorage(props.id, "bruiser");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {/* Old code left for reference in case we need the entire item to be draggable instead of just the handle */}
      {/* <div ref={setNodeRef} style={style} {...attributes} {...listeners}> */}
      {/* <InnerItem name={props.id} /> */}
      <Item
        value={<InnerItem id={props.id} setRole={setBuild} />}
        // Color of the left indicator
        color={RoleColors[role as RoleVariant]}
        fadeIn={mountedWhileDragging}
        dragging={isDragging}
        sorting={isSorting}
        handle
        // ref and listeners confine drag area. Since handle is true, Item confines it to the handle marker.
        ref={setNodeRef}
        style={style}
        listeners={listeners}
      />
      {/* </div> */}
    </>
  );
}
type InnerItemProps = {
  id: string;
  setRole: (role: RoleVariant) => void;
};
const InnerItem = memo(function InnerItem(props: InnerItemProps) {
  const { id, setRole } = props;
  return (
    <div className="flex justify-between items-center w-full">
      <p>{id}</p>
      {/* <ThemeSelect /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Select Build</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setRole("bruiser")}>
            <Icons.sun className="mr-2 h-4 w-4" />
            <span>Bruiser</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRole("healer")}>
            <Icons.moon className="mr-2 h-4 w-4" />
            <span>Healer</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRole("support")}>
            <Icons.laptop className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

const activeGroups = [
  "G1",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "G7",
  "G8",
  "G9",
  "G10",
] as const;

const warGroups = [...activeGroups, "Reserve"] as const;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from -> Sequence Generator
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const mockPlayers = range(1, 50, 1).map((num) => `Player ${num}`);
const mockReserve = range(1, 20, 1).map((num) => `Reserve ${num}`);

// https://steveholgado.com/typescript-types-from-arrays/
type TWarGroup = (typeof warGroups)[number];
type TDraggableItems = Record<TWarGroup, string[]>;

function GroupContainer(props: {
  id: string;
  items: string[];
  className?: string;
}) {
  // Enables dragging items into empty list
  const { id, items, className = "" } = props;
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className={cn(
          "min-h-full space-y-4 rounded-lg bg-neutral-100 p-4 pb-8 shadow-lg dark:bg-gray-800 dark:bg-gradient-to-br dark:from-indigo-700/90",
          className
        )}
      >
        <h2 className="font-semibold">{id}</h2>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}

// O(n) space and time based on keys in `items`
function findContainer(items: TDraggableItems, itemID: string) {
  // Two options: either maintain internal map (performant reads) or calculate dynamically
  // For maintaining internal map, could reduce into TDraggableItems in O(n) per render, but sorting/maintaining sort order could be a problem

  // itemID can be ANY droppable area

  if (itemID in items) {
    return itemID as TWarGroup;
  }

  return Object.keys(items).find((key) =>
    items[key as TWarGroup].includes(itemID)
  ) as TWarGroup;
}

export default function RosterMaker() {
  const [showReserve, toggle] = useToggle();
  const [items, setItems] = useState<TDraggableItems>({
    G1: mockPlayers.slice(0, 5),
    G2: mockPlayers.slice(5, 10),
    G3: mockPlayers.slice(10, 15),
    G4: mockPlayers.slice(15, 20),
    G5: mockPlayers.slice(20, 25),
    G6: mockPlayers.slice(25, 30),
    G7: mockPlayers.slice(30, 35),
    G8: mockPlayers.slice(35, 40),
    G9: mockPlayers.slice(40, 45),
    G10: mockPlayers.slice(45, 50),
    Reserve: mockReserve,
  });
  const { Reserve, ...activeRoster } = items;
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    // Based on https://codesandbox.io/s/dnd-kit-multi-containers-uvris1?file=/src/index.js
    // with adaptations from https://github.com/clauderic/dnd-kit/blob/5c58f0fe5d19b5aaa5cf93572f3435f4a0a6e54f/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx#L315
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      // Get item to correct column
      onDragOver={handleDragOver}
      // Get to correct position within column
      onDragEnd={handleDragEnd}
    >
      <Button className="mb-2" onClick={toggle}>
        {showReserve && "Hide Reserve"}
        {!showReserve && "Show Reserve"}
      </Button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {activeGroups.map((name) => (
          <GroupContainer key={name} id={name} items={items[name]} />
        ))}
      </div>
      <div
        className={clsx(
          "fixed right-2 top-14 animate-in fade-in slide-in-from-right-12 duration-500 md:right-3 md:top-28 ",
          !showReserve && "hidden"
        )}
      >
        <GroupContainer
          className="max-h-[85vh] min-w-[200px] overflow-scroll"
          key={"Reserve"}
          id="Reserve"
          items={Reserve}
        />
      </div>
      {/* DragOverlay enables drag animations outside the container */}
      <DragOverlay
        // From https://github.com/clauderic/dnd-kit/blob/5c58f0fe5d19b5aaa5cf93572f3435f4a0a6e54f/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx#L107
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.5",
              },
            },
          }),
        }}
      >
        {activeId ? <SortableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const id = active.id as string;
    const overId = over?.id as string;
    if (!active || !over) return;
    if (!id || !overId) return;
    console.log(
      `Draggable item ${id} was moved over droppable area ${overId}.`
    );

    const activeContainer = findContainer(items, id);
    const overContainer = findContainer(items, overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const id = active.id as string;
    const overId = over?.id as string;
    if (!active || !over) return;
    if (!id || !overId) return;
    console.log(
      `Draggable item ${id} was dropped over droppable area ${overId}`
    );
    const activeContainer = findContainer(items, id);
    const overContainer = findContainer(items, overId);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }
    const activeIndex = items[activeContainer].indexOf(id);
    const overIndex = items[overContainer].indexOf(overId);
    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
    setActiveId(null);
  }
}
