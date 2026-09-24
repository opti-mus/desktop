import type { WindowController } from "../WindowController";

export class SelectionModule {
    engine: WindowController
    public isSelection: boolean
    public selections: Map<string, any>
    public selectionArea: HTMLDivElement | null

    constructor(engine: WindowController) {
        this.engine = engine

        this.selections = new Map()

        this.isSelection = false
        this.selectionArea = null

    }

    public init() {
        this.initListeners()
    }

    private initListeners() {
        this.engine.addCallback('mousemove', (e, engine) => {
            if (engine.isResizing) return

            const { startData } = engine
            if (this.selectionArea) {
                const deltaX = e.clientX - startData.mouseX
                const deltaY = e.clientY - startData.mouseY

                const newWidth = Math.abs(startData.mouseX - e.clientX)
                const newHeight = Math.abs(startData.mouseY - e.clientY)
                const newTranslateY = startData.mouseY + deltaY
                const newTranslateX = startData.mouseX + deltaX

                this.selectionArea.style.width = `${newWidth}px`
                this.selectionArea.style.height = `${newHeight}px`


                if (startData.mouseY > e.clientY) {
                    this.selectionArea.style.transform = `translate(${startData.mouseX}px, ${newTranslateY}px)`
                }
                if (startData.mouseX > e.clientX) {
                    this.selectionArea.style.transform = `translate(${newTranslateX}px, ${startData.mouseY}px)`
                }
                if (startData.mouseY > e.clientY && startData.mouseX > e.clientX) {
                    this.selectionArea.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`
                }
                if (startData.mouseY < e.clientY && startData.mouseX < e.clientX) {
                    this.selectionArea.style.transform = `translate(${startData.mouseX}px, ${startData.mouseY}px)`
                }
            }
        }, 'selections')

        this.engine.addCallback('mouseup', () => {
            this.destroySelectionArea()
        }, 'destroy_selection')

        this.engine.addCallback('mousedown', (e, engine) => {
            if (engine.isDragging) return
            this.createSelectionArea()

        }, 'destroy_selection')
    }
    private createSelectionArea() {
        if (this.selectionArea) this.selectionArea.remove()

        const areaDiv = document.createElement('div')
        areaDiv.id = 'selections'
        areaDiv.style.position = 'fixed'
        areaDiv.style.backgroundColor = `rgba(0, 47, 100, 0.3)`

        document.body.appendChild(areaDiv)

        this.selectionArea = areaDiv

        return areaDiv
    }
    destroySelectionArea() {
        this.selectionArea?.remove()

    }
}