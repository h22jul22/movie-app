import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../firebase';
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import { UserContext } from '../context/UserContext';

const liStyle = 'flex flex-col gap-2 items-center';
const labelStyle = 'self-start ml-0.5';
const inputStyle = 'h-10 p-2 w-full border border-solid border-slate-300 rounded-md text-sm';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const { setUserData } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email && password) {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    localStorage.setItem('userData', JSON.stringify(userCredential.user));
                    setUserData(userCredential.user);
                    navigator('/');
                })
                .catch((error) => {
                    console.log(error.code, error.message);
                    switch (error.code) {
                        case 'auth/invalid-credential':
                            alert('사용자 정보가 올바르지 않습니다.');
                            break;
                        case 'auth/invalid-email':
                            alert('이메일 주소가 올바르지 않습니다.');
                            break;
                        case 'auth/too-many-requests':
                            alert(
                                '로그인 가능 횟수를 초과하여 일시적으로 이 계정에 접속할 수 없습니다.'
                            );
                            break;
                        default:
                            alert(error.message);
                    }
                });
        } else {
            alert('* 이메일과 비밀번호를 입력해주세요.');
        }
    };

    const handleAuth = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem('userData', JSON.stringify(result.user));
                setUserData(result.user);
                navigator('/');
            })
            .catch((error) => {
                console.log(error.code, error.message);
                alert(error.message);
            });
    };

    return (
        <section className='mx-auto flex flex-col gap-16 max-w-96 sm:!w-64'>
            <form onSubmit={handleLogin}>
                <fieldset>
                    <legend className='mb-2 text-lg font-bold text-center'>환영합니다!</legend>
                    <p className='mb-8 text-lg font-bold text-center sm:text-sm'>
                        이메일 또는 소셜 로그인을 이용해주세요.
                    </p>
                    <ul className='flex flex-col gap-4'>
                        <li className={liStyle}>
                            <label className={labelStyle} htmlFor='username'>
                                이메일
                            </label>
                            <input
                                className={inputStyle}
                                type='text'
                                name='username'
                                id='username'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </li>
                        <li className={liStyle}>
                            <label className={labelStyle} htmlFor='password'>
                                비밀번호
                            </label>
                            <input
                                className={inputStyle}
                                type='password'
                                name='password'
                                id='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </li>
                    </ul>
                    <button
                        className='mt-8 w-full h-12 text-lg bg-sky-600 text-slate-100 rounded-md hover:bg-sky-500'
                        type='submit'>
                        로그인
                    </button>
                </fieldset>
            </form>
            <form onSubmit={handleAuth}>
                <fieldset>
                    <legend className='mb-6 text-lg font-bold text-center'>소셜 로그인</legend>
                    <button
                        className='relative flex justify-center items-center gap-4 w-full h-12 pl-3 text-lg sm:text-sm rounded-md bg-gray-800 text-[#fff] hover:bg-gray-700'
                        type='submit'>
                        <img
                            className='w-[30px] absolute left-6 sm:left-4 sm:w-[25px]'
                            src='/Google__G__logo.svg.png'
                        />
                        Google 계정으로 로그인
                    </button>
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
