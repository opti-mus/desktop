import { useGlobalStore } from '../../state/state.global'
import { StartMenuPanel, StartMenuWrapper } from './startMenu.styles'
import { StartMenuItem } from './startMenuItem/startMenuItem'

const StartMenu = () => {
    const shortcuts = useGlobalStore.use.shortcuts()

    return (
        <StartMenuPanel>
            <StartMenuWrapper>
                {shortcuts.map(i => (
                    <StartMenuItem shortcut={i} key={i.id} />
                ))}
            </StartMenuWrapper>
        </StartMenuPanel>
    )
}
export default StartMenu
