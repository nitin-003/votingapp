
// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import Loader from './Loader';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDzXCKswEcDyn-gJKzTb-43UO7-5yOLDl4",
//     authDomain: "web3-voting-app-94c49.firebaseapp.com",
//     projectId: "web3-voting-app-94c49",
//     storageBucket: "web3-voting-app-94c49.firebasestorage.app",
//     messagingSenderId: "23421265703",
//     appId: "1:23421265703:web:7156785d10907e46a1eb02"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const AddCandidate = () => {
//   const { contract, account, provider } = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [values, setValues] = useState({
//     name: '',
//     partyName: '',
//     age: '',
//     cPic: '',
//     pPic: '',
//   });

//   const fieldValidation = () => {
//     if (!values.name || !values.partyName || !values.age) {
//       toast.warn('Please fill all the fields!', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//       });
//       return true;
//     }
//     return false;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(values);
//     if (fieldValidation()) {
//       return;
//     }
//     try {
//       setIsLoading(true);

//       // Save to Firestore
//       const candidateRef = doc(db, 'candidates', values.name); // Document reference
//       await setDoc(candidateRef, values); // Set the candidate data in Firestore

//       // Optionally, interact with your smart contract here
//       const signer = contract.connect(provider.getSigner());
//       const res = await signer.addCandidate(values.name, values.age, values.partyName, values.pPic, values.cPic);

//       toast.success('Candidate added successfully!', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//       });

//       setIsLoading(false);
//     } catch (error) {
//       toast.error(error.message, {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//       });
//       setIsLoading(false);
//     }
//   };

//   const captureCandidateFile = (e) => {
//     const file = e.target.files[0];
//     // If needed, handle the file upload (e.g., save the image to Firebase Storage)
//     setValues((prev) => ({ ...prev, cPic: URL.createObjectURL(file) }));
//   };

//   const capturePartyLogo = (e) => {
//     const file = e.target.files[0];
//     // If needed, handle the file upload (e.g., save the logo to Firebase Storage)
//     setValues((prev) => ({ ...prev, pPic: URL.createObjectURL(file) }));
//   };

//   return (
//     <div>
//       <ToastContainer />
//       {isLoading && <Loader />}
//       <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 drop-shadow-lg ">
//         <form action="#" method="POST">
//           <div className="shadow sm:overflow-hidden sm:rounded-md">
//             <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
//               <div>
//                 <h3 className="text-lg font-medium leading-6 text-gray-900">Candidate Information</h3>
//                 <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
//               </div>

//               <div className="grid grid-cols-6 gap-6">
//                 <div className="col-span-6 sm:col-span-3">
//                   <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="first-name"
//                     id="first-name"
//                     autoComplete="given-name"
//                     className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                     onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
//                   />
//                 </div>

//                 <div className="col-span-6 sm:col-span-3">
//                   <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
//                     Party name
//                   </label>
//                   <input
//                     type="text"
//                     name="last-name"
//                     id="last-name"
//                     autoComplete="family-name"
//                     className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                     onChange={(e) => setValues((prev) => ({ ...prev, partyName: e.target.value }))}
//                   />
//                 </div>

//                 <div className="col-span-12 sm:col-span-6">
//                   <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
//                     Age
//                   </label>
//                   <input
//                     type="text"
//                     name="email-address"
//                     id="email-address"
//                     autoComplete="email"
//                     className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                     onChange={(e) => setValues((prev) => ({ ...prev, age: e.target.value }))}
//                   />
//                 </div>

//                 <div className="col-span-12 sm:col-span-6">
//                   <div className="mb-4">
//                     <p className="italic text-xs">Upload Candidate Image</p>
//                     <input onChange={captureCandidateFile} type="file" />
//                   </div>
//                   <div>
//                     <p className="italic text-xs">Upload Party Logo</p>
//                     <input onChange={capturePartyLogo} type="file" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 className="inline-flex justify-center rounded-md border border-transparent bg-[#33c94a] py-2 px-4 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCandidate;




// import React, { useContext, useState } from 'react'
// import { AuthContext } from '../context/AuthContext';
// import Loader from './Loader';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Buffer } from "buffer"
// import { create as ipfsClient } from "ipfs-http-client"

// // const projectId = '2KKbUUpZwNEptMZKTCMn6DbRkbn';
// // const projectSecret = '62a1c456aa1126059720fa4ab67ce4a6';

// const projectId = 'a51e2311b8820396b73a';
// const projectSecret = '6dc71eef6c3bdd0e2f3c263478c4e99244a4a6c0f0f3f7f4be592e5adbcc377e';
// const auth =
//     'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const client = ipfsClient({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth,
//     },
// });

// const AddCandidate = () => {
//     const { contract, account, provider } = useContext(AuthContext);
//     const [isLoading, setIsLoading] = useState(false);
//     const [values, setValues] = useState({
//         name: "",
//         partyName: "",
//         age: "",
//         cPic: "",
//         pPic: "",
//     })

//     const fieldValidation = () => {
//         if (!values.name || !values.partyName || !values.age) {
//             toast.warn("Please fill all the fields!", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//             return true;
//         }

//         return false;
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(values);
//         if (fieldValidation()) {
//             return;
//         }
//         try {
//             setIsLoading(true);
//             const signer = contract.connect(provider.getSigner());
//             const res = await signer.addCandidate(values.name, values.age, values.partyName, values.pPic, values.cPic);
//             // console.log(res)
//             toast.success('Candidate added succesfully!', {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//             setIsLoading(false)
//         } catch (error) {
//             toast.error(error, {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//         }
//     }

//     const captureCandidateFile = async (e) => {
//         const data = e.target.files[0]; //files array of files object
//         setIsLoading(true);
//         try {
//             const add = await client.add(data);
//             setValues(prev => ({ ...prev, cPic: add.path }))
//             setIsLoading(false);
//             toast.success('Candidate Photo Uploaded!', {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//         } catch (e) {
//             alert("Unable to upload image to Pinata");
//             setIsLoading(false);
//         }
//     };

//     const capturePartyLogo = async (e) => {
//         const data = e.target.files[0]; //files array of files object
//         setIsLoading(true);
//         try {
//             const add = await client.add(data);
//             setValues(prev => ({ ...prev, pPic: add.path }))
//             setIsLoading(false);
//             toast.success('Party Logo Uploaded!', {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });
//         } catch (e) {
//             alert("Unable to upload image to IPFS");
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             <ToastContainer />
//             {isLoading && <Loader />}
//             <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 drop-shadow-lg ">
//                 <form action="#" method="POST">
//                     <div className="shadow sm:overflow-hidden sm:rounded-md">
//                         <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
//                             <div>
//                                 <h3 className="text-lg font-medium leading-6 text-gray-900">Candidate Information</h3>
//                                 <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p>
//                             </div>

//                             <div className="grid grid-cols-6 gap-6">
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
//                                         Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="first-name"
//                                         id="first-name"
//                                         autoComplete="given-name"
//                                         className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                                         onChange={(e) => setValues(prev => ({ ...prev, name: e.target.value }))}
//                                     />
//                                 </div>

//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
//                                         Party name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="last-name"
//                                         id="last-name"
//                                         autoComplete="family-name"
//                                         className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                                         onChange={(e) => setValues(prev => ({ ...prev, partyName: e.target.value }))}
//                                     />
//                                 </div>

//                                 <div className="col-span-12 sm:col-span-6">
//                                     <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
//                                         Age
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="email-address"
//                                         id="email-address"
//                                         autoComplete="email"
//                                         className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                                         onChange={(e) => setValues(prev => ({ ...prev, age: e.target.value }))}
//                                     />
//                                 </div>
//                                 <div className='col-span-12 sm:col-span-6'>
//                                     <div className='mb-4'>
//                                         <p className='italic text-xs'>Upload Candidate Image</p>
//                                         <input onChange={captureCandidateFile} type="file" name="" id="" />
//                                     </div>
//                                     <div>
//                                         <p className='italic text-xs'>Upload Party Logo</p>
//                                         <input onChange={capturePartyLogo} type="file" name="" id="" />
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                         <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
//                             <button
//                                 type="submit"
//                                 onClick={handleSubmit}
//                                 className="inline-flex justify-center rounded-md border border-transparent bg-[#33c94a] py-2 px-4 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2"
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div >
//         </div >
//     )
// }

// export default AddCandidate




import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';  // Import axios for HTTP requests

const pinataApiKey = '9b9ea84a09d90ba311f7';  // Your Pinata API key
const pinataApiSecret = 'fa9bd6d6ceaab1336039f935531dbedbbb241883f2450e6d97d79c153d4faf44';  // Your Pinata Secret key
const pinataUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';  // Pinata file upload endpoint

const AddCandidate = () => {
    const { contract, account, provider } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        partyName: "",
        age: "",
        cPic: "",
        pPic: "",
    });

    const fieldValidation = () => {
        if (!values.name || !values.partyName || !values.age) {
            toast.warn("Please fill all the fields!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return true;
        }
        return false;
    };

    // const handleSubmit = async (e) => {

    //     e.preventDefault();
    //     console.log(values);
    //     if (fieldValidation()) {
    //         return;
    //     }

    //     setIsLoading(true); // Show loading state when the form is submitted

    //     try {
    //         // First, upload the images (candidate image and party logo) to IPFS
    //         const cPicUrl = await uploadFileToPinata(values.cPic, 'cPic');
    //         const pPicUrl = await uploadFileToPinata(values.pPic, 'pPic');

    //         // Update the state with the file URLs from IPFS
    //         setValues(prev => ({
    //             ...prev,
    //             cPic: cPicUrl,
    //             pPic: pPicUrl
    //         }));

    //         // Once the images are uploaded, proceed with the blockchain transaction
    //         console.log("images",cPicUrl,pPicUrl);
    //         const signer = contract.connect(provider.getSigner());
    //         const res = await signer.addCandidate(values.name, values.age, values.partyName, values.pPic, values.cPic);

    //         // Show success toast if the transaction was successful
    //         toast.success('Candidate added successfully!', {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //         });

    //         setIsLoading(false);  // Hide loading state when transaction is complete

    //     } catch (error) {
    //         // Handle errors from the file upload or contract transaction
    //         console.error('Error:', error);
    //         toast.error("There was an error processing your request.", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //         });
    //         setIsLoading(false);  // Hide loading state on error
    //     }
    // };


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // If field validation fails, return early
      if (fieldValidation()) {
          return;
      }
  
      setIsLoading(true); // Show loading state when the form is submitted
  
      try {
          // First, upload the images (candidate image and party logo) to IPFS
          const cPicUrl = await uploadFileToPinata(values.cPic, 'cPic');
          const pPicUrl = await uploadFileToPinata(values.pPic, 'pPic');
  
          // Once the images are uploaded, we can now call the contract method
          const signer = contract.connect(provider.getSigner());
          const res = await signer.addCandidate(
              values.name,        // Candidate name
              values.age,         // Candidate age
              values.partyName,   // Party name
              pPicUrl,            // Party logo URL (Pinata IPFS URL)
              cPicUrl             // Candidate image URL (Pinata IPFS URL)
          );
  
          // Wait for the transaction to be mined and confirmed
          await res.wait(); // Ensure the transaction has been mined
  
          // Show success toast if the transaction was successful
          toast.success('Candidate added successfully!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });
  
          setIsLoading(false);  // Hide loading state when transaction is complete
      } catch (error) {
          // Handle errors from the file upload or contract transaction
          console.error('Error:', error);
          toast.error("There was an error processing your request.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });
          setIsLoading(false);  // Hide loading state on error
      }
  };
  
    // Function to upload files to Pinata
    const uploadFileToPinata = async (file, type) => {
        if (!file) {
            throw new Error(`${type} file is missing.`);
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Log form data to verify the file
            console.log("Uploading file to Pinata: ", formData);

            const response = await axios.post(pinataUrl, formData, {
                maxContentLength: 'Infinity',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataApiSecret
                }
            });

            console.log("Pinata Response:", response);  // Log the full response

            if (response.status === 200) {
                const fileUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                toast.success(`${type === 'cPic' ? 'Candidate Image' : 'Party Logo'} uploaded successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                return fileUrl;  // Return the IPFS URL
            } else {
                console.error('Error response from Pinata:', response);
                throw new Error('Failed to upload to Pinata');
            }
        } catch (error) {
            // Log detailed error
            console.error(`Error uploading ${type} to Pinata:`, error.response || error.message || error);
            toast.error(`Error uploading ${type} to Pinata. Please try again.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setIsLoading(false);  // Hide loading state on error
            throw error;  // Throw error to stop further execution
        }
    };

    return (
        <div>
            <ToastContainer />
            {isLoading && <Loader />}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 drop-shadow-lg">
                <form action="#" method="POST">
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Candidate Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                            </div>

                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => setValues(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Party name</label>
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => setValues(prev => ({ ...prev, partyName: e.target.value }))}
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Age</label>
                                    <input
                                        type="text"
                                        name="email-address"
                                        id="email-address"
                                        autoComplete="email"
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => setValues(prev => ({ ...prev, age: e.target.value }))}
                                    />
                                </div>

                                <div className='col-span-12 sm:col-span-6'>
                                    <div className='mb-4'>
                                        <p className='italic text-xs'>Upload Candidate Image</p>
                                        <input onChange={(e) => setValues(prev => ({ ...prev, cPic: e.target.files[0] }))} type="file" />
                                    </div>
                                    <div>
                                        <p className='italic text-xs'>Upload Party Logo</p>
                                        <input onChange={(e) => setValues(prev => ({ ...prev, pPic: e.target.files[0] }))} type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex justify-center rounded-md border border-transparent bg-[#33c94a] py-2 px-4 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCandidate;
