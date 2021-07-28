import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from "react-dom";
import { PoseGroup } from 'react-pose'
import { PopAnimationWrapper, SlideAnimationWrapper } from "./Animation/AnimationWrapper";

let index = 0
const ModalWrapper = ({ children, animation }) => {
    const [modalComponent, setModalComponent] = useState(null)
    const [open, setOpen] = useState(false)

    const modalRoot = document.getElementById('modal-root')

    const AnimationWrapper = useMemo(() => {
        switch (animation) {
            case 'slide':
                return SlideAnimationWrapper
            default:
                return PopAnimationWrapper
        }
    }, [])

    useEffect(() => {
        if (children) {
            index += 1
            setModalComponent(children)
            setOpen(true)
            document.body.style.overflow = 'hidden';
        } else {
            setOpen(false)
            setModalComponent(null)
            if (modalRoot.childElementCount === 1) {
                document.body.style.overflow = 'unset';
            }
        }
    }, [children, setModalComponent, setOpen])

    return createPortal(
        <PoseGroup>
            {open && (
                <AnimationWrapper key='modal'>
                    {React.cloneElement(modalComponent, { index })}
                </AnimationWrapper>
            )}
        </PoseGroup>,
        modalRoot,
    )
}

/**
 *
 * @param {'slide' | 'pop'} animation
 */
export const useModal = (animation = 'slide') => {
    const [modalComponent, setModalComponent] = useState(null)

    const memoModal = useMemo(() => (
        <ModalWrapper animation={animation}>{modalComponent}</ModalWrapper>
    ), [modalComponent])

    return [memoModal, setModalComponent]
}
