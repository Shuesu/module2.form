import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationFormSchema } from './registration-form-schema';
import { Field } from './components';
import styles from './app.module.css';

export const App = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { touchedFields, isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      passcheck: '',
    },
    resolver: yupResolver(registrationFormSchema),
    mode: 'onTouched',
  });

  const submitButtonRef = useRef(null);

  const onSubmit = ({ email, password }) => {
    console.log({ email, password });
  };

  useEffect(() => {
    if (isValid) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          type="text"
          placeholder="Почта..."
          error={errors.email?.message}
          {...register('email')}
        />
        <Field
          type="password"
          placeholder="Пароль..."
          error={errors.password?.message}
          {...register('password', {
            onChange: () => touchedFields.passcheck && trigger('passcheck'),
          })}
        />
        <Field
          type="password"
          placeholder="Повтор пароля..."
          error={errors.passcheck?.message}
          {...register('passcheck')}
        />
        <button type="submit" disabled={!isValid} ref={submitButtonRef}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
