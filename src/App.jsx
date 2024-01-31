import { Routes, Route } from "react-router-dom";
import "./App.css";
import LiveScore from "./component/Live Score/LiveScore";
import Home from "./component/Home";
import Schedule from "./component/Schedule/Schedule";
import News from "./component/News/News";
import DetailedInterviews from "./component/News/DetailedInterviews";
import MenRankings from "./component/Rankings/Men/MenRankings";
import WomenRankings from "./component/Rankings/Women/WomenRankings";
import MatchDetail from "./component/Live Score/CurrentMatches/MatchDetail";
import FullScorecard from "./component/Live Score/CurrentMatches/FullScorecard";
import TermsConditions from "./component/Terms Conditions/TermsConditions";
import Help from "./component/Help/Help";
import About from "./component/About/About";
import PrivacyPolicies from "./component/Privacy Policies/PrivacyPolicies";
import SignUp from "./component/SignUp/SignUp";
import SignIn from "./component/SignIn/SignIn";
import UploadBlogs from "./component/UploadBlogs/UploadBlogs";
import Blogs from "./component/Blogs/Blogs";
import FullBlogs from "./component/Blogs/FullBlogs/FullBlogs";
import Disclaimer from "./component/Cookies/Disclaimer/Disclaimer";
import { useState } from "react";
import UploadVideos from "./component/UploadVideos/UploadVideos";
import GetVideos from "./component/GetVideos/GetVideos";
import Chatbot from "./component/Chatbot/Chatbot";

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Callback function to handle acceptance of the disclaimer
  const handleAcceptDisclaimer = () => {
    setDisclaimerAccepted(true);
  };
  return (
    <>
    {!disclaimerAccepted && (
        <Disclaimer onAccept={handleAcceptDisclaimer} />
      )}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<LiveScore />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/news" element={<News />} />
          <Route path="/rankings/men" element={<MenRankings />} />
          <Route path="/rankings/women" element={<WomenRankings />} />
          <Route path="/news/:newsId" element={<DetailedInterviews />} />
          <Route path="/match-details/:matchId" element={<MatchDetail />} />
          <Route
            path="/match-details/:matchId/full-scorecard"
            element={<FullScorecard />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy-policy" element={<PrivacyPolicies />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/upload-blogs" element={<UploadBlogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogId" element={<FullBlogs />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/upload-videos" element={<UploadVideos />} />
          <Route path="/videos" element={<GetVideos />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
