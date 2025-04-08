// import UserModal from '@/components/admin/UserModal';
// import UsersTable from '@/components/admin/UsersTable';
// import React, { useState } from 'react';

// const DEFAULT_USER = {
//     id: '',
//     title: '',
//     description: '',
//     image: '',
//     price: '',
// };

// const Users: React.FC = () => {
//     const [showUserModal, setShowUserModal] = useState(false);
//     const [userModel, setUserModel] = useState(DEFAULT_USER);

//     const showAddNewModal = () => setShowUserModal(true);

//     const editUser = (user: typeof DEFAULT_USER) => {
//         setUserModel(user);
//         showAddNewModal();
//     };

//     const onModalClose = () => {
//         setUserModel(DEFAULT_USER);
//         setShowUserModal(false);
//     };

//     return (
//         <div className="flex flex-col gap-4">
//             <div className="mb-3 flex items-center justify-between">
//                 <h1 className="text-3xl font-semibold">Users</h1>
//                 <button
//                     type="button"
//                     onClick={showAddNewModal}
//                     className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
//                 >
//                     Add new User
//                 </button>
//             </div>
//             <UsersTable onClickEdit={editUser} />
//             <UserModal show={showUserModal} user={userModel} onClose={onModalClose} />
//         </div>
//     );
// };

// export default Users;
