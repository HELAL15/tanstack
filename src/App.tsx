import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Setting from './Setting';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Table from './Table';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <Setting /> */}
        <Table />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
