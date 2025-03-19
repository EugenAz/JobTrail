import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthenticator } from './api/use-authenticator';
import { useNavigate } from 'react-router';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { useAuth } from '@/utils/auth.context';
import { LAST_VISITED_ROUTE_KEY } from '@/utils/constants';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginFormData = {
  username: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  username: yup.string().max(50).required('username is required'),
  password: yup.string().max(20).required('password is required'),
});

export const Login = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const [login, { loading, error }] = useAuthenticator();

  // useEffect(() => {
  //   if (import.meta.env.VITE_ENVIRONMENT === 'development') {
  //     onSubmit({
  //       username: import.meta.env.VITE_TEST_USERNAME,
  //       password: import.meta.env.VITE_TEST_PASSWORD,
  //     });
  //   }
  // }, []);

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    username,
    password,
  }) => {
    try {
      const response = await login({
        variables: {
          loginInput: {
            username,
            password,
          },
        },
      });

      setAuthToken(response.data.login.access_token);
      const lastVisitedRoute = localStorage.getItem(LAST_VISITED_ROUTE_KEY);
      navigate(lastVisitedRoute || `/`);
    } catch (err) {
      console.error(err);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      {...register('username')}
                      id="username"
                      autoFocus
                      placeholder="Username"
                      required
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>

                    <Input
                      {...register('password')}
                      id="password"
                      placeholder="Password"
                      type="password"
                      required
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </LoadingErrorHandler>
  );
};
