import React, { useState } from 'react';
import Image from 'next/image';

import { Button, Checkbox, EButtonType, EFieldTypes, Field, Loader } from '@my-project/ui';
import { useAuthApi } from '@my-project/ui-requests';
import { useValidation, useForm } from '@my-project/ui-hooks';
import {
    EValidationTypes,
    IValidationDataItem,
    TUseValidation,
    TUseForm,
    IAuthApiRequestPayload,
} from '@my-project/ui-types';

import { useAuth } from '../../hooks/useAuth';

import { BASE_ASSETS_PATH } from '../../constants/paths.constants';

import styles from './Login.module.scss';

export const Login = () => {
    const { login } = useAuth();
    const loginApi = useAuthApi();

    const initialState = {
        email: '',
        password: '',
    };

    const useValidationTyped = useValidation as unknown as TUseValidation<IAuthApiRequestPayload>;
    const useFormTyped = useForm as unknown as TUseForm<IAuthApiRequestPayload>;

    const validationData: IValidationDataItem<IAuthApiRequestPayload>[] = [
        { name: 'email', required: true, validationType: EValidationTypes.email },
        { name: 'password', required: true },
    ];

    const { errorFields, validateForm } = useValidationTyped(validationData);

    const [keepLogin, setKeepLogin] = useState<boolean>(true);

    const { formData, handleFieldChange, handleSubmit } = useFormTyped(
        initialState,
        loginUserCallback,
        validateForm,
    );

    async function loginUserCallback() {
        if (formData) {
            login({
                email: formData.email,
                password: formData.password,
            });
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <p className={styles.valid}>Valid. Please wait a moment.</p>
                <p className={styles.error}>Error. Please enter correct Username &amp; password.</p>
                <p className={styles.infoText}>
                    © my-project
                </p>

                <div className={styles.logo}>
                    <div className={styles.logoImage}>
                        <Image
                            src={`${BASE_ASSETS_PATH.IMAGES}/logo-mobile.png`}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <p className={styles.logoText}>my-project</p>
                </div>

                <form
                    className={styles.loginForm}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    style={{ display: loginApi.isLoading ? 'none' : 'block' }}
                >
                    <div className={styles.loginFormLogo}>
                        <Image src={`${BASE_ASSETS_PATH.IMAGES}/logo.png`} layout="fill" objectFit="contain" />
                    </div>

                    <p className={styles.logoTextMobile}>my-project</p>

                    <div className={styles.loginFormContent}>
                        <p className={styles.loginContentHeader}>Web Portal Login</p>

                        <div className={styles.loginContentInner}>
                            <div className={styles.loginFormField}>
                                <Field
                                    value={formData!.email}
                                    placeholder="email"
                                    name="email"
                                    id="email"
                                    handleChange={handleFieldChange}
                                    label="Username:"
                                    isColumn={true}
                                    type={EFieldTypes.fourthly}
                                    error={errorFields.email}
                                />
                            </div>
                            <div className={styles.loginFormField}>
                                <Field
                                    value={formData!.password}
                                    placeholder="password"
                                    name="password"
                                    id="password"
                                    handleChange={handleFieldChange}
                                    label="Password:"
                                    isColumn={true}
                                    type={EFieldTypes.fourthly}
                                    fieldType="password"
                                    error={errorFields.password}
                                />
                            </div>
                            <div className={styles.loginFormCheckbox}>
                                <Checkbox
                                    id={'1'}
                                    checked={keepLogin}
                                    handleChange={() => setKeepLogin(!keepLogin)}
                                    label="Keep me logged in"
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                {loginApi.isLoading && <Loader size="1.5rem" color="#0b4b97" />}
                                <Button
                                    type={EButtonType.secondary}
                                    text="Log In"
                                    buttonType="submit"
                                    maxWidth="100%"
                                    className={styles.loginButton}
                                />
                            </div>
                            <p className={styles.forgotPassword}>Forgot password?</p>
                        </div>
                    </div>
                </form>

                <div className={styles.language}></div>
            </div>
        </section>
    );
};
