// src/components/ui/Checkbox.tsx
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {}

const Checkbox: React.FC<CheckboxProps> = (props) => (
  <CheckboxPrimitive.Root
    {...props}
    className="w-5 h-5 border-2 rounded-md border-gray-300 bg-white checked:bg-blue-600 focus:ring focus:ring-blue-200"
  >
    <CheckboxPrimitive.Indicator>
      <Check className="w-4 h-4 text-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export default Checkbox;
