import { signIn } from './actions'
import GoogleButton from './buttons/google'
import FacebookButton from './buttons/facebook';
import StravaButton from './buttons/strava';

export default function LoginForm({
  className
}: {
  className?: string
}) {
  return (
    <div className={className}>
      <form>
        {/*<div className="hidden" id="email-login">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={signIn}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </div>*/}
        <div className="flex flex-col" id="social-login">
          <span className="text-sm">Accedi con un click usando i tuoi account preferiti</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {/*<StravaButton formAction={loginWithStrava} className="lg:col-span-2" />*/}
            <GoogleButton />
            <FacebookButton />
          </div>
        </div>
      </form>
    </div>
  )
}

// da tradurre
// Invalid login credentials
