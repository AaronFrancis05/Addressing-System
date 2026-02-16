import {ToastComponet} from 'react-toastify'

export const MessageProvider = ({ children }) => {
  return (
    <>
      <ToastComponet />
      {children}
    </>
  );
}