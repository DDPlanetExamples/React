import posed from "react-pose";

export const SlideAnimationWrapper = posed.div({
    enter: {
        opacity: 1,
        left: 0,
        position: 'absolute',
        transition: { duration: 300 },
        beforeChildren: true,
    },
    exit: {
        opacity: 0,
        left: '-100%',
        position: 'absolute',
        transition: { duration: 300 },
        staggerDirection: -1,
    },
});

export const PopAnimationWrapper = posed.div({
    enter: {
        opacity: 1,
        transition: { duration: 500 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 500 },
    },
});
