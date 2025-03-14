'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import classNames from 'classnames'
import { Attachment, Event } from '@/types/events'
//import { useSupabase } from '@/app/components/supabase-provider'
import { createClient } from '@/lib/supabase-auth-client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

//type AttachmentForm = Omit<Attachment, 'id'>
/*interface AttachmentForm extends Attachment {
}*/

type Props = {
  className?: string;
  attachment: Attachment | undefined;
  event: Event;
  //items: Item[];
  onResult(attachment: Attachment): void;
  onClose(e: any): void;
}

interface State {
  error: string | undefined;
  isLoading: boolean;
}

//const supabase = createClient();

export default function AttachmentDialog({ className, attachment, event, onResult, onClose }: Props) {
  //const { supabase, session } = useSupabase()
  const supabase = createClientComponentClient<Database>();

  const [state, setState] = useState<State>({ error: '', isLoading: false });
  const [error, setError] = useState(null)

  // se attachmente undefined
  const createAttachment = async (attachment: Omit<Attachment, 'id'>) => {
    const { data, error } = await supabase
      .from('attachments')
      .insert(attachment)
      .select()
      .returns<Attachment[]>()
      .single();

    if (error) {
      throw new Error(`Errore inatteso: ${error.code}`);
    }
    /*
    {
    "code": "23503",
    "details": "Key (event_id)=() is not present in table \"events\".",
    "hint": null,
    "message": "insert or update on table \"attachments\" violates foreign key constraint \"attachments_event_id_fkey\""
  }
  */
    return data;
  };

  const updateAttachment = async (attachment: Partial<Attachment>) => {
    const id = attachment.id;
    delete attachment.id;

    const { data, error } = await supabase
      .from('attachments')
      .update(attachment)
      .eq('id', id)
      .select()
      .returns<Attachment[]>()
      .single();

    if (error) {
      throw new Error(`Errore inatteso: ${error.code}`);
    }

    return data;
  };

  const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm<Attachment>({
    defaultValues: attachment
  })

  const onSubmit: SubmitHandler<Attachment> = async data => {
    setError(null);

    try {
      setState({ ...state, isLoading: true });
      let attachment;

      if (data.id) {
        attachment = await updateAttachment(data);
      } else {
        attachment = await createAttachment({
          event_id: event.id,
          type: data.type,
          name: data.name,
          url: data.url,
        });
      }

      if (attachment) {
        setState({ ...state, error: '' });
        onResult(attachment);
      }
    } catch (e: any) {
      //console.log(JSON.stringify(e.message))
      console.log("DENTRO", e.message)
      //console.log("dentro")
      setError(e.message);
      setState({ ...state, error: e.message });
    } finally {
      setState({ ...state, isLoading: false });
    }
  }

  return (
    <section className={classNames(className, "overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center bg-gray-500 bg-opacity-75 transition-opacity")}>
      <div className="relative w-auto my-6 mx-auto max-w-2xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="overtitle">Allegato</h3>
            <h1 className="title">{attachment?.name || 'Nuovo'}</h1>
          </div>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative p-6 flex-auto">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="hidden">
                  <input
                    type="text"
                    {...register("id")}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="type">Tipologia</label>
                  <select
                    className={classNames("field", { "invalid": errors.type })}
                    {...register("type", { required: 'Campo obbligatorio' })}
                  >
                    <option value='result'>Classifica</option>
                    <option value='photo' selected>Foto</option>
                    <option value='video'>Video</option>
                    <option value='article'>Articolo</option>
                    <option value='link'>Link generico</option>
                  </select>
                  {errors.type && <small className="field-error">{errors.type.message}</small>}
                </div>

                <div>
                  <label className="label" htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className={classNames("field", { "invalid": errors.name })}
                    {...register("name", { required: 'Campo obbligatorio' })}
                  />
                  {errors.name && <small className="field-error">{errors.name.message}</small>}
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <label className="label" htmlFor="url">Url</label>
                  <textarea
                    className={classNames("field", { "invalid": errors.url })}
                    {...register("url", { required: 'Campo obbligatorio' })}
                  />
                  {errors.url && <small className="field-error">{errors.url.message}</small>}
                </div>

              </div>









            </div>


            <div className="px-4">
              {error && <div className="mt-4">
                <div className="relative px-2 py-1 leading-normal text-red-700" role="alert">
                  <span className="absolute inset-y-0 left-0 flex items-center ml-4">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </span>
                  <p className="ml-8">{error}</p>
                </div>
              </div>
              }

              <div className="flex items-center justify-end p-6 rounded-b">
                <button onClick={onClose} className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                  Annulla
                </button>

                <button
                  type="submit"
                  disabled={state.isLoading}
                  className="rounded-md bg-button px-6 py-3 text-base font-medium text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {state.isLoading &&
                    <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
                    </svg>
                  }
                  Conferma
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
