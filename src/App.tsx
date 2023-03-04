import Onboarding from "./components/Onboarding";
import useStore from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const { apiKey } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Onboarding open={!apiKey} />
    </QueryClientProvider>
  )
}

export default App
