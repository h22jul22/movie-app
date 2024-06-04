const liStyle = 'flex flex-col gap-2 items-center';
const labelStyle = 'self-start ml-0.5';
const inputStyle = 'h-10 p-2 w-full border border-solid border-slate-300 rounded-md text-sm';

const SignUp = () => {
    return (
        <form className='w-96 absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-[20%]'>
            <fieldset>
                <legend className='my-8 text-lg font-bold text-center'>CAT MOVIE</legend>
                <ul className='flex flex-col gap-6'>
                    <li className={liStyle}>
                        <label className={labelStyle} htmlFor='username'>
                            아이디
                        </label>
                        <input
                            className={inputStyle}
                            type='text'
                            name='username'
                            id='username'
                            required
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
                        />
                    </li>
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
