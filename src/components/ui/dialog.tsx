//./components/Autocomplete.tsx
import classNames from "classnames"
import React, { memo, useRef, ReactNode } from "react"

type Props = {
  name: string;
  value: string | null;
  items: string[];
  placeholder?: string;
  onChange(e: any): void;
};

const Dialog: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center" id="modal-id">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Modal Title
            </h3>
            <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                x
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-slate-500 text-lg leading-relaxed">
              {children}
            </p>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              Close
            </button>
            <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Dialog)