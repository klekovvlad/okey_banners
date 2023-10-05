import Typography from "@mui/material/Typography"
import { useContext } from "react"
import { TitleContext } from "../../App"


const Title = () => {
    
    const {title} : any = useContext(TitleContext)

    return (
        <Typography variant="h2" textTransform='uppercase' fontWeight='700' borderBottom='1px solid #aaa'>
            {title}
        </Typography>
    )
}

export default Title;