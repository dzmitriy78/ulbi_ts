import React, {ReactElement} from 'react';
import "./MyModal.css"

interface MyModalPropsType {
    visible: boolean
    setVisible(arg0: boolean): void
    children: ReactElement <any, any>
}

const MyModal = ({children, visible, setVisible}: MyModalPropsType) => {

    const rootClasses = ["myModal"]
    if (visible) {
        rootClasses.push("myModalActive")
    }
    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={"myModalContent"} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;