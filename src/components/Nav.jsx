import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../context/UserContext';
import { TiPower, TiHeartFullOutline, TiArrowSortedUp } from 'react-icons/ti';
import { BsSearch } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { UserSearchContext } from '../context/UserSearchContext';
import useOnClickOutside from '../hooks/useOnClickOutside';

const style =
    'bg-transparent border-2 border-sky-600 rounded-md p-1 w-[4.5rem] sm:!w-14 text-center text-sm sm:!text-xs cursor-pointer hover:bg-sky-600 hover:text-slate-100';

const Nav = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigator = useNavigate();
    const { pathname } = useLocation();
    const ref = useRef();

    const auth = getAuth();
    const { userData, setUserData } = useContext(UserContext);
    const { isClicked, setIsClicked } = useContext(UserSearchContext);

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

    const onSearchClicked = () => {
        setIsClicked(!isClicked);
    };

    useOnClickOutside(ref, () => {
        setIsClicked(false);
        setSearchValue('');
    });

    const onSearchHandler = (e) => {
        setSearchValue(e.target.value);
        if (e.target.value.trim().length !== 0) {
            navigator(`/search?query=${e.target.value}`);
        } else {
            navigator('/search');
        }
    };

    const handleLogOut = async () => {
        await signOut(auth)
            .then(() => {
                setUserData(null);
                navigator('/');
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
            if (!userData && (pathname === '/likeList' || pathname === '/search')) {
                navigator('/');
            }
        });
    }, [auth, navigator, userData, pathname]);

    return (
        <nav className='fixed top-0 left-0 w-[calc(100vw-17px)] h-14 bg-[#f9f9f9] z-[9999]'>
            <div className='flex justify-between items-center h-full mx-8 sm:!ml-4 sm:!mr-0'>
                <div className='flex items-center gap-1' onClick={moveToMain}>
                    <a className='w-7 h-7'>
                        <img className='w-full h-full cursor-pointer' src='/catLogo.svg' />
                    </a>
                    <span className='text-lg font-bold cursor-pointer sm:hidden'>CAT MOVIE</span>
                </div>
                {userData ? (
                    <div className='flex items-center gap-2 max-w-[272px]'>
                        <div className='flex items-center h-9 w-44'>
                            {isClicked && (
                                <input
                                    className='h-full w-full px-2 rounded-lg outline-none bg-[#f9f9f9] hover:bg-white border-2 border-sky-600 focus:border-sky-600'
                                    type='text'
                                    name='search'
                                    autoComplete='off'
                                    value={searchValue}
                                    onChange={onSearchHandler}
                                    ref={ref}
                                />
                            )}
                        </div>
                        <div className='h-10 w-10 text-center bg-sky-600 hover:bg-sky-500 text-white rounded-full cursor-pointer'>
                            <BsSearch
                                className='h-5 w-5 mx-auto mt-2.5'
                                onClick={onSearchClicked}
                            />
                        </div>
                        <div className='group/item relative h-10 w-10 flex items-center justify-center bg-[rgb(37,123,112)] hover:bg-[rgba(37,123,112,0.8)] text-white rounded-full '>
                            {userData.photoURL ? (
                                <img
                                    className='rounded-full cursor-pointer hover:opacity-80'
                                    src={userData.photoURL}
                                    alt={userData.displayName}
                                />
                            ) : (
                                <FiUser className='h-6 w-6 cursor-pointer' />
                            )}
                            <div className=''>
                                <TiArrowSortedUp className='invisible group-hover/item:visible absolute top-[34px] right-2 text-2xl opacity-90 z-10 font-semibold' />
                                <div className='invisible group-hover/item:visible absolute flex flex-col gap-3 px-3 py-4 w-[130px] top-[48px] opacity-90 z-10 font-semibold shadow-lg shadow-black tracking-wide right-0 bg-black text-white text-center rounded-sm'>
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
