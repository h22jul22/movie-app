import { useNavigate } from 'react-router-dom';
import { VscMenu } from 'react-icons/vsc';

const style =
    'bg-transparent border-2 border-sky-600 rounded-md p-1 w-20 text-center text-sm cursor-pointer hover:bg-sky-600 hover:text-slate-100';

const Nav = () => {
    const navigator = useNavigate();

    const moveToMain = () => {
        navigator('/');
    };

    const moveToSignUp = () => {
        navigator('/signUp');
    };

    const moveToLogin = () => {
        navigator('/login');
    };

    return (
        <nav className='w-full h-14 bg-[#f9f9f9] fixed top-0'>
            <div className='flex justify-between items-center h-full mx-8'>
                <div className='flex items-center gap-1' onClick={moveToMain}>
                    <a className='w-6 h-6 sm:hidden'>
                        <img className='w-full h-full cursor-pointer' src='/catLogo.svg' />
                    </a>
                    <span className='text-lg font-bold cursor-pointer sm:hidden'>CAT MOVIE</span>
                    <VscMenu className='hidden cursor-pointer sm:inline-block sm:font-bold sm:text-2xl' />
                </div>
                <div className='flex items-center gap-3'>
                    <a className={style} onClick={moveToSignUp}>
                        회원가입
                    </a>
                    <a className={style} onClick={moveToLogin}>
                        로그인
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
