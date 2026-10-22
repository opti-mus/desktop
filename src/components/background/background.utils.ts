export const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export const handleChangeBackground = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileInput: React.RefObject<HTMLInputElement | null>,
    setBackground: (file: File) => void
) => {
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