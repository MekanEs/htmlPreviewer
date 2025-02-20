import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseclient";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { useAppDispatch } from "../../store/store";
import { userActions } from "../../store/user/user";
import { Register } from "../Register/Register";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Инициализация useNavigate

    const handleLogin = async () => {
        setError(""); // Очистка ошибок

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            setUser(data.user);
            dispatch(userActions.setUser(data.user));
        }
    };

    useEffect(() => {
        if (user && user.confirmed_at) {
            navigate('/editor'); // Используем navigate для редиректа
        }
    }, [user, navigate]);

    return (
        <div>
            Login
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            or Register
            <Register />
        </div>
    );
}
