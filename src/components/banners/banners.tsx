import Line from "./line"
import Typography from "@mui/material/Typography"
import './banners.css'
import { useContext } from "react"
import { BannersContext } from "../../App"
import AddButton from "./addBtn"
import { Grid } from "@mui/material"


const Banners = () => {
    
    const { banners } : any = useContext(BannersContext)

    const keys : string[] = Object.keys(banners)
    
    const lines = keys.map(key => {

        return (
            <div className="banners" key={key}>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item>
                        <Typography variant="h3" >{key}</Typography>
                    </Grid>
                    <Grid item>
                        <AddButton line={key} />
                    </Grid>
                </Grid>
                <Line banners={banners[key]} title={key} />
            </div>
        )
    })

    return (

        <>
            { lines }
        </>
    )
}

export default Banners