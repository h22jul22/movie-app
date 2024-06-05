import { useLocation, useNavigate } from 'react-router-dom';
import { VscMenu } from 'react-icons/vsc';
import { VscSearch } from 'react-icons/vsc';
import { useState } from 'react';

const style =
    'bg-transparent border-2 border-sky-600 rounded-md p-1 w-20 text-center text-sm cursor-pointer hover:bg-sky-600 hover:text-slate-100';

const Nav = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigator = useNavigate();
    const { pathname } = useLocation();

    const moveToMain = () => {
        navigator('/');
    };

    const moveToSignUp = () => {
        navigator('/signUp');
    };

    const moveToLogin = () => {
        navigator('/login');
    };

    const onSearchHandler = (e) => {
        setSearchValue(e.target.value);
        navigator(`/search?query=${e.target.value}`);
        //useNavigate 변수는 첫번째 인자로 이동시킬 페이지의 주소를 넣는다
    };

    return (
        <nav className='w-full h-14 bg-[#f9f9f9] fixed top-0'>
            <div className='flex justify-between items-center h-full mx-8'>
                <div className='flex items-center gap-1' onClick={moveToMain}>
                    <a className='w-7 h-7 sm:hidden'>
                        <img className='w-full h-full cursor-pointer' src='/catLogo.svg' />
                    </a>
                    <span className='text-lg font-bold cursor-pointer sm:hidden'>CAT MOVIE</span>
                    <VscMenu className='hidden cursor-pointer sm:inline-block sm:font-bold sm:text-2xl' />
                </div>
                {(pathname === '/' || pathname === '/search') && (
                    <div className='flex items-center h-8 w-72 relative sm:hidden'>
                        <VscSearch className='absolute left-4' />
                        <input
                            className='h-full w-full pl-9 pr-4 rounded-3xl shadow-md outline-none border border-slate-100 focus:shadow-xl'
                            type='text'
                            name='search'
                            value={searchValue}
                            onChange={onSearchHandler}
                        />
                    </div>
                )}
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
