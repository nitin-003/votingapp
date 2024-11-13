import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function CandidateDetails() {
  const { contract, provider, adminAccount, account } = useContext(AuthContext);
  
  if (account !== adminAccount) {
    return <VoterComponent />;
  } else {
    return <AdminComponent contract={contract} provider={provider} />;
  }
}

const AdminComponent = ({ contract, provider }) => {
  const [candidates, setCandidates] = useState([]);
  
  useEffect(() => {
    const getCandidates = async () => {
      try {
        const signer = contract.connect(provider.getSigner());
        const cand = await signer.getCandidate(); // This should return the list of candidates
        setCandidates(cand);
      } catch (error) {
        console.log('Error fetching candidates:', error);
      }
    };

    getCandidates();
    console.log(candidates)
    
  }, [contract, provider]);


  

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Candidates</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the candidates, including their name, party name, age, status, and images.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#33c94a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Candidate
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-green-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Party Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Age
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Party Logo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {candidates.length > 0 ? (
                    candidates.map((item, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                // src={`https://ipfs.io/ipfs/${item.candidate_img}`}
                                src={item.candidate_img}
                                alt={item.candidate_name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{item.candidate_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.candidate_partyName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item.candidate_age.toNumber()} {/* Ensure correct data type handling */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              // src={`https://ipfs.io/ipfs/${item.candidate_partyLogo}`}
                              src={item.candidate_partyLogo}
                              alt={item.candidate_partyName}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No candidates registered yet!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoterComponent = () => {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-yellow-800">User Manual</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p className="text-lg">Welcome</p>
            <p className="mt-2 mb-2">These are few Guidelines for user.</p>
            <p>1 . Voter Registration</p>
            <div className="px-8 py-2">
              <ul className="list-disc">
                <li>
                  For casting the vote user need to first register himself. For this purpose,
                  voter will be provided a voter registration form on this website.
                </li>
                <li>
                  The voter can only register in the registration phase. After the registration phase
                  is over, voters cannot register and thus will not be able to vote.
                </li>
              </ul>
            </div>
            <p>2 . Voting Process</p>
            <div className="px-8 py-2">
              <ul className="list-disc">
                <li>
                  Overall, the voting process is divided into three phases, all of which will be
                  initialized and terminated by the admin. The user must participate in the process
                  according to the current phase.
                </li>
                <li>Registration Phase: During this phase, the registration of users (who are going to cast the vote) will be carried out.</li>
                <li>
                  Voting Phase: After the initialization of the voting phase by the admin, users can
                  cast votes. The casting of votes can't be done simply by clicking on the "VOTE"
                  button, after which a transaction will be initiated, and after confirming the
                  transaction, the vote will get successfully casted. After the voting phase ends, users
                  will not be able to vote.
                </li>
                <li>Result Phase: This is the final stage of the voting process, during which the results of the election will be displayed in the "Result" section.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




// import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';


// const people = [
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     department: 'Optimization',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     image:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     department: 'Optimization',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     image:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     department: 'Optimization',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     image:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     department: 'Optimization',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     image:
//       'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
// ]



// export default function CandidateDetails() {
//   const { contract, provider, adminAccount, account } = useContext(AuthContext);
//   if (account != adminAccount) {
//     return (
//       <VoterComponent />
//     )
//   } else {
//     return (
//       <AdminComponent contract={contract} provider={provider} />
//     )
//   }
// }

// const AdminComponent = ({ contract, provider }) => {

//   const [candidates, setCandidates] = useState();

//   useEffect(() => {
//     const getCandidates = async () => {
//       try {
//         const signer = contract.connect(provider.getSigner());
//         const cand = await signer.getCandidate();
//         // console.log(cand);
//         setCandidates(cand);
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getCandidates();
//   }, [])

//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-xl font-semibold text-gray-900" >Users</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all the users in your account including their name, title, email and role.
//           </p>
//         </div>
//         <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
//           <button
//             type="button"
//             className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#33c94a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
//           >
//             Add user
//           </button>
//         </div>
//       </div>
//       <div className="mt-8 flex flex-col">
//         <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//               <table className="min-w-full divide-y divide-gray-300">
//                 <thead className="bg-green-100">
//                   <tr>
//                     <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                       Name
//                     </th>
//                     <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                       Party Name
//                     </th>
//                     <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                       Age
//                     </th>
//                     <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                       Status
//                     </th>
//                     <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                       Party Logo
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {candidates?.map((item, i) => {
//                     return (
//                       <>
//                         <tr key={i}>
//                           <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//                             <div className="flex items-center">
//                               <div className="h-10 w-10 flex-shrink-0">
//                                 <img className="h-10 w-10 rounded-full" src={`https://ipfs.io/ipfs/${item.candidate_img}`} alt="" />
//                               </div>
//                               <div className="ml-4">
//                                 <div className="font-medium text-gray-900">{item.candidate_name}</div>
//                                 {/* <div className="text-gray-500">{person.email}</div> */}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                             <div className="text-gray-900">{item.candidate_partyName}</div>

//                           </td>
//                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                             <div className="text-gray-500">{item.candidate_age.toNumber()}</div>
//                           </td>
//                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                             <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
//                               Active
//                             </span>
//                           </td>
//                           <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                             <div className="h-10 w-10 flex-shrink-0">
//                               <img className="h-10 w-10 rounded-full" src={`https://ipfs.io/ipfs/${item.candidate_partyLogo}`} alt="" />
//                             </div>
//                           </td>
//                         </tr>
//                       </>
//                     )
//                   }
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             {candidates?.length == 0 && <p className='mt-4 text-center'>No Candidate registered yet!</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// const VoterComponent = () => {
//   return (
//     <div className="rounded-md bg-yellow-50 p-4">
//       <div className="flex">
//         <div className="flex-shrink-0">
//           <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
//         </div>
//         <div className="ml-3">
//           <h3 className="text-sm font-semibold text-yellow-800">User Manual</h3>
//           <div className="mt-2 text-sm text-yellow-700">
//             <p className='text-lg'>
//               Welcome
//             </p>
//             <p className='mt-2 mb-2'>These are few Guidelines for user.</p>
//             <p>1 . Voter Registration</p>
//             <div className='px-8 py-2'>
//               <ul className='list-disc'>
//                 <li>For casting the vote user need to first register himself. for this purpose voter will provided a voter registration form on this website.</li>
//                 <li>The voter can only register in registration phase. after registration phase is over voters can not register and thus will not able to vote.</li>
//               </ul>
//             </div>
//             <p>2 . Voting Process</p>
//             <div className='px-8 py-2'>
//               <ul className='list-disc'>
//                 <li>Overall, voting process is divided into three phases. All of which will be initialized and terminated by the admin. User have to
//                   participate in the process according to current phase</li>
//                 <li> Registration Phase During this phase the registration of the users (which are going to cast the vote) will be carried out.</li>
//                 <li>Voting Phase After initialization of voting phase from the admin, user can cast the vote in voting section. The casting of vote cant
//                   be simply done by clicking on "VOTE" button, after which transaction will be initiated and after confirming transaction the vote will
//                   get successfully casted After voting phase gets over user will not be able to cast vote</li>
//                 <li>Result Phase This is the final stage of whole voting process during which the results of election will be displayed at "Result
//                   section</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }