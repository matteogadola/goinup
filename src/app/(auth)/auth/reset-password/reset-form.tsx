'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useStore } from '@/store/store'
import Button from '@/components/ui/button'

export interface ResetPasswordForm {
  password: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  //const [error, setError] = useState<string | undefined>(undefined)

  const [state, setState] = useState({
    error: undefined,
    isLoading: false,
  });

  const handleResetPassword = async (formData: any) => {
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password
    })

    if (error) {
      throw new Error(error.message);
    }

    // dovranno pushare a confirm apassowrd
    // router.push(data.user.app_metadata.role ? '/admin' : '/account');
    router.push(data.user?.app_metadata.role ? '/admin' : '/');
    // CONFERMA MAIL
    router.refresh();

    return data;
  }

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<ResetPasswordForm>({
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    try {
      setState(state => ({ ...state, isLoading: true }))
      await handleResetPassword(data);
      // router.refresh();
    } catch (e: any) {
      setState(state => ({ ...state, error: e.message }))
      return;
    } finally {
      setState(state => ({ ...state, isLoading: false }))
    }
  }

  return (
    <section className="page">
      <div className="w-full lg:w-1/3 mx-auto">
        <form className="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1 lg:col-span-2">
              <label className="label" htmlFor="password">Nuova Password</label>
              <input
                type="password"
                className={classNames("field", { "invalid": errors.password })}
                {...register("password", { required: 'Campo obbligatorio' })}
              />
              {errors.password && <small className="validation-error">{errors.password.message}</small>}
            </div>

            {state.error &&
              <div className="col-span-1 lg:col-span-2 mt-4">
                <div className="relative px-2 py-1 leading-normal text-red-700" role="alert">
                  <span className="absolute inset-y-0 left-0 flex items-center ml-4">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </span>
                  <p className="ml-8">{state.error}</p>
                </div>
              </div>
            }

            <Button type="submit" className="col-span-1 lg:col-span-2 mt-4 bg-blue-200 hover:opacity-80 font-bold py-2 px-4 rounded" isLoading={state.isLoading}>
              Conferma
            </Button>

          </div>
        </form>
      </div>
    </section>
  )
}