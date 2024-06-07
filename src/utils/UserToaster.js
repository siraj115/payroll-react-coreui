import {
CToast,
CToastHeader,
CAlert
} from '@coreui/react'

const UserToaster = ({color, msg})=>{
return(
    <CToast animation={false} autohide={false} visible={true}>
        <CToastHeader  closeButton>
            <CAlert color={color}>
                {msg}
            </CAlert>
        </CToastHeader>
    </CToast>
)
}

export default UserToaster;