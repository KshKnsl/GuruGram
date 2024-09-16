import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import './App.css';

// Pages
import SignUpUser from './Pages/SignUpPage/User';
import SignUpMentor from './Pages/SignUpPage/Mentor';
import HomePage from './Pages/VideoCallPages/Home';
import RoomPage from './Pages/VideoCallPages/Room';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* <Route path="/call" element={<HomePage />} />
        
        <Route path="/room/:roomId" element={<RoomPage />} /> */}
        
        <Route path="/signUpUser" element={<SignUpUser />} />
        <Route path="/signUpMentor" element={<SignUpMentor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
