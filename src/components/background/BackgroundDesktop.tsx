import { useRef } from 'react'
import { BackgroundMode } from '../../state/BackgroundSlice'
import { globalStore } from '../../state/state.global'
import { BackgroundStyles } from './BackgroundDesktop.styles'

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const BackgroundDesktop = () => {
    const { setMode, setBackground } = globalStore()

    const fileInput = useRef<HTMLInputElement>(null)

    const handleChangeBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file || !fileInput.current) return

        if (!allowedTypes.includes(file.type)) {
            alert('Недопустимый формат файла (MIME)!')
            fileInput.current.value = ''
            return
        }

        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
        const fileName = file.name.toLowerCase()
        const isValidExt = allowedExtensions.some(ext => fileName.endsWith(ext))

        if (!isValidExt) {
            alert('Неверное расширение файла!')
            fileInput.current.value = ''
            return
        }

        if (file) {
            setBackground(file)
        }
    }

    return (
        <BackgroundStyles>
            <label htmlFor="background-desktop">
                <input
                    ref={fileInput}
                    type="file"
                    id="background-desktop"
                    name="background"
                    accept={allowedTypes.join(', ')}
                    onChange={handleChangeBackground}
                />
                <span>Change background</span>
            </label>
            <button onClick={() => setMode(BackgroundMode.CONTAIN)}>Contain</button>
            <button onClick={() => setMode(BackgroundMode.COVER)}>Cover</button>
            <button onClick={() => setMode(BackgroundMode.FILL)}>Fill</button>
        </BackgroundStyles>
    )
}

export default BackgroundDesktop
