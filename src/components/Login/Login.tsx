import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

import { supabase } from '../../api/supabaseclient';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { userActions } from '../../store/user/user';
import { Register } from '../Register/Register';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Инициализация useNavigate
  const userState = useAppSelector(state => state.userReducer);

  const handleLogin = () => {
    setError('');

    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          dispatch(userActions.setUser(data.user));
          dispatch(userActions.setAccessToken(data.session.access_token));
        }
      });
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (userState.user_accessToken) {
        const { data, error } = await supabase.auth.getUser(userState.user_accessToken);
        if (!error) {
          dispatch(userActions.setAuth(true));
          dispatch(userActions.setUser(data.user));
        } else {
          navigate('/');
        }
      }
    };
    checkAuth();
  }, [dispatch, navigate, userState.user_accessToken]);
  useEffect(() => {
    if (userState.user?.confirmed_at) {
      navigate('/editor'); // Используем navigate для редиректа
    }
  }, [userState, navigate]);

  return (
    <div>
      Login
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      or Register
      <Register />
    </div>
  );
};
