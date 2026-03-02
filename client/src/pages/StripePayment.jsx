import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import api from '../api';

const stripePromise = loadStripe(
  'pk_test_51QkqKjLtI0CMESl4y2zPXGCtaeEssJHtV0bUb0t2Mfbkbq8EP8Ntk8RgyDaYSNxV5k1LrpLCbKW61PSAxxfPoSOW00oqN0Dy1j'
);

// ── Inner form (rendered inside <Elements>) ────────────────────────────
function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stripe will redirect here after 3DS if needed
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setMessage(`Payment of $${amount} successful! Thank you.`);
    } else {
      setMessage('Payment processing. Please wait…');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
        <p className="text-gray-600">{message}</p>
        <p className="mt-4 text-gray-500 text-sm">
          A confirmation will be sent to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {message && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
      >
        {loading ? 'Processing…' : `Pay $${parseFloat(amount).toFixed(2)}`}
      </button>
    </form>
  );
}

// ── Main page ──────────────────────────────────────────────────────────
export default function StripePayment() {
  const [step, setStep] = useState('form'); // 'form' | 'payment'
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const services = [
    'Tire Installation',
    'Tire Rotation',
    'Flat Tire Repair',
    'Tire Balancing',
    'TPMS Service',
    'Fleet Service',
    'Other',
  ];

  const handleCreateIntent = async (e) => {
    e.preventDefault();
    setError('');

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/stripe/create-payment-intent', {
        amount,
        description,
      });
      setClientSecret(data.clientSecret);
      setStep('payment');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initialize payment. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#dc2626',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      borderRadius: '8px',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
          <p className="text-gray-500 mt-1">XtremeMobileTire — Powered by Stripe</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {step === 'form' ? (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Payment Details</h2>
              <form onSubmit={handleCreateIntent} className="space-y-5">
                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service
                  </label>
                  <select
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  {loading ? 'Loading…' : 'Continue to Payment'}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Payment summary */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium text-gray-800">{description || 'XMT Service'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-red-600">${parseFloat(amount).toFixed(2)}</p>
                </div>
              </div>

              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance }}
              >
                <CheckoutForm amount={amount} />
              </Elements>

              <button
                onClick={() => { setStep('form'); setClientSecret(''); }}
                className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700 underline"
              >
                ← Change amount
              </button>
            </>
          )}
        </div>

        {/* Security badge */}
        <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd" />
          </svg>
          Payments are encrypted and secured by Stripe
        </p>
      </div>
    </div>
  );
}
