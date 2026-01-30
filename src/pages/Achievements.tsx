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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading achievements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Achievements</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            Make Purchase
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current Badge</h2>
          <div className="flex items-center justify-between bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg p-4">
            <div>
              <p className="text-2xl font-bold text-amber-800">{data.current_badge}</p>
              <p className="text-sm text-amber-600 mt-1">Your current level</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Next: {data.next_badge}</p>
              <p className="text-xs text-gray-500 mt-1">
                ₦{data.remaining_to_unlock_next_badge.toLocaleString()} to unlock
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Unlocked Achievements</h2>
          {data.unlocked_achievements.length > 0 ? (
            <div className="space-y-2">
              {data.unlocked_achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <p className="text-green-800 font-medium">{achievement}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No achievements unlocked yet</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Next Available Achievements</h2>
          {data.next_available_achievements.length > 0 ? (
            <div className="space-y-2">
              {data.next_available_achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-lg">○</span>
                  </div>
                  <p className="text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No more achievements available</p>
          )}
        </div>
      </div>
    </div>
  );
}
