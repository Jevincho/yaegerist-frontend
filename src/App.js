import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FormulaBelajar from './components/FormulaBelajar';
import ProdukKami from './components/ProdukKami';
import LoginPage from './components/LoginPage';
import FeatureLayout from './components/FeatureLayout';
import QuizSystem from './components/QuizSystem';
import StudentDashboard from './components/StudentDashboard';
import StudyTimer from './components/StudyTimer';
import FlashcardSystem from './components/FlashcardSystem';
import DiscussionForum from './components/DiscussionForum';
import AchievementSystem from './components/AchievementSystem';
import StudyRecommendation from './components/StudyRecommendation';
import { API } from './config/api';
import './styles/App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [studentData, setStudentData] = useState({
    name: 'Guest User',
    level: 'Pemula',
    achievements: [],
    studyHistory: [],
    weakAreas: []
  });

  const updateStudentData = (newData) => {
    setStudentData(prev => ({
      ...prev,
      ...newData
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch(API.profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(profile => {
        fetch(API.studyHistory, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(history => {
            setStudentData({
              name: profile.name || "Guest User",
              level: "Pemula",
              achievements: [],
              weakAreas: [],
              studyHistory: history
            });
          });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<HomePage />} />
        
      
        <Route path="/formula-belajar" element={<FormulaBelajar />} />
        
        
        <Route path="/produk-kami" element={<ProdukKami />} />
        
        
        <Route path="/login" element={<LoginPage />} />
        
        
        <Route path="/dashboard" element={
          <FeatureLayout studentData={studentData}>
            <StudentDashboard 
              studentData={studentData} 
              updateStudentData={updateStudentData}
            />
          </FeatureLayout>
        } />
        
        
        <Route path="/quiz" element={
          <FeatureLayout studentData={studentData}>
            <QuizSystem 
              studentData={studentData} 
              updateStudentData={updateStudentData}
            />
          </FeatureLayout>
        } />
        
        
        <Route path="/flashcards" element={
          <FeatureLayout studentData={studentData}>
            <FlashcardSystem 
              studentData={studentData} 
              updateStudentData={updateStudentData}
            />
          </FeatureLayout>
        } />
        
        
        <Route path="/timer" element={
          <FeatureLayout studentData={studentData}>
            <StudyTimer 
              studentData={studentData} 
              updateStudentData={updateStudentData}
            />
          </FeatureLayout>
        } />
        
        
        <Route path="/forum" element={
          <FeatureLayout studentData={studentData}>
            <DiscussionForum 
              studentData={studentData}
            />
          </FeatureLayout>
        } />
        

        <Route path="/achievements" element={
          <FeatureLayout studentData={studentData}>
            <AchievementSystem 
              studentData={studentData}
            />
          </FeatureLayout>
        } />
        
        
        <Route path="/recommendations" element={
          <FeatureLayout studentData={studentData}>
            <StudyRecommendation 
              studentData={studentData}
            />
          </FeatureLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;