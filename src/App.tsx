import Onboarding from "./components/Onboarding";
import useStore from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Table from "./components/Table";

const queryClient = new QueryClient();

function App() {
  const { apiKey } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Onboarding open={!apiKey} />
      <div className="container mx-auto p-4">
        <Table />
      </div>
    </QueryClientProvider>
  )
}

export default App
