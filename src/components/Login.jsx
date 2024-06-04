const liStyle = 'flex flex-col gap-2 items-center';
const labelStyle = 'self-start ml-0.5';
const inputStyle = 'h-10 p-2 w-full border border-solid border-slate-300 rounded-md text-sm';

const Login = () => {
    return (
        <form className='w-96 absolute top-[14%] left-1/2 transform -translate-x-1/2 -translate-y-[14%]'>
            <fieldset>
                <legend className='my-8 text-lg font-bold text-center'>CAT MOVIE</legend>
                <ul className='flex flex-col gap-4'>
                    <li className={liStyle}>
                        <label className={labelStyle} htmlFor='username'>
                            아이디 또는 이메일
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
                </ul>
                <button
                    className='mt-10 w-full h-12 text-lg bg-sky-600 text-slate-100 rounded-md hover:bg-sky-500'
                    type='submit'
                    name='submit'>
                    로그인
                </button>
            </fieldset>
        </form>
    );
};

export default Login;
