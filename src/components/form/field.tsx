import clsx from 'clsx';
import { Children } from 'react';

type Props = {
  name: string;
  label: string;
  placeholder: string;
  className: string;
  onChange(e: any): void;
}

export default function Field({ name, label }: Partial<Props>) {

  return (
    <div className={clsx(className, "field", { "invalid": errors.last_name })}>
      <label className="label" htmlFor={name}>{label}</label>
      {Children}
      <input
        type="text"
        className={clsx("field", { "invalid": errors.last_name })}
        {...register("last_name", { required: 'Campo obbligatorio' })}
      />
      {errors.last_name && <small className="field-error">{errors.last_name.message}</small>}
    </div>
  )
}
