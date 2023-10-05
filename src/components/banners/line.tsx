import Banner from "./banner"

type Props = {
    title: string
    banners: object[]
}

const Line = ({banners, title}: Props) => {
      
    const bannersContent = banners.map((banner, index) => {
        return <Banner key={ index } index={index} title={ title } banner={ banner } />
    })

    return (
        <div className="banners-wrapper">
            { bannersContent }
        </div>
    )
}

export default Line