import { useState, FormEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Call login API
    console.log({ email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full border p-2 rounded"
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full border p-2 rounded"
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
