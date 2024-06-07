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
    const [checkedPassword, setCheckedPassword] = useState('');
    const navigator = useNavigate();

    const auth = getAuth(app);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (name && email && password && checkedPassword) {
            if (password === checkedPassword) {
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
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } else {
            alert('* 모든 항목은 필수 항목입니다.');
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
                        />
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
                        />
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
                        />
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
                            value={checkedPassword}
                            onChange={(e) => setCheckedPassword(e.target.value)}
                        />
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
