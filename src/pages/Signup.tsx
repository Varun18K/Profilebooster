import { useState, FormEvent } from "react";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    // TODO: Call signup API
    console.log({ name, email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full border p-2 rounded"
          value={name} 
          onChange={(e)=>setName(e.target.value)} 
          required 
        />
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
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="w-full border p-2 rounded"
          value={confirmPassword} 
          onChange={(e)=>setConfirmPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
