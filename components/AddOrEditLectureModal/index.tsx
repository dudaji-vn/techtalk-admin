// import CloseIcon from '@mui/icons-material/Close';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { IFormLecture } from '../../interfaces/lecture';
// import FileUpload from '../FileUpload';
// import InputController from '../InputController';
// import Modal, { IModalProps } from '../Modal';
// import { useApiLecture } from '../../hooks/api/useApiLecture';
// import { toastSuccess } from '../../utils/toast';
// interface IAddOrEditModalLectureProps extends IModalProps {
//   type: 'add' | 'edit';
//   data?: IFormLecture | false | undefined;
// }
// const AddOrEditLectureModal = (props: IAddOrEditModalLectureProps) => {
//   const { open, onClose, type, data } = props;

//   const photoRef = useRef<HTMLInputElement>(null);
//   const { addOrUpdateLecture } = useApiLecture();

//   useEffect(() => {
//     if (data) {
//       setValue('lectureName', data.lectureName);
//       setValue('imgSrc', data.imgSrc);
//       setValue('lectureId', data.lectureId);
//     } else {
//       reset();
//     }
//   }, [data, open]);
//   const {
//     handleSubmit,
//     control,
//     setValue,
//     getValues,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<IFormLecture>({});

//   const onSubmit = handleSubmit((data) => {
//     addOrUpdateLecture(data);
//     onClose && onClose();

//     reset();
//   });

//   return (
//     <Modal open={open} onClose={onClose}>
//       <form onSubmit={onSubmit} className=" rounded-[5px] w-[500px]">
//         <h1 className="text-xl font-bold">{type === 'add' ? 'Create new lectures' : 'Update lecture'}</h1>
//         <InputController
//           name="lectureName"
//           control={control}
//           label="Lecture name"
//           rules={{
//             required: 'Lecture name is required',
//           }}
//           error={errors.lectureName?.message}
//         />
//         <FileUpload
//           rules={{
//             required: 'Please select image',
//           }}
//           label="Upload image"
//           ref={photoRef}
//           name={'imgSrc'}
//           control={control}
//           error={errors.imgSrc?.message}
//         />

//         <div className="h-28 my-4">
//           {watch('imgSrc') && (
//             <div className="h-28  relative">
//               <img className=" object-cover" src={watch('imgSrc')} alt="" />
//               <button
//                 onClick={() => {
//                   setValue('imgSrc', '');
//                   if (photoRef.current) {
//                     photoRef.current.value = '';
//                   }
//                 }}
//                 className="absolute top-0 right-0"
//               >
//                 <CloseIcon />
//               </button>
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="text-md mr-4 mt-4 cursor-pointer rounded-[8px] bg-primary py-[10px] px-6 font-semibold text-white text-base "
//         >
//           Save
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             reset();
//             onClose && onClose();
//           }}
//           className="text-md mt-4 cursor-pointer rounded-[8px] border border-primary py-[10px] px-6 font-semibold  text-base "
//         >
//           Cancel
//         </button>
//       </form>
//     </Modal>
//   );
// };

// export default AddOrEditLectureModal;
import React from 'react';

const Draft = () => {
  return <div>Draft</div>;
};

export default Draft;
