import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthenticator } from './api/use-authenticator';
import { useNavigate } from 'react-router';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { useAuth } from '@/utils/auth.context';
import { LAST_VISITED_ROUTE_KEY } from '@/utils/constants';
import { FormContainer } from '../common/atoms/form-container';
import { FormControlRow } from '../common/atoms/form-control-row';
import { Button } from '../common/atoms/button';

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

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <FormControlRow
            htmlFor="username"
            label="User name"
            control={({ controlClassName }) => (
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      className={controlClassName}
                      autoFocus
                      id="username"
                      placeholder="User name"
                    />
                    {fieldState.error && <p>{fieldState.error.message}</p>}
                  </>
                )}
              />
            )}
          />
        </FormContainer>
        <FormContainer>
          <FormControlRow
            htmlFor="password"
            label="Password"
            control={({ controlClassName }) => (
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      className={controlClassName}
                      id="password"
                      placeholder="Password"
                      type="password"
                    />
                    {fieldState.error && <p>{fieldState.error.message}</p>}
                  </>
                )}
              />
            )}
          />
          <Button type="submit">Log In</Button>
        </FormContainer>
      </form>
    </LoadingErrorHandler>
  );
};
