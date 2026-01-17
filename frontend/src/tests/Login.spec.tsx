import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../features/auth/Login";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../hooks/useAuth";

const queryClient = new QueryClient();

test("renders login form", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
  expect(screen.getByText("Ingresar")).toBeInTheDocument();
});