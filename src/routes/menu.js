import {
  AiOutlineHome,
  AiOutlineUsergroupAdd
} from 'react-icons/ai';
import { MdPersonOutline, MdNotificationsNone } from 'react-icons/md';
import { IoBusinessOutline } from 'react-icons/io5';
import { RxActivityLog } from 'react-icons/rx';
import { BsFolder } from 'react-icons/bs';
import { RiSettings2Line, RiDashboardLine } from 'react-icons/ri';
import React from 'react';

const miniMenu = [
  {
    name: 'dashboard',
    icon: <RiDashboardLine />,
    to: '/app/dashboard'
  },
  {
    name: 'engagement',
    icon: <BsFolder />,
    to: '/app/engagement'
  },
  {
    name: 'clients',
    icon: <IoBusinessOutline />,
    to: '/app/clients'
  },
  {
    name: 'team',
    icon: <AiOutlineUsergroupAdd />,
    to: '/app/team'
  },
  {
    name: 'profile',
    icon: <MdPersonOutline />,
    to: '/app/profile'
  },
  {
    name: 'notifications',
    icon: <MdNotificationsNone />,
    to: '/app/notifications'
  },
  {
    name: 'settings',
    icon: <RiSettings2Line />,
    to: '/app/settings'
  },
  {
    name: 'activitylog',
    icon: <RxActivityLog />,
    to: '/app/activitylog'
  }
];
export default miniMenu;
