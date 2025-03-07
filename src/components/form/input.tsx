import clsx from 'clsx';
import { Children } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  control?: Control<any>;
  className: string;
  //onChange(e: any): void;
}

export default function Input({ name, label, placeholder, control, className }: Props) {

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className={clsx(className, "field", { "invalid": fieldState.error })}>
            <label className="label" htmlFor={field.name}>{label}</label>
            <input
              type="text"
              name={field.name}
              value={field.value}
              placeholder={placeholder}
              onChange={e => field.onChange(e.target.value.toUpperCase())}
            />
            {fieldState.error?.message && <small className="field-error">{fieldState.error?.message}</small>}
          </div>
        )}
      />
    </div>
  )
}
