import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makePurchase, resetPurchase } from '../store/slices/purchaseSlice';
import type { AppDispatch, RootState } from '../store/store';

export default function Purchase() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state: RootState) => state.purchase);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(makePurchase({ email, amount }));
  };

  const handleViewAchievements = () => {
    dispatch(resetPurchase());
    navigate(`/achievements/${email}`);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="bg-slate-900 text-white p-8 lg:p-16 flex flex-col justify-center min-h-screen">
        <div className="max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Purchase & Earn</h2>
          <p className="text-slate-300 text-lg mb-16 leading-relaxed">
            Track your achievements and unlock exclusive rewards with every purchase
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-base font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Enter Details</h3>
                <p className="text-slate-400">Provide your email and purchase amount</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-base font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Complete Purchase</h3>
                <p className="text-slate-400">Submit your transaction securely</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-base font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Track Achievements</h3>
                <p className="text-slate-400">Watch your badges and milestones grow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 lg:p-16 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg">
          {success ? (
            <div className="text-center flex flex-col items-center gap-6 w-full">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Purchase Successful!</h2>
                <p className="text-gray-600 text-lg">Your transaction has been completed</p>
              </div>
              <button
                onClick={handleViewAchievements}
                className="w-full h-12 bg-slate-900 text-white py-4 px-6 rounded-lg hover:bg-slate-800 transition-colors font-medium text-lg cursor-pointer"
              >
                View My Achievements
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-5'>
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900">Complete Purchase</h1>
                <p className="text-gray-600 text-lg">Fill in the details below to proceed</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-3">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all placeholder:text-gray-400"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-lg font-semibold text-gray-900 mb-3">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
                    </span>
                    <input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min="1"
                      step="any"
                      className="w-full h-12 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all placeholder:text-gray-400"
                      placeholder="1,000"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-base text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-slate-900 text-white py-5 px-6 rounded-lg hover:bg-slate-800 transition-all duration-200 font-semibold text-lg disabled:opacity-60 disabled:cursor-not-allowed mt-8 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Submit Purchase'
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
