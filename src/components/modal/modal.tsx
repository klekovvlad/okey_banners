import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, Modal, NativeSelect, TextField, Typography } from "@mui/material";
import { createContext, useContext, useRef} from "react";
import { LIBARIES } from "../../resourses/libaries";
import { BannersContext } from "../../App";

export const ModalContext = createContext({})

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IObj {
    [index: string]: any,
}

const ModalElement = () => {

    
    const {item, visible, type, place, editIndex} : any = useContext(ModalContext)
    const {banners, setBanners} : any = useContext(BannersContext)
    const banner = item.modalBanner
    const modal = useRef(null)

    const getUrl = () : any => {
        for(let i = 0; i < LIBARIES.URL.length; i++) {
            if(banner[LIBARIES.URL[i]]) {
                return {
                    type: LIBARIES.URL[i],
                    url: banner[LIBARIES.URL[i]]
                }
            }
        }
    }

    const typeInfo = getUrl()


    const types = LIBARIES.URL.map(url => {
        return (
            <option key={url} value={url}>{url}</option>
        )
    })

    const CategorySelect = () => {
        return (
            <FormControl fullWidth>
                <InputLabel variant='standard'>Тип</InputLabel>
                <NativeSelect
                    defaultValue={typeInfo?.type ? typeInfo.type : 'categoryId'}
                    name="type">
                    {types}
                </NativeSelect>
            </FormControl>
        )
    }

    const Images = () => {
        const inputs = () => {
            if(typeof banner.img === 'object') {
                return (
                    <>
                        <TextField fullWidth variant='standard' name="img-adaptive" label={'Адаптив'} defaultValue={banner.img.adaptive}></TextField>
                        <TextField fullWidth variant='standard' name="img-desktop" label={'Десктоп'} defaultValue={banner.img.desktop}></TextField>
                        <TextField fullWidth variant='standard' name="img-alt" label={'ALT аттрибут'} defaultValue={banner.alt ? banner.alt : ''}></TextField>
                    </>
                )
            }else{
                return (
                    <>
                        <TextField fullWidth variant='standard' name="img-adaptive" label={'Адаптив'} ></TextField>
                        <TextField fullWidth variant='standard' name="img-desktop" label={'Десктоп'} defaultValue={banner.img ? banner.img : ''}></TextField>
                        <TextField fullWidth variant='standard' name="img-alt" label={'ALT аттрибут'} defaultValue={banner.alt ? banner.alt : ''}></TextField>
                    </>
                )
            }
        }

        return(
            <Grid>
                <Typography>Изображения</Typography>
                {inputs()}
            </Grid>
        )
    }

    const Save = () => {
        const obj : IObj = {}
        const newBanners = {...banners}
        let i = null
        if(modal.current) {
            const el : HTMLDivElement = modal.current
            const inputs = el.querySelectorAll('input')
            const select = el.querySelector('select')
            
            inputs.forEach(input => {
                if(input.value !== '') {
                    if(select && input.name === 'url') {
                        obj[select.value] = input.value
                    }
                    if(input.name === 'start' || input.name === 'end') {
                        if(!obj.dates) {
                            obj.dates = {}
                        }
                        if(input.name === 'start') {
                            obj.dates.start = input.value.replaceAll('.', '-')
                        }
                        if(input.name === 'end') {
                            obj.dates.end = input.value.replaceAll('.', '-')
                        }
                    }
                    if(input.name === 'img-alt') {
                        obj.alt = input.value
                    }
                    if(input.name === 'img-adaptive') {
                        obj.img = {}
                        obj.img.adaptive = input.value
                    }
                    if(input.name === 'img-desktop') {
                        if(obj.img) {
                            obj.img.desktop = input.value
                        }else{
                            obj.img = input.value
                        }
                    }
                    if(input.name === 'index') {
                        i = input.value
                    }
                    if(input.name === 'city' || input.name === 'exclude') {
                        const array = input.value.split(',')
                        if(array.length === 1) {
                            obj[input.name] = array.join('')
                        }else{
                            obj[input.name] = array
                        }
                    }
                }
                if(input.name === 'wide' && input.checked) {
                    obj.wide = true
                }
            })

            if(type.modalType === 'new') {
                if(i) {
                    newBanners[place.modalLine].splice((i - 1), 0, obj)
                }else{
                    newBanners[place.modalLine].push(obj)
                }
            }else{
                if(i) {
                    newBanners[place.modalLine].splice(editIndex.editIndex, 1)
                    newBanners[place.modalLine].splice((i - 1), 0, obj)
                }else{
                    newBanners[place.modalLine][editIndex.editIndex] = obj
                }
            }
            setBanners(newBanners)
        }
        
        visible.setModalOpen(false)
    }

    const getCity = (type : string) => {
        if(banner[type]) {
            if(Array.isArray(banner[type])) {
                return banner[type].join(',')
            }else{
                return banner[type]
            }
        }else{
            return ''
        }
    }

    return (
        <Modal ref={modal} open={visible.modalOpen} >

            <Box sx={style} className="app-modal">
                <Grid container spacing={2}>
                    <Grid item>
                        {CategorySelect()}
                    </Grid>
                    <Grid item>
                        <TextField fullWidth name="url" label={'ID / Ссылка'} variant="standard" defaultValue={ typeInfo?.url ? typeInfo.url : '' } ></TextField>
                    </Grid>
                </Grid>

                {Images()}

                <TextField fullWidth name="city" variant='standard' label='Города' defaultValue={getCity('city')}></TextField>
                <TextField fullWidth name="exclude" variant='standard' label='Исключить из' defaultValue={getCity('exclude')}></TextField>

                <Grid container spacing={2}>
                    <Grid item>
                        <TextField type="date"  name="start" variant="standard" label={'Дата старта'}  defaultValue={banner?.dates?.start ? banner?.dates?.start : ''}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField type="date" name="end" variant="standard" label={'Дата окончания'} defaultValue={banner?.dates?.end ? banner?.dates?.end : ''}></TextField>
                    </Grid>
                </Grid>

                <FormControlLabel control={
                    <Checkbox name="wide" defaultChecked={banner?.wide ? true : false} />
                }
                label="Во всю ширину?" />

                <TextField fullWidth type="number" name="index" variant="standard" label={'Номер по порядку'}></TextField>

                
                <ButtonGroup variant="contained">
                    <Button color="success" onClick={() => {Save()}}>Сохранить</Button>
                    <Button color="error" onClick={() => {visible.setModalOpen(false)}}>Закрыть</Button>
                </ButtonGroup>
            </Box>

        </Modal>
    )
}

export default ModalElement;