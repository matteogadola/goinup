//./components/Autocomplete.tsx
import classNames from "classnames"
import React, { memo, useRef, useState } from "react"

type Props = {
  name: string;
  value: string | null;
  items: string[];
  placeholder?: string;
  onChange(e: any): void;
}

//we are using dropdown, input and menu component from daisyui
const Autocomplete = (props: Props) => {
  const { name, items, placeholder, onChange } = props
  const value = props.value ?? ''

  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
    >
      <input
        type="text"
        name={name}
        className="input input-bordered w-full field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        list="list"
        tabIndex={0}
      />

      <datalist id="list">

        {value.length > 3 && items.filter(item => item.includes(value)).map((item, index) =>
          <option key={index} tabIndex={index} value={item}></option>
        )}

      </datalist>


      {/*
      <div className="hidden dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
        <ul
          className="menu menu-compact "
          // use ref to calculate the width of parent
          style={{ width: ref.current?.clientWidth }}
        >
          {items.map((item, index) => {
            return (
              <li
                key={index}
                tabIndex={index + 1}
                onClick={() => {
                  onChange(item);
                }}
                className="border-b border-b-base-content/10 w-full"
              >
                <button>{item}</button>
              </li>
            );
          })}
        </ul>
      </div>*/}
    </div>
  )
}
export default memo(Autocomplete)