import { Button, ButtonGroup } from "@mui/material";
import { LIBARIES } from "../../resourses/libaries"
import {useContext} from 'react';
import { BannersContext } from "../../App";
import { ModalContext } from "../modal/modal";


type Props = {
    banner: IBanner,
    title: string,
    index: number
}

interface IBanner {
    [index: string]: any,
    categoryId?: string,
    productId?: string,
    url?: string,
    city?: string | string[],
    exclude?: string | string[],
    img?: string | IImageObj,
    dates?: object,
    wide?: boolean
}

interface IImageObj {
    desktop: string,
    adaptive: string
}


const Banner = ({banner, title, index}: Props) => {
    const {banners, setBanners} : any = useContext(BannersContext)
    const {visible, item, type, place, editIndex} : any = useContext(ModalContext)

    const getImgSrc = () : any => {
        if(typeof banner.img === 'object') {
            return banner.img.desktop
        }else{
            return banner.img
        }
    }

    const Delete = (e: any) => {
        const banner = e.target.parentElement.parentElement
        const array : string[] = []
        for(let i = 0; i < banners[banner.dataset.line].length; i++) {
            if(i !== Number(banner.dataset.id)) {
                array.push(banners[banner.dataset.line][i])
            }
        }
        const newArray = {...banners}
        newArray[banner.dataset.line] = array
        setBanners(newArray)

    }

    let cities : string[]  = []

    if(banner.city) {
        if(Array.isArray(banner.city)) {
            cities = banner.city
        }else{
            cities = banner.city?.split(',')
        }
    }

    return (
        <>
            <div data-id={index} data-line={title} className="banner" style={banner.wide ? {gridColumnStart: 'span 3'} : {gridColumnStart: 'auto'}}>
                <img src={LIBARIES.PROD_URL + getImgSrc()} alt="" />
                <div className="cities">
                    {cities.map((city, index) => (
                        <div key={index} className="city">{city}</div>
                    ))}
                </div>

                <ButtonGroup style={{
                    margin: "4px 0px 0px 0px"
                }}>
                    <Button variant="contained" onClick={
                        () => {
                            visible.setModalOpen(true)
                            item.setModalBanner(banner)
                            type.setModalType('edit')
                            place.setModalLine(title)
                            editIndex.setEditIndex(index)
                        }
                    }>Редактировать</Button>
                    <Button variant="contained" color="error" onClick={(e) => { Delete(e) }}>Удалить</Button>
                </ButtonGroup>
            </div>
        </>
    )
}

export default Banner