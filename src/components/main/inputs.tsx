import { Button, Grid, TextField } from "@mui/material"
import { useContext, useRef } from "react"
import { AlertContext, BannersContext, TitleContext } from "../../App"

const Inputs = () => {
    let texarea = useRef<HTMLDivElement>(null)
    let textareaCopy = useRef<HTMLDivElement>(null)
    const {banners, setBanners} : any = useContext(BannersContext)
    const {title, setTitle} : any = useContext(TitleContext)
    const {text, visible, status} : any = useContext(AlertContext)

    const getObject = () => {
        let obj = texarea.current?.querySelector('input')?.value.replaceAll('<script>', '').replaceAll('</script>', '')
        if(obj) {
            visible.setAlertVisible(true)
            try {
              const array: string[] = obj.split('=')
              const title: string = array[0].split(' ')[1]
  
              setTitle(title)
              setBanners(JSON.parse(array[1]))
              status.setAlertStatus('success')
              text.setAlertText('Обработано')
            }
            catch(e) {
                setTitle("Ошибка")
                status.setAlertStatus('error')
                text.setAlertText('Некорректный объект')
                setBanners({})
            }
            setTimeout(() => {
              visible.setAlertVisible(false)
            }, 3000)
        }
      }

      const Copy = () => {
        const input = textareaCopy.current?.querySelector('input')
        if(input) {
          visible.setAlertVisible(true)
          navigator.clipboard.writeText(input?.value)
          .then(() => {
            text.setAlertText('Скопировано')
            status.setAlertStatus('success')
          })
          .catch(() => {
            text.setAlertText('Ошибка')
            status.setAlertStatus('error')
          })

          setTimeout(() => {
            visible.setAlertVisible(false)
          }, 3000)
        }
      }

    return (
      <Grid container spacing={2} mb={5}>
        <Grid item lg={6}>
          <TextField 
            ref={texarea}
            label='Исходный объект'
            variant='outlined' 
            fullWidth 
            style={{
              margin: '0px 0px 10px'
            }}
            />

          <Button onClick={
              () => {
                  getObject()
              }
              } variant="contained">Изменить</Button>
        </Grid>

        <Grid item lg={6}>
          <TextField 
            label='Измененный объект'
            ref={textareaCopy}
            value={
              `<script>const ${title} = ${JSON.stringify(banners)}</script>`
            }
            fullWidth
            style={{
              margin: '0px 0px 10px'
            }}
          />

          <Button onClick={() => {
            Copy()
          }} variant="contained" color='success'>Копировать</Button>
        </Grid>

      </Grid>
    )
}

export default Inputs