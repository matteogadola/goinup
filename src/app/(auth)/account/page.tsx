import Button from '@/components/ui/button';
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserAttributes } from '@supabase/supabase-js';
import classNames from 'classnames';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase';

export interface AccountForm extends UserAttributes {
  //password: string;
}

export default async function AccountPage() {
  return (<></>)
}
/*
export default async function AccountPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const [state, setState] = useState({
    error: undefined,
    //mode: 'sign-in',
    isLoading: false,
  });
  const event = await getEvent(params.id);

  if (event === null || event.status === 'internal') {
    notFound();
  }

  const items = await getItems({ eventId: event.id, status: 'published' })


  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<AccountForm>({
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<AccountForm> = async (user) => {
    try {
      setState(state => ({ ...state, isLoading: true }))
      if (state.mode === 'sign-in') {
        await handleSignIn(data);
      } else if (state.mode === 'sign-up') {
        await signUp(data);
      } else {
        throw new Error('Operazione non gestita');
      }

      //setState(state => ({ ...state, isLoading: true, error: undefined }))
      const { data, error } = await supabase.auth.updateUser(user)

      if (error) {
        throw new Error(error.message);
      }


      // dovranno pushare a confirm apassowrd
      // router.push(data.user.app_metadata.role ? '/admin' : '/account');
      // router.push(data.user?.app_metadata.role ? '/admin' : '/');
      // CONFERMA MAIL
      // router.refresh();

      return data;
      // router.refresh();
    } catch (e: any) {
      //setState(state => ({ ...state, error: e.message }))
      return;
    } finally {
      //setState(state => ({ ...state, isLoading: false }))
    }
  }


  return (
    <section className="page">
      <div className="w-full lg:w-1/3 mx-auto">
        <form className="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

          <h3>Cambio password</h3>
          <div>
            <label className="label" htmlFor="password">Nuova password</label>
            <input
              type="text"
              className={classNames("field", { "invalid": errors.password })}
              {...register("password")}
            />
            {errors.password && <small className="validation-error">{errors.password.message}</small>}
          </div>

          <Button type="submit" className="col-span-1 lg:col-span-2 mt-4 bg-blue-200 hover:opacity-80 font-bold py-2 px-4 rounded" isLoading={state.isLoading}>
            Salva
          </Button>

        </form>
      </div>
    </section>
  )
}*/
