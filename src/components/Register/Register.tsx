import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseclient";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { useAppDispatch } from "../../store/store";
import { userActions } from "../../store/user/user";
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    // const isValidEmail = (email: string) => {
    //     return /^[a-zA-Z0-9._%+-]+@jetmail\.cc$/.test(email);
    // };


    const handleRegistration = async () => {
        setError(""); // Очистка ошибок


        // if (!isValidEmail(email)) {
        //     setError("Используйте email с доменом @jetmail.cc");
        //     return;
        // }


        const { data, error } = await supabase.auth.signUp({
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
        if (user) {
            setMessage('Проверьте вашу почту и подтвердите email!')
        }
    }, [user, navigate]);

    return (
        <div>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
                variant="primary"
                onClick={handleRegistration}
            >
                Register
            </Button>
            {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    );
}
