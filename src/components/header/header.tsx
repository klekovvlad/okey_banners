import { Alert, Grid } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useContext} from "react";
import { AlertContext } from "../../App";

const Header = () => {
    const {text, visible, status} : any = useContext(AlertContext)

    return (
        <Grid container className="header" alignItems={'center'} mb={2}>
            <Grid item lg={9}>
                <Typography variant="h1">
                    Banners
                </Typography>
            </Grid>
            <Grid item lg={3}>
                <Alert severity={status.alertStatus} style={{display: visible.alertVisible ? 'flex' : 'none'}}>
                    {text.alertText}
                </Alert>
            </Grid>
        </Grid>
    )
}

export default Header