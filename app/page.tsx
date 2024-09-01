import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

export default function App() {
  return (
    <div className="flex flex-col  h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
