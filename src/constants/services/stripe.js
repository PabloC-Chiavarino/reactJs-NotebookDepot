import { loadStripe } from '@stripe/stripe-js'

const pk = import.meta.env.VITE_STRIPE_PUBLIC_KEY

if (!pk) {
  throw new Error('Stripe public key is not defined in environment variables')
}

export const stripePromise = loadStripe(pk)
