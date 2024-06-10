import { useState } from 'react';
import app from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const liStyle = 'flex flex-col gap-2 items-center';
const labelStyle = 'self-start ml-0.5';
const inputStyle = 'h-10 p-2 w-full border border-solid border-slate-300 rounded-md text-sm';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigator = useNavigate();
    const auth = getAuth(app);

    const nameRegex = /.+/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    const validateName = (name) => {
        if (!nameRegex.test(name)) {
            setNameError('이름을 입력해주세요.');
        } else {
            setNameError('');
        }
    };

    const validateEmail = (email) => {
        if (!emailRegex.test(email)) {
            setEmailError('정확한 이메일 주소를 입력해주세요.');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (password) => {
        if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호는 최소 8자리 이상이어야됩니다.');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        validateEmail(email);
        validatePassword(password);
        validateConfirmPassword(password, confirmPassword);

        if (name && email && password && confirmPassword) {
            if (
                emailRegex.test(email) &&
                passwordRegex.test(password) &&
                password === confirmPassword
            ) {
                await createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        console.log('userData', userCredential.user);
                        alert('회원가입이 완료되었습니다!');
                        navigator('/login');
                    })
                    .catch((error) => {
                        console.log(error.code, error.message);
                        alert(error.message);
                    });
            }
        }
    };

    return (
        <form onSubmit={handleSignUp} className='mx-auto max-w-96 sm:!w-64'>
            <fieldset>
                <legend className='mb-2 text-lg font-bold text-center'>환영합니다!</legend>
                <p className='mb-8 text-lg font-bold text-center sm:text-sm'>
                    회원가입에 필요한 모든 항목을 입력해주세요.
                </p>
                <ul className='flex flex-col gap-6'>
                    <li className={liStyle}>
                        <label className={labelStyle} htmlFor='name'>
                            이름
                        </label>
                        <input
                            className={inputStyle}
                            type='text'
                            name='name'
                            id='name'
                            required
                            autoComplete='off'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => validateName(name)}
                        />
                        {emailError && <div className='text-[red]'>{nameError}</div>}
                    </li>
                    <li className={liStyle}>
                        <label className={labelStyle} htmlFor='email'>
                            이메일 주소
                        </label>
                        <input
                            className={inputStyle}
                            type='email'
                            name='email'
                            id='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => validateEmail(email)}
                        />
                        {emailError && <div className='text-[red]'>{emailError}</div>}
                    </li>
                    <li className={liStyle}>
                        <label className={labelStyle} htmlFor='pw1'>
                            비밀번호
                        </label>
                        <input
                            className={inputStyle}
                            type='password'
                            name='pw1'
                            id='pw1'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => validatePassword(password)}
                        />
                        {passwordError && <div className='text-[red]'>{passwordError}</div>}
                    </li>
                    <li className={liStyle}>
                        <label className={labelStyle} htmlFor='pw2'>
                            비밀번호 확인
                        </label>
                        <input
                            className={inputStyle}
                            type='password'
                            name='pw2'
                            id='pw2'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => validateConfirmPassword(password, confirmPassword)}
                        />
                        {confirmPasswordError && (
                            <div style={{ color: 'red' }}>{confirmPasswordError}</div>
                        )}
                    </li>
                </ul>
                <button
                    className='mt-10 w-full h-12 text-lg bg-sky-600 text-slate-100 rounded-md hover:bg-sky-500'
                    type='submit'
                    name='submit'>
                    가입하기
                </button>
            </fieldset>
        </form>
    );
};

export default SignUp;
