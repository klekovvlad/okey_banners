import React, {createContext, useState} from 'react';
import Header from './components/header/header';
import { Container} from '@mui/material';
import Main from './components/main/main';
import Inputs from './components/main/inputs';
import ModalElement, { ModalContext } from './components/modal/modal';

export const BannersContext = createContext<object>({})
export const TitleContext = createContext({})
export const AlertContext = createContext({})

export interface ITitleContext {
  title?: string,
  setTitle?: void
}

function App() {

    const [banners, setBanners] = useState<object>({})
    const [title, setTitle] = useState<string>('')
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [modalBanner, setModalBanner] = useState<object>({})
    const [modalType, setModalType] = useState<string>('new')
    const [modalLine, setModalLine] = useState<string>('')
    const [editIndex, setEditIndex] = useState<number>(0)
    const [alertText, setAlertText] = useState('')
    const [alertVisible, setAlertVisible] = useState(false)
    const [alertStatus, setAlertStatus] = useState('success')

    return (
      <BannersContext.Provider value={{banners, setBanners}}>
        <ModalContext.Provider value={{
          visible: {
            modalOpen,
            setModalOpen,
          },
          item: {
              modalBanner,
              setModalBanner
          },
          type: {
            modalType,
            setModalType
          },
          place: {
            modalLine,
            setModalLine
          },
          editIndex: {
            editIndex,
            setEditIndex
          }
        }}>
          <Container maxWidth="lg">
              <AlertContext.Provider
              value={
                {
                  text: {
                    alertText,
                    setAlertText
                  },
                  visible: {
                    alertVisible,
                    setAlertVisible
                  },
                  status: {
                    alertStatus,
                    setAlertStatus
                  }
                }
              }>
                <Header />
                <TitleContext.Provider value={{title, setTitle}}>
                  <Inputs />
                  <Main />
                </TitleContext.Provider>
              </AlertContext.Provider>
          </Container>
          <ModalElement />
        </ModalContext.Provider>
      </BannersContext.Provider>
    );
}

export default App;
