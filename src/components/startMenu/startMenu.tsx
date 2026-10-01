import { useNavigate } from 'react-router-dom'
import { clearAccessToken } from '../../helpers/token'
import { routes } from '../../router/routes'
import { useGlobalStore } from '../../state/state.global'
import { LogoutButtonStyles, StartMenuPanel, StartMenuWrapper } from './startMenu.styles'
import { StartMenuItem } from './startMenuItem/startMenuItem'

const StartMenu = () => {
    const shortcuts = useGlobalStore.use.shortcuts()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearAccessToken()
        navigate(routes.auth.login)
    }
    return (
        <StartMenuPanel>
            <StartMenuWrapper>
                {shortcuts.map(i => (
                    <StartMenuItem shortcut={i} key={i.id} />
                ))}
                <LogoutButtonStyles onClick={handleLogout}>Logout</LogoutButtonStyles>
            </StartMenuWrapper>
        </StartMenuPanel>
    )
}
export default StartMenu
