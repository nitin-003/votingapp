// import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { Fragment, useContext, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import Sidebar from './components/Sidebar'
import img from "./img/online-voting.svg"
import Avatar from 'react-avatar';
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  FolderIcon,
  UserPlusIcon,
  XMarkIcon,
  UsersIcon,
  ChartBarIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import CandidateDetails from "./components/CandidateDetails";
import AddCandidate from "./components/AddCandidate";
import Result from "./components/Result";
import Voters from "./components/Voters"
import VoteArea from "./components/VoteArea"
import VoterRegistration from "./components/VoterRegistration"
import ChangePhase from "./components/ChangePhase";
import { AuthContext } from "./context/AuthContext"
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]



const adminNav = [
  { name: 'Candidate Details', href: '#', icon: InformationCircleIcon, current: true },
  { name: 'Add Candidate', href: '#', icon: UserPlusIcon, current: false },
  { name: 'Register', href: '#', icon: UsersIcon, current: false },
  { name: 'Change Phase', href: '#', icon: ArchiveBoxArrowDownIcon, current: false },
  { name: 'Result', href: '#', icon: ChartBarIcon, current: false },
]
const voterNav = [
  { name: 'Information', href: '#', icon: InformationCircleIcon, current: true },
  { name: 'Voter Registration', href: '#', icon: CheckCircleIcon, current: false },
  { name: 'Vote-Area', href: '#', icon: RectangleStackIcon, current: false },
  { name: 'Result', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const components = {
  1: CandidateDetails,
  2: VoterRegistration,
  3: VoteArea,
  4: Result,
  5: AddCandidate,
  6: Voters,
  7: ChangePhase
}


function Home() {
  const { account, currentUser } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [component, setComponent] = useState(1);
  const Componenet = components[component];
  const [msg, setMsg] = useState();
  const onClick = (data) => {
    setMsg(data)
    if (data === "Information" || data === "Candidate Details") setComponent(1);
    else if (data === "Voter Registration") setComponent(2);
    else if (data === "Vote-Area") setComponent(3);
    else if (data === "Result") setComponent(4);
    else if (data === "Add Candidate") setComponent(5);
    else if (data === "Voters") setComponent(6);
    else if (data === "Change Phase") setComponent(7);
  }

  return (
    <div>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-12 w-auto"
                      src={img}
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {adminNav.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <Sidebar onClick={onClick} />
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <p className="p-4 text-sm">
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {`Your account : ${account}`}
                  </button>
                </p>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Avatar onClick={() => signOut(auth)} name={currentUser?.displayName} size={40} round={20} />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            </div> */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <Componenet />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
