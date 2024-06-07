import { useLocation, useNavigate } from 'react-router-dom';
import { VscMenu, VscSearch } from 'react-icons/vsc';
import { useContext, useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { VscSmiley } from 'react-icons/vsc';
import { UserContext } from '../context/UserContext';
import { TiPower, TiHeartFullOutline, TiArrowSortedUp } from 'react-icons/ti';

const style =
    'bg-transparent border-2 border-sky-600 rounded-md p-1 w-[4.5rem] sm:!w-14 text-center text-sm sm:!text-xs cursor-pointer hover:bg-sky-600 hover:text-slate-100';

const Nav = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigator = useNavigate();
    const { pathname } = useLocation();

    const auth = getAuth();
    const { userData, setUserData } = useContext(UserContext);

    //useNavigate 변수는 첫번째 인자로 이동시킬 페이지의 주소를 넣는다
    const moveToMain = () => {
        navigator('/');
    };

    const moveToSignUp = () => {
        navigator('/signUp');
    };

    const moveToLogin = () => {
        navigator('/login');
    };

    const moveToLikeList = () => {
        navigator('/likeList');
    };

    const onSearchHandler = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value.trim().length !== 0) {
            navigator(`/search?query=${e.target.value}`);
        } else {
            navigator('/');
        }
    };

    const handleLogOut = async () => {
        await signOut(auth)
            .then(() => {
                setUserData(null);
                window.localStorage.removeItem('userData');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && pathname === '/signUp') {
                navigator('/');
            }
            if (userData && pathname === '/logIn') {
                navigator('/');
            }
            if (!userData && pathname === '/likeList') {
                navigator('/');
            }
        });
    }, [auth, navigator, userData, pathname]);

    return (
        <nav className='w-full h-14 bg-[#f9f9f9] fixed top-0 z-[9999]'>
            <div className='flex justify-between items-center h-full mx-8 sm:!mx-4'>
                <div className='flex items-center gap-1' onClick={moveToMain}>
                    <a className='w-7 h-7 sm:hidden'>
                        <img className='w-full h-full cursor-pointer' src='/catLogo.svg' />
                    </a>
                    <span className='text-lg font-bold cursor-pointer sm:hidden'>CAT MOVIE</span>
                    <VscMenu className='hidden cursor-pointer sm:inline-block sm:font-bold sm:text-2xl' />
                </div>
                {(pathname === '/' || pathname === '/search') && (
                    <div className='flex items-center h-8 w-72 relative sm:!w-32'>
                        <VscSearch className='absolute left-4' />
                        <input
                            className='h-full w-full pl-9 pr-4 rounded-3xl shadow-md outline-none border border-slate-100 focus:shadow-xl'
                            type='text'
                            name='search'
                            autoComplete='off'
                            value={searchValue}
                            onChange={onSearchHandler}
                        />
                    </div>
                )}
                {userData ? (
                    <div className='group/item relative h-10 w-10 flex items-center justify-center'>
                        {userData.photoURL ? (
                            <img
                                className='rounded-full cursor-pointer'
                                src={userData.photoURL}
                                alt={userData.displayName}
                            />
                        ) : (
                            <VscSmiley className='h-full w-full cursor-pointer' />
                        )}
                        <div className=''>
                            <TiArrowSortedUp className='invisible group-hover/item:visible absolute top-[35px] right-2 text-2xl opacity-90 z-10 font-semibold' />
                            <div className='invisible group-hover/item:visible absolute flex flex-col gap-3 px-3 py-4 w-[130px] top-[49px] opacity-90 z-10 font-semibold shadow-lg shadow-black tracking-wide right-0 bg-black text-white text-center rounded-sm'>
                                <span
                                    className='flex items-center cursor-pointer'
                                    onClick={moveToLikeList}>
                                    <TiHeartFullOutline className='text-xl w-8 mt-0.5 opacity-80' />
                                    관심목록
                                </span>
                                <span
                                    className='flex items-center cursor-pointer'
                                    onClick={handleLogOut}>
                                    <TiPower className='text-xl w-8 mt-0.5 opacity-80' />
                                    로그아웃
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-3 sm:gap-2'>
                        <a className={style} onClick={moveToSignUp}>
                            회원가입
                        </a>
                        <a className={style} onClick={moveToLogin}>
                            로그인
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
