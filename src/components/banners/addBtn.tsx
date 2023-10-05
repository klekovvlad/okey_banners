import { Button } from "@mui/material"
import { useContext } from "react"
import { ModalContext } from "../modal/modal"

type Props = {
    line: string
}

const AddButton = ({line} : Props)  => {
    const {visible, item, type, place} : any = useContext(ModalContext)

    const add = () => {
        visible.setModalOpen(true)
        item.setModalBanner({})
        type.setModalType('new')
        place.setModalLine(line)
    }

    return(
        <Button 
            onClick={
                () => {
                    add()
                }
            }
            data-line={line} 
            variant="outlined">
            Добавить
        </Button>
    )
}

export default AddButton