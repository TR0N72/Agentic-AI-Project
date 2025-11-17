import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./ProtectedRoute";
import Index from "./pages/Index";
import Exam from "./features/practice/Exam";
import ExamStart from "./features/practice/ExamStart";
import Pricing from "./pages/Pricing";
import Partnership from "./pages/Partnership";
import Contact from "./pages/Contact";
import SignUp from "./features/auth/SignUp";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import PracticeWithAI from "./features/practice/PracticeWithAI";
import MyProfile from "./pages/MyProfile";
import Reports from "./features/results/Reports";
import ProfileSettings from "./pages/ProfileSettings";
import PlaceholderPage from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import Chat from "./features/ai-chat/Chat";

const queryClient = new QueryClient();

const MainApp = () => {
  const { session } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (session && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [session, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/terms"
        element={
          <PlaceholderPage
            title="Terms & Privacy"
            description="Learn about our terms of service and privacy policy."
          />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam/start/:examId" element={<ExamStart />} />
        <Route path="/practice-with-ai" element={<PracticeWithAI />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route
          path="/support"
          element={
            <PlaceholderPage
              title="Support & Help"
              description="Find answers to your questions and get the help you need."
            />
          }
        />
        <Route path="/chat" element={<Chat />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
