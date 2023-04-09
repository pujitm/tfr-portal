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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren, useState } from "react";

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
      className="rounded-md bg-neutral-50 px-4 py-2"
    >
      An Item {props.id}
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

function GroupContainer(props: PropsWithChildren<{ id: string }>) {
  // Enables dragging items into empty list
  const { setNodeRef } = useDroppable({
    id: props.id,
  });
  return (
    <div
      ref={setNodeRef}
      className="space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg"
    >
      {props.children}
    </div>
  );
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      onDragEnd={() => setActiveId(null)}
      // onDragEnd={(event) => {
      //   const { active, over } = event;

      //   if (active.id !== over?.id) {
      //     setItems((items) => {
      //       const oldIndex = items.indexOf(active.id as string);
      //       const newIndex = items.indexOf(over?.id as string);

      //       return arrayMove(items, oldIndex, newIndex);
      //     });
      //   }
      // }}
    >
      <div className="grid grid-cols-5 gap-4">
        {warGroups.map((name) => (
          <GroupContainer key={name} id={name}>
            <SortableContext items={items[name]}>
              {items[name].map((id) => (
                <SortableItem key={id} id={id} />
              ))}
            </SortableContext>
          </GroupContainer>
        ))}
      </div>
      <DragOverlay>
        {activeId ? <SortableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
