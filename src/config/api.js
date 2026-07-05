const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const API = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  requestResetPassword: `${BASE_URL}/auth/request-reset-password`,
  resetPassword: `${BASE_URL}/auth/reset-password`,
  profile: `${BASE_URL}/users/profile`,
  updateProgress: `${BASE_URL}/users/save-quiz`,
  leaderboard: `${BASE_URL}/users/leaderboard`,
  saveQuiz: `${BASE_URL}/quiz/save-quiz`,
  studyHistory: `${BASE_URL}/quiz/study-history`,
  claimAchievement: `${BASE_URL}/achievements/claim-achievement`,
  forumPosts: `${BASE_URL}/forum/posts`,
  forumReplies: `${BASE_URL}/forum/replies`,
};