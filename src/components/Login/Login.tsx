import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseclient";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { useAppDispatch, useAppSelector } from "../../store/store";
import { userActions } from "../../store/user/user";
import { Register } from "../Register/Register";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Инициализация useNavigate
    const userState = useAppSelector((state) => state.userReducer)

    const handleLogin = async () => {
        setError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            dispatch(userActions.setUser(data.user));
            dispatch(userActions.setAccessToken(data.session.access_token));
        }
    };


    useEffect(() => {
        const checkAuth = async () => {
            if (userState.user_accessToken) {
                const { data, error } = await supabase.auth.getUser(userState.user_accessToken)
                if (!error) {
                    dispatch(userActions.setAuth(true))
                    dispatch(userActions.setUser(data.user))
                } else {
                    navigate('/')
                }
            }
        }
        checkAuth()
    }, [])
    useEffect(() => {

        if (userState.user && userState.user.confirmed_at) {
            navigate('/editor'); // Используем navigate для редиректа
        }
    }, [userState, navigate]);

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
