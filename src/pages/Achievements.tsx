import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAchievements } from '../store/slices/achievementsSlice';
import type { AppDispatch, RootState } from '../store/store';

export default function Achievements() {
  const { email } = useParams<{ email: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state: RootState) => state.achievements);

  useEffect(() => {
    if (email) {
      dispatch(fetchAchievements(email));
    }
  }, [email, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-slate-900 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-6 text-gray-600 text-lg">Loading your achievements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-slate-900 text-white py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors font-medium cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getBadgeColor = (badge: string) => {
    const colors = {
      Bronze: 'from-amber-600 to-amber-700',
      Silver: 'from-gray-400 to-gray-500',
      Gold: 'from-yellow-400 to-yellow-500',
      Platinum: 'from-cyan-400 to-cyan-600',
    };
    return colors[badge as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-8 lg:p-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Your Achievements</h1>
            <p className="text-gray-600 text-lg">Track your progress and milestones</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-slate-900 text-white h-12 py-3 px-10 rounded-lg hover:bg-slate-800 transition-colors font-medium cursor-pointer"
          >
            Make Purchase
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-900 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Current Badge</h2>
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 bg-gradient-to-br ${getBadgeColor(data.current_badge)} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-2xl font-bold text-white">{data.current_badge[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-3xl font-bold mb-2">{data.current_badge}</p>
                <p className="text-slate-300 text-sm">Your current level</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Badge</h2>
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 bg-gradient-to-br ${getBadgeColor(data.next_badge)} rounded-full flex items-center justify-center shadow-lg opacity-50`}>
                <span className="text-2xl font-bold text-white">{data.next_badge[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-3xl font-bold text-gray-900 mb-2">{data.next_badge}</p>
                <p className="text-gray-600 text-lg font-semibold">
                  ₦{data.remaining_to_unlock_next_badge.toLocaleString()} to unlock
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Unlocked Achievements</h2>
            {data.unlocked_achievements.length > 0 ? (
              <div className="space-y-4">
                {data.unlocked_achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-green-50 border-2 border-green-500 rounded-lg p-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-900 font-semibold text-lg">{achievement}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-lg">No achievements unlocked yet</p>
            )}
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Available</h2>
            {data.next_available_achievements.length > 0 ? (
              <div className="space-y-4">
                {data.next_available_achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-gray-50 border-2 border-gray-300 rounded-lg p-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xl font-bold">○</span>
                    </div>
                    <p className="text-gray-700 font-semibold text-lg">{achievement}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-lg">All achievements unlocked!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
