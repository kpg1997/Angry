import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text'
  },
  {
    title: '유저보기',
    path: '/users',
    icon: <BsIcons.BsPersonBoundingBox />,
    cName: 'nav-text'
  },
  {
    title: '거래소',
    path: '/exchange',
    icon: <BiIcons.BiCoinStack />,
    cName: 'nav-text'
  },
  {
    title: '회원가입',
    path: '/register',
    icon: <BsIcons.BsEnvelopeFill />,
    cName: 'nav-text'
  },
  {
    title: 'YamaCoin',
    path: '/yamainfo',
    icon: <BsIcons.BsInfoCircleFill />,
    cName: 'nav-text'
  }
];