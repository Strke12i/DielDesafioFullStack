import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import './_Forms.scss';
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const { onLogin } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await onLogin!(email, password);
            if (res.error) {
                throw new Error(res.error);
            }

            toast.success('Logged in successfully');
            navigate('/');
            
        }
        catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    }

    return (
        <div className="login">
            
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form">
            <label>
                Email
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    placeholder="johndoe@mail.com"
                />
            </label>
            <label>
                Password
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                />
                
            </label>
            <button type="submit">
                <span>Login</span>
            </button>
        </form>
        <span>Don't have an account? <a href="/register">Register</a></span>
        <Toaster position="top-center" reverseOrder={false} />
        </div>
    )
}

export const SignupForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const navigate = useNavigate();

    const { onRegister } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();        
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            const res = await onRegister!(email, password, name);
            if (res.error) {
                throw new Error(res.error);
            }

            toast.success('Registered successfully');
            navigate('/login');
        }catch (error) {
            toast.error('An error occurred. Please try again.' + error);
        }
    }

    return (
        <div className="signup">
        
        <h1>Register</h1>

        <form onSubmit={handleSubmit} className="form">
            <label>
                Name
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Email
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Confirm Password
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button type="submit">
                <span>Register</span>
            </button>

           

        </form>
        <span>Already have an account? <a href="/login">Login</a></span>
        <Toaster position="top-center" reverseOrder={false} />
        </div>
    )


}