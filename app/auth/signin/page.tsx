'use client';
import InputController from '@/components/InputController';
import { keyStorage } from '@/const/keyStorage';
import { IFormLogin } from '@/interfaces/auth';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toastError } from '@/utils/toast';
const SignIn = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit = handleSubmit((data) => {
    authService
      .login(data)
      .then(async (accessToken) => {
        await localStorage.setItem(keyStorage.accessToken, accessToken);
        router.push('/home/lectures');
      })
      .catch((err) => {
        toastError('username or password not correct');
      });
  });

  return (
    <form onSubmit={onSubmit} className="w-[480px] rounded-[5px] bg-greyCt p-8">
      <InputController
        className="!bg-greyCt"
        name="username"
        control={control}
        type="text"
        label="Username"
        rules={{
          required: 'Username is required',
        }}
        error={errors.username?.message}
      />
      <InputController
        className="!bg-greyCt"
        name="password"
        control={control}
        type="password"
        rules={{
          required: 'Password is required',
        }}
        label="Password"
        error={errors.password?.message}
      />

      <button
        type="submit"
        className="text-md mt-4 w-full cursor-pointer rounded-[3px] bg-primary py-3 px-3 font-medium text-white transition-all hover:tracking-[2px]"
      >
        Login
      </button>
    </form>
  );
};

export default SignIn;
