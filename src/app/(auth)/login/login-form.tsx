'use server'
import EmailLoginForm from "@components/ui/login-buttons/email";
import FacebookLoginButton from "@components/ui/login-buttons/facebook";
import GoogleLoginButton from "@components/ui/login-buttons/google";
import { handleSubmit, loginWithPassword, loginWithGoogle } from "./login-actions";

export default async function LoginForm({
  className
}: {
  className?: string
}) {

  return (
    <div className={className}>
      <form noValidate>
      <div className="flex flex-col" id="social-login">
        <span className="text-sm m-auto uppercase">Accedi con i tuoi account preferiti</span>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
          {/*<StravaButton formAction={loginWithStrava} className="lg:col-span-2" />*/}
          <GoogleLoginButton formAction={loginWithGoogle} />
        </div>
      </div>
      <EmailLoginForm formAction={loginWithPassword} />
      </form>
    </div>
  )

  /*return (
    <div className={className}>
      <div className="flex flex-col" id="social-login">
        <span className="text-sm m-auto uppercase">Accedi con i tuoi account preferiti</span>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
          <GoogleButton />
          <FacebookButton />
        </div>
      </div>
      <EmailLoginForm />
    </div>
  )*/
}

// da tradurre
// Invalid login credentials
