import React from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  content: React.ReactNode
  isOpen: boolean
  onClose?: () => void
  title: string
}

const Modal = ({ content, isOpen, onClose, title }: ModalProps) => {
  if (!isOpen) {
    return null
  }

  return createPortal(
    <>
      <div className="justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-screen">
        <div className="relative w-auto sm:w-3/5 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-modal-bg outline-none focus:outline-none p-9 min-w-64">
            {/*header*/}
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-semibold">{title}</h3>
              {onClose && (
                <button onClick={onClose}>
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="2em"
                    width="2em"
                  >
                    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
                  </svg>
                </button>
              )}
            </div>
            {/*body*/}
            {content}
          </div>
        </div>
      </div>
      <div className="opacity-90 fixed inset-0 z-40 bg-modal-overlay"></div>
    </>,
    document.getElementById('modal')!
  )
}

export default Modal
