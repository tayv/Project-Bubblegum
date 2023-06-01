"use client";

import { Ref, forwardRef, FC } from "react";
import * as SelectRadix from "@radix-ui/react-select";

export type FlatListItems = {
  value: string;
  labelText: string;
  separator: Boolean;
};
export type GroupListItems = {
  groupLabel: string | null;
  items: Array<FlatListItems>;
};

export type SelectProps = {
  value?: string;
  name?: string;
  placeholder: string;
  itemOptions: Array<FlatListItems | GroupListItems>;
  onChange?: (value: string) => void;
  forwardedRef?: Ref<HTMLFormElement>;
  className?: string;
};

// HELPER FUNCTIONS
const renderItems = (itemOptions: Array<FlatListItems>) => {
  return (
    <>
      {itemOptions.map((item: FlatListItems, index: number) => {
        return (
          <SelectRadix.Item
            key={index}
            value={item.value}
            className="px-2 py-1 outline-none cursor-pointer hover:bg-sky-300 rounded"
          >
            <SelectRadix.ItemText>{item.labelText}</SelectRadix.ItemText>
            <SelectRadix.ItemIndicator />
            {item.separator && (
              <SelectRadix.SelectSeparator className="h-px my-px bg-slate-300" />
            )}
          </SelectRadix.Item>
        );
      })}
    </>
  );
};

// Check if the itemOptions object has grouped items
const checkForGroupedItems = (itemOptions: any) => {
  // If the itemOptions object is missing a "groupLabel" property, then it's NOT a grouped item list
  let renderList = !!itemOptions[0].groupLabel
    ? renderGroupedItems(itemOptions)
    : renderItems(itemOptions);
  return renderList;
};

const renderGroupedItems = (itemOptions: Array<GroupListItems>) => {
  return (
    <>
      {itemOptions.map((itemOption: GroupListItems, index: number) => {
        return (
          <SelectRadix.Group key={index}>
            {/*  One label per group. It's not reachable via keyboard and used only for the respective group of items. It's different from the input's label. */}
            <SelectRadix.Label
              key={itemOption.groupLabel}
              className="text-sm text-slate-500 pt-2"
            >
              {itemOption.groupLabel}
            </SelectRadix.Label>

            {renderItems(itemOption.items)}
          </SelectRadix.Group>
        );
      })}
    </>
  );
};

// MAIN COMPONENT
const Select: FC<SelectProps> = forwardRef<HTMLButtonElement, SelectProps>(
  function setRefSelect({ placeholder, itemOptions, ...props }, ref) {
    return (
      <SelectRadix.Root {...props} onValueChange={props.onChange} >
        <SelectRadix.Trigger
          ref={ref}
          className="px-3 py-2 bg-slate-100 hover:bg-white outline-none text-md border-solid border-2 border-slate-500 rounded-lg font-medium "
        >
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon className="pl-2 " />
        </SelectRadix.Trigger>

        <SelectRadix.Portal>
          <SelectRadix.Content className="py-1 px-2 outline-none border-solid border-2 rounded-lg border-slate-500 bg-white shadow-md">
            <SelectRadix.ScrollUpButton />
            <SelectRadix.Viewport>
              {/* Need a condition here to check whether to render grouped list vs standard select  */}
              {checkForGroupedItems(itemOptions)}
            </SelectRadix.Viewport>
            <SelectRadix.ScrollDownButton />
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    );
  }
);

export default Select;

// Usage
// Schema will change whether the select is grouped or not
// Flat List: type ItemOptions = { value: string, labelText: string, separator: Boolean }
// Group List: type GroupListItems = { groupLabel: string | null, items: Array<ItemOptions> }
