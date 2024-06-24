import './styles/global.css';
import { Input } from "@/components/ui/input";

export function App() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-zinc-100">
      <div className='w-full max-w-2xl bg-white shadow rounded p-8'>
        <h1 className='text-2xl font-bold text-center'>Registration</h1>
        <form action=''>
          <div className=''>
            <div>
              <Input />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}