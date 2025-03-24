"use client";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/selector";
import Skeleton from "../../ui/Skeleton";

type Item = {
  label: string;
  value: string;
};
export type CustomSelectorProps = {
  items?: Item[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  emptyOption?: {
    label: string;
  };
  unSelectedLabel?: string;
  disabled?: boolean;
  nullOption?: { label: string };
  allOption?: {
    label: string;
  };
  className?: string;
  skeletonClassName?: string;
};
export default function CustomSelector({
  items,
  onChange,
  emptyOption,
  label = "Opções",
  unSelectedLabel = "Seleccione",
  nullOption,
  allOption,
  className,
  skeletonClassName,
  ...rest
}: CustomSelectorProps) {
  return items ? (
    <Select onValueChange={onChange} {...rest}>
      <SelectTrigger
        className={clsx(
          "text-base min-w-[120px] 3xl:text-lg 2xl:h-11",
          className
        )}
      >
        <SelectValue placeholder={unSelectedLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="2xl:text-lg">
          <SelectLabel>
            {items.length != 0
              ? label
              : `Sem ${label.toLowerCase()} - adicione um(a)`}
          </SelectLabel>
          {nullOption && (
            <SelectItem className="2xl:text-lg" value="null">
              {nullOption.label}
            </SelectItem>
          )}
          {allOption && (
            <SelectItem className="2xl:text-lg" value="all">
              {allOption.label}
            </SelectItem>
          )}
          {emptyOption && (
            <SelectItem className="2xl:text-lg" value="empty">
              {emptyOption.label ?? "Nenhum(a)"}
            </SelectItem>
          )}
          {items.map((item) => (
            <SelectItem
              className="2xl:text-lg"
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <Skeleton
      className={clsx(
        "w-full px-3 py-2 h-10 2xl:h-11 rounded-md",
        skeletonClassName
      )}
    />
  );
}
