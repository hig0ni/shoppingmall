import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link';
import Image from "next/image";
import { Cookies } from "react-cookie";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router'
import { tokenState } from '../recoil/recoilToken.js';
import { userState } from '../recoil/recoilUser.js';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown() {
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const user = useRecoilState(userState);
  const router = useRouter();
  
  const logout = () => {
    const cookies = new Cookies();

    setToken(null);
    setUser(null);
    cookies.remove('refreshToken')
    router.push('/')
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <button className="border-none flex items-center text-2xl">
                <Image src="/profile.png" width="30" height="30"/>
                <span className="ml-3">{user}</span>                      
            </button>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )} >
                    <Link href="/profile">
                        마이페이지
                    </Link>
                </button>

              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button 
                className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                onClick={logout}>
                  로그아웃
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}