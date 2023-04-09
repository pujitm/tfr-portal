// Drag and drop roster builder

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type PropsWithChildren, useState } from "react";

export function SortableItem(props: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=""
    >
      <InnerItem name={props.id} />
    </div>
  );
}

function InnerItem({ name }: { name: string }) {
  return (
    <div className="rounded-md border border-neutral-100 bg-neutral-50 px-4 py-2">
      {name}
    </div>
  );
}

const warGroups = [
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
  "Reserve",
] as const;

// https://steveholgado.com/typescript-types-from-arrays/
type TWarGroup = (typeof warGroups)[number];
type TDraggableItems = Record<TWarGroup, string[]>;

function GroupContainer(props: { id: string; items: string[] }) {
  // Enables dragging items into empty list
  const { id, items } = props;
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
        className="space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg"
      >
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}

// O(n) space and time
function findItemContainer(items: TDraggableItems, itemID: string) {
  // Two options: either maintain internal map (performant reads) or calculate dynamically
  // For maintaining internal map, could reduce into TDraggableItems in O(n) per render, but sorting/maintaining sort order could be a problem

  // Type of each entry is [string, string[]] -> [groupID, list of group member IDs]
  const matchingEntry = Object.entries(items).find(([, groupMemberSet]) =>
    groupMemberSet.includes(itemID)
  );

  if (matchingEntry) {
    const [groupID] = matchingEntry;
    return groupID as TWarGroup;
  }
  return undefined; // no matching group
}

export default function RosterMaker() {
  const [items, setItems] = useState<TDraggableItems>({
    G1: ["Player 1", "Player 2"],
    G2: ["Player 3", "Player 4"],
    G3: ["Player 5", "Player 6"],
    G4: ["Player 7", "Player 8"],
    G5: ["Player 9", "Player 10"],
    G6: ["Player 11", "Player 12"],
    G7: ["Player 13", "Player 14"],
    G8: ["Player 15", "Player 16"],
    G9: ["Player 17", "Player 18"],
    G10: ["Player 19", "Player 20"],
    Reserve: ["Player 21", "Player 22"],
  });
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
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-5 gap-4">
        {warGroups.map((name) => (
          <GroupContainer key={name} id={name} items={items[name]} />
        ))}
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

    // Find the containers
    const activeContainer = findItemContainer(items, id);
    const overContainer = findItemContainer(items, overId);

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

    const activeContainer = findItemContainer(items, id);
    const overContainer = findItemContainer(items, overId);

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
