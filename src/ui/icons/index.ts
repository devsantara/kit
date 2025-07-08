import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleIcon,
  GripVerticalIcon,
  MinusIcon,
  MoreHorizontalIcon,
  PanelLeftIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';

/**
 * Icon library.
 *
 * @description
 * This module centralizes icon imports, providing a single source of truth for all icons used within the application.
 *
 * It utilizes the `lucide-react` library as code icons library (_replaceable_) and maps icons to meaningful names based on their function or usage.
 *
 * @example
 * **Adding New Icons**:
 * 1. Import the desired icon from `lucide-react`:
 *    ```ts
 *    import { ChevronDownIcon } from 'lucide-react';
 *    ```
 * 2. Add the imported icon to the `Icons` object, assigning a descriptive name:
 *    ```ts
 *    export const Icons = {
 *      AccordionToggle: ChevronDownIcon,
 *      // ...other icons
 *    };
 *    ```
 *
 * **Usage**:
 * Icons should always be accessed through the `Icons` object to maintain consistency and ease of updates:
 * ```tsx
 * <Icons.AccordionToggle />
 * ```
 *
 * This practice allows easy icon replacements or updates without changing component implementations directly.
 */
export const Icons = {
  ChevronUp: ChevronUpIcon,
  ChevronDown: ChevronDownIcon,
  ChevronRight: ChevronRightIcon,
  ChevronLeft: ChevronLeftIcon,
  ArrowRight: ArrowRightIcon,
  ArrowLeft: ArrowLeftIcon,
  MoreHorizontal: MoreHorizontalIcon,
  GripVertical: GripVerticalIcon,
  Check: CheckIcon,
  Search: SearchIcon,
  Circle: CircleIcon,
  Close: XIcon,
  Dash: MinusIcon,
  Sidebar: PanelLeftIcon,
  // Add icons here
};
