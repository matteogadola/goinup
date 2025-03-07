import classNames from "classnames"
import React, { memo, useRef, useState } from "react"

type Props = {
  quantity: number;
  onChange(quantity: number): void;
}

const QuantityInput = (props: Props) => {
  const { quantity, onChange } = props
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="flex items-center border border-gray-200 rounded">
      <button
        type="button"
        className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        onClick={() => onChange(Math.max(0, quantity - 1))}
      >
        &minus;
      </button>

      <input
        type="number"
        value={quantity}
        className="h-10 w-12 bg-transparent border-transparent text-center focus:outline-none [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="button"
        className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        onClick={() => onChange(quantity + 1)}
      >
        &#43;
      </button>
    </div>

  )
}
export default memo(QuantityInput)